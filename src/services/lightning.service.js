const ApiError = require("../helpers/ApiError")
const transactionService = require("./transaction.service")
const lnrpc = require("@radar/lnrpc")
const axios = require('axios')
const https = require('https')

const host = process.env.LND_RPC_URL
const macaroon = process.env.LND_MACAROON
const cert = process.env.LND_RPC_PATH

const connectRpc = async () => {
    try {
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
        console.log(amount)
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
        const lookUp = await lnRpcClient.lookupInvoice({ rHashStr: decoded.paymentHash })
        console.log(lookUp)
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
        throw new ApiError(error.code || 500, error.message || error)
    }
}

// Voltage APIs
const voltageMacaroon = process.env.VOLTAGE_MACAROON
const invoiceKey = process.env.INVOICE_KEY

let voltageInstance = axios.create({
    httpsAgent: new https.Agent({
        rejectUnauthorized: false
      }),
    headers: { 
      "Grpc-Metadata-macaroon" : voltageMacaroon 
    }
})   

const getInfo = async () => { 
    try {
        let res = await voltageInstance.get(`${process.env.BASE_URL}/v1/getinfo`)
        return JSON.parse(JSON.stringify(res.data))
    } catch (error) {
        throw new ApiError(error.code || 500, error.message || error)
    }
} 

const PayVoltageInvoice = async (invoice) => {
    const payInvoiceData = {
        payment_request: invoice,
        timeout_seconds: 300, 
        fee_limit_sat: parseInt(process.env.FEE_LIMIT)
    }
    try {
        let res = await voltageInstance.post(`${process.env.BASE_URL}/v2/router/send`, payInvoiceData)
        return JSON.parse(JSON.stringify(res.data))
    } catch (error) {
        throw new ApiError(error.code || 500, error.message || error)   
    }
}

const CreateVoltageInvoice = async (amountInSats) => {
    const createInvoiceData = {
        value: amountInSats
    }
    try {
        let res = await voltageInstance.post(`${process.env.BASE_URL}/v1/invoices`, createInvoiceData)
        console.log(res.data)
        return JSON.parse(JSON.stringify(res.data))
    } catch (error) {
        throw new ApiError(error.code || 500, error.message || error)   
    }
}

const voltageCheckSettlement = async (invoice) => {
    try {
        const buffer = Buffer.from(invoice, 'base64')
        console.log(`Hex string of invoice is: ${buffer.toString('hex')}`)
        let res = await voltageInstance.get(`${process.env.BASE_URL}/v1/invoice/${buffer.toString('hex')}`)
        return JSON.parse(JSON.stringify(res.data))
    } catch (error) {
        throw new ApiError(error.code || 500, error.message || error)
    }
}




// LN Bits deal
let reqInstance = axios.create({
    headers: {
      "X-Api-Key" : invoiceKey 
    } 
}) 

const voltageGetInfo = async () => {
    try {
        let res = await reqInstance.get(`${process.env.LNBIT_URL}/api/v1/wallet`)
        return res.data
    } catch (error) {
        throw new ApiError(error.code || 500, error.message || error)
    }
}

const voltagePayInvoice = async (invoice) => {
    const payInvoiceData = {
        out: true,
        bolt11: invoice
    }
    try {
        let res = await axios.get(`${process.env.LNBIT_URL}/api/v1/payments`, payInvoiceData, config)
        return res
    } catch (error) {
        throw new ApiError(error.code || 500, error.message || error)
    }
}

const voltageCreateInvoice = async (amountInSats) => {
    const createInvoiceData = {
        out: false,
        amount: amountInSats,
        unit: "sat", 
        memo: "",
        webhook: process.env.BASE_URL,
        internal: false
    }
    try {
        let res = await reqInstance.post(`${process.env.LNBIT_URL}/api/v1/payments`, createInvoiceData)
        return res.data
    } catch (error) {
        throw new ApiError(error.code || 500, error.message || error)   
    }
}

module.exports = {
    getInfo,
    CreateVoltageInvoice,
    PayVoltageInvoice,
    lookupInvoiceHash,
    subscribeToInvoice,
    getFeeReport,
    invoiceLookUp,
    lookupInvoiceHash,
    generatingInvoice,
    connectRpc,
    decodeInvoice,
    payWithHash,
    payWithInvoice,
    voltageGetInfo,
    voltagePayInvoice,
    voltageCreateInvoice,
    voltageCheckSettlement
}