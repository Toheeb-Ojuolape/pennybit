const uuid = require("uuid")
const lnrpc = require("@radar/lnrpc")

let lndNodes = {}
const getRpc = (token) => {
    if(!token){
        throw new Error("Not authorized. You must login first")
    }
    return lndNodes[token]
}

const connectLnd = async (host, cert, macaroon, prevToken = null) => {
    const token = prevToken !== null ? prevToken : uuid.v4().replace(/-/g, '')
    try {
        const rpc = await lnrpc.createLnRpc({
            server: host,
            cert: Buffer.from(cert, 'hex').toString('utf-8'), // utf encoded certificate
            macaroon // hex encoded macaroon
        })
        // Verify we have permission to get node information
        const { identityPubkey } = await rpc.getInfo();
        // Verify we have permission to get channel balances
        await rpc.channelBalance();
        // Verify we can sign a message
        const msg = Buffer.from('authorization test').toString('base64')
        const { signature } = await rpc.signMessage({ msg })
        // Verify we have permission to verify a message
        await rpc.verifyMessage({ msg, signature })
        // Verify we have permissions to create a 1sat invoice
        const { rHash } = await rpc.addInvoice({ value: '1' })
        // Verify we have permission to lookup invoices
        await rpc.lookupInvoice({ rHash })
        // listen for payments from LND
        listenForPayments(rpc, identityPubkey)

        lndNodes[token] = rpc

        // Return this node's token for future requests
        return { token, identityPubkey }

    } catch (error) {
        throw err
    }
}


// Listen for payments made to the node. When a payment is settled
// Emit the 'invoicePaid' event to notify listeners of the Nodemanager
const listenForPayments = async(rpc, pubkey) => {
    const stream = rpc.subscribeInvoices()
    stream.on('data', invoice => {
        if(invoice.settled) {
            const hash = (invoice.rHash).toString('base64');
            const amount = invoice.amtPaidSat;
            this.emit(NodeEvents.invoicePaid, { hash, amount, pubkey });
        }
    })
}

module.exports = {
    connectLnd,
    getRpc
}