const ApiError = require("../helpers/ApiError")
const transactionService = require("./transaction.service")
const lnrpc = require("@radar/lnrpc")

const connectRpc = async () => {
    try {
        const host = process.env.LND_RPC_URL
        const macaroon = process.env.LND_MACAROON
        const cert = process.env.LND_RPC_PATH

        const lnRpcClient = await lnrpc.createLnRpc({
            server: host,
            cert: Buffer.from(cert, 'hex').toString('utf-8'),
            macaroon
        })
        
        const routerClient = await lnrpc.createRouterRpc({
            server: host,
            cert: Buffer.from(cert, 'hex').toString('utf-8'),
            macaroon
        })
        const pubkey = await lnRpcClient.getInfo()
        return { lnRpcClient, routerClient }
    } catch (error) {
        throw new ApiError(error.code || 500, error.message || error)
    }
}

const generatingInvoice = async (amount) => {
    try {
        const { lnRpcClient, routerClient } = await connectRpc()
        const invoice = await lnRpcClient.addInvoice({ value: amount.toString() })
        var invoiceData = {
            PaymentRequest: invoice.paymentRequest,
            Hash: (invoice.rHash).toString('base64'),
            Amount: amount
        }
        return JSON.parse(JSON.stringify(invoiceData))
    } catch (error) {
        throw new ApiError(error.code || 500, error.message || error)
    }
}

const lookupInvoiceHash = async (data) => {
    const { lnRpcClient, routerClient } = await connectRpc()
    const rHash = Buffer.from(data.hash, 'base64')
    const { settled } = await lnRpcClient.lookupInvoice({ rHash });
    if(!settled){
        throw new Error("The payment has not been made!")
    }
    var transactionInfo = "This payment has been completed"
    return JSON.parse(JSON.stringify(transactionInfo))
}

const decodeInvoice = async (invoice) => {
    try {
        const { lnRpcClient, routerClient } = await connectRpc()
        const decodedInvoice = await lnRpcClient.decodePayReq({ payReq: invoice })
        return decodedInvoice
    } catch (error) {
        throw new ApiError(error.code || 500, error.message || error)   
    }
}

const invoiceLookUp = async (invoice) => {
    try {
        const { lnRpcClient, routerClient } = await connectRpc()
        const decoded = await decodeInvoice(invoice)
        const lookUp = await lnRpcClient.lookupInvoice({ rHash: decoded.paymentHash })
        return JSON.parse(JSON.stringify(lookUp))
    } catch (error) {
        throw new ApiError(error.code || 500, error.message || error)
    }
}

const getFeeReport = async () => {
    try {
        const { lnRpcClient, routerClient } = await connectRpc()
        return await lnRpcClient.feeReport()
    } catch (error) {
        throw new ApiError(error.code || 500, error.message || error)
    }
}

const payWithInvoice = async (invoice) => {
    try {
        const { lnRpcClient, routerClient } = await connectRpc()
    const invoicePayment = await lnRpcClient.sendPayment({ paymentRequest: invoice })
    return invoicePayment
    } catch (error) {
        throw new ApiError(error.code || 500, error.message || error)
    }
}

const payWithHash = async (hash) => {
    try {
        const { lnRpcClient, routerClient } = await connectRpc()
    const invoicePayment = await lnRpcClient.sendPayment({ paymentHash: hash })
    return invoicePayment
    } catch (error) {
        throw new ApiError(error.code || 500, error.message || error)
    }
}

const subscribeToInvoice = async (body) => {
    try {
        const { lnRpcClient, routerClient } = await connectRpc()
        const transactionBodyRequest = {
            userId: body.userId,
            transactionType: body.transactionType,
            amount: (body.amount / 100000000),
            invoice: body.invoice
        }
        await transactionService.createTransaction(transactionBodyRequest)
        const subscribe = await lnRpcClient.subscribeInvoices({ addIndex: body.invoice.addIndex })
        subscribe.on('data', async (response) => {
            const paymentValue = Number(response.value)
            const paymentValueBtc = paymentValue / 100000000
            if(response.settled){
                const criteria = {
                    invoice: body.invoice,
                    userId: body.userId
                }
                await transactionService.updateTransactionStatus(criteria, "SUCCESS")
            }
            else{
                await transactionService.updateTransactionStatus(criteria, "PROCESSING")
            }
        })
    } catch (error) {
        
    }
}

module.exports = {
    lookupInvoiceHash,
    subscribeToInvoice,
    getFeeReport,
    invoiceLookUp,
    lookupInvoiceHash,
    generatingInvoice,
    connectRpc,
    decodeInvoice,
    payWithHash,
    payWithInvoice
}