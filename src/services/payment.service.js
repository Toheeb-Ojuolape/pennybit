const { Transaction, User } = require("../models")
const { transactionService } = require("./index")
const ApiError = require("../helpers/ApiError")

const ticks = ((new Date().getTime() * 10000) + 621355968000000000)
const reference = `PennyBit_${ticks}`

const sendMoney = async (body, senderId, receiverId) => {
    try {
        // Perform lightning transaction
        const senderTransaction = await Transaction.create({
            user: senderId,
            narration: "Transfer successful",
            transactionStatus: "PROCESSING",
            transactionType: "DEBIT",
            amount: parseInt(body.amount),
            transactionReference: reference
        })

        const receiverTransaction = await Transaction.create({
            user: receiverId,
            narration: "Transfer successful",
            transactionStatus: "PROCESSING",
            transactionType: "CREDIT",
            amount: parseInt(body.amount),
            transactionReference: reference
        })
    } catch (error) {
        throw new ApiError(error.code || 500, error.message || error); 
    }
}


const updateTransaction = async (status, txnRef) => {
    try {
        var transaction = await transactionService.findOneTransaction(txnRef)
        if(!transaction) throw new ApiError(400, "Transaction with that reference does not exist")
        await transactionService.updateTransaction({ transactionReference: txnRef }, status)
    } catch (error) {
        throw new ApiError(error.code || 500, error.message || error)
    }
}

module.exports = {
    sendMoney,
    updateTransaction
}