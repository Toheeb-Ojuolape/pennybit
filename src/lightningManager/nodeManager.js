const Emiter = require('events')

const uuid = require("uuid")
const lnrpc = require("@radar/lnrpc")

const NodeEvents = {
    invoicePaid: 'invoice-paid'
}

class NodeManager extends Emiter.EventEmitter{
    connstructor(){
        this._lndNodes = {}
    }

    getRpc(token){
        if(!token){
            throw new Error("Not authorized. You must login first")
        }
        return this._lndNodes[token]
    }

    async connect(host, cert, macaroon, prevToken = null) {
        const token = prevToken !== null ? prevToken : uuid.v4().replace(/-/g, '')
        try {
            const rpc = await lnrpc.createLnRpc({
                server: host,
                cert: Buffer.from(cert, 'hex').toString('utf-8'),
                macaroon
            })
            // Verify we have permission to get node info
            const { identityPubkey } = await rpc.getInfo()
            // Verify we have permission to get channel balances
            await rpc.channelBalance()
            // Verify we can send a message
            const msg = Buffer.from('authorization test').toString('base64')
            const { signature } = await rpc.signMessage({ msg })
            // Verify wr have permission to verify a message
            await rpc.verifyMessage({ msg, signature })
            // Verify we have permission to create a 1 sat invoice
            const { rHash } = await rpc.addInvoice({ value: '1' })
            // Verify we have permission to lookup invoices
            await rpc.lookupInvoice({ rHash })
            // Listen for payment from LND
            this.listenForPayments(rpc, identityPubkey)
            // store the rpc connection in the in memory list
            this._lndNodes[token] = rpc
            return { token, identityPubkey }
        } catch (error) {
            // remove the connection from the cache since it is not valid
            if (this._lndNodes[token]) {
                delete this._lndNodes[token];
            }   
        }
    }

    async reconnectNodes(nodes){
        for(const node of nodes){
            const { host, cert, macaroon, token } = node;
            try {
                console.log(`Reconnecting to LND node ${host} for token ${token}`)
                await this.connect(host, cert, macaroon, token)
            } catch (error) {
                console.error(`Failed to reconnect to LND node ${host} with token ${token}`)
            }
        }
    }

    listenForPayments(rpc, pubkey){
        const stream = rpc.subscribeInvoices();
        stream.on('data', invoice => {
            if (invoice.settled) {
                const hash = (invoice.rHash).toString('base64');
                const amount = invoice.amtPaidSat;
                this.emit(NodeEvents.invoicePaid, { hash, amount, pubkey });
            }
        });
    }
}

module.exports = NodeManager