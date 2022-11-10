const { User, Token, Node } = require("../models")
const bcrypt = require("bcryptjs")
const ApiError = require("../helpers/ApiError")
const jwt = require("jsonwebtoken")
const tokenService = require("./token.service")
const nodeService = require("./node.service")
const transactionService = require("./transaction.service")
const lnrpc = require("@radar/lnrpc")
const { default: nodeManager } = require("../lightningManager/nodeManager")

// try {
//     const { token, pubkey } = await nodeManager.connect(host, cert, macaroon)
//     await nodeService.createNode({ host, cert, macaroon, token, pubkey })
//     return JSON.parse(JSON.stringify(user))
// } catch (error) {
//     throw new ApiError(error.code || 500, error.message || error)
// }


const register = async (data) => {
    try {
        let user = await User.findOne({ email: data.email })
        if (user) {
            const err = {
                code: 400,
                message: "A youngster with this email already exist"
            }
            throw err
        }
        data.password = await bcrypt.hash(data.password, 10)
        user = await User.create(data)
        return JSON.parse(JSON.stringify(user))
    } catch (error) {
        throw new ApiError(error.code || 500, error.message || error)
    }
}

const lndConnection = async (userId, data) => {
    try {
        console.log(userId)
        const { host, cert, macaroon } = data
        const { token, identityPubkey } = await nodeService.connectLnd(host, cert, macaroon)
        //const info = await nodeManager.connect(host, cert, macaroon)
        const existingNode = await Node.findOne({ host })
        if(!existingNode){
            await Node.create({
                host,
                cert,
                macaroon,
                token: info.token,
                pubkey: info.identityPubkey,
                userId
            })
        }
        return JSON.parse(JSON.stringify(token))
    } catch (error) {
        throw new ApiError(error.code || 500, error.message || error)   
    }
}

const getNodeInfo = async (token) => {
    try {
        if(!token){
            throw new ApiError(400, "Your node is not connected")
        }
        const rpc = nodeService.getRpc(token)
        const { alias } = await rpc.getInfo()
        const { balance } = await rpc.channelBalance()
        return {alias, balance}
    } catch (error) {
        throw new ApiError(error.code || 500, error.message || error)
    }
}

const createInvoice = async (data) => {
    const rpc = nodeService.getRpc(data.token)
    const inv = await rpc.addInvoice({ value: data.amount.toString() })
    var invoiceData = {
        payreq: inv.paymentRequest,
        hash: (inv.rHash).toString('base64'),
        amount: data.amount
    }
    return JSON.parse(JSON.stringify(invoiceData))
}

const lookupInvoiceHash = async (data) => {
    const rpc = nodeService.getRpc(data.token)
    const rHash = Buffer.from(data.hash, 'base64')
    console.log("Haloo") 
    const { settled } = await rpc.lookupInvoice({ rHash });
    if(!settled){
        throw new Error("The payment has not been made!")
    }
    var transactionInfo = {
        transactionType: "DEBIT",
        amount: data.amount,
        userId: data.userId
    }
    await transactionService.createTransaction(transactionInfo)
    return JSON.parse(JSON.stringify(transactionService))
}

module.exports = {
    register,
    lndConnection,
    getNodeInfo,
    createInvoice,
    lookupInvoiceHash
}