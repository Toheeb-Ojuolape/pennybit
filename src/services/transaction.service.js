const {  Transaction } = require("../models")
const ApiError = require("../helpers/ApiError")

const ticks = ((new Date().getTime() * 10000) + 621355968000000000)
const reference = `PennyBit_${ticks}`

const createTransaction = async (body) => {
    try {
        await Transaction.create({
            user: body.userId,
            narration: "Transfer successful",
            transactionStatus: "SUCCESS",
            transactionType: body.transactionType,
            amount: parseInt(body.amount),
            transactionReference: reference
        })
    } catch (error) {
        throw new ApiError(error.code || 500, error.message || error); 
    }
}

const updateSingleTransaction = async (status, txnRef) => {
    try {
        var transaction = await transactionService.findOneTransaction(txnRef)
        if(!transaction) throw new ApiError(400, "Transaction with that reference does not exist")
        await updateTransaction({ transactionReference: txnRef }, status)
    } catch (error) {
        throw new ApiError(error.code || 500, error.message || error)
    }
}

const findOneTransaction = async (ref) => {
    try {
        const transaction = await Transaction.findOne({ transactionReference: ref })
        if(!transaction) throw new ApiError(400, "Transaction not found")
        return JSON.parse(JSON.stringify(transaction))
    } catch (error) {
        throw new ApiError(error.code || 500, error.message || error);
    }
}

const findTransactions = async (criteria = {}) => {
    try {
        const transactions = await Transaction.find({ ...criteria })
        if(!transactions) throw new ApiError(400, "No transactions found")
        return JSON.parse(JSON.stringify(transactions))
    } catch (error) {
        throw new ApiError(error.code || 500, error.message || error);   
    }
}

const count = async = async (criteria = {}) => {
    return await Transaction.find(criteria).countDocuments()
}

const updateTransaction = async (criteria, status) => {
    const transaction = await Transaction.findOne({ ...criteria })
    switch (status) {
        case "INITIATED":
            transaction.transactionStatus = status;
            await transaction.save();
            return transaction;
        case "PROCESSING":
            transaction.transactionStatus = status;
            await transaction.save();
            return transaction;
        case "ABANDONED":
            transaction.transactionStatus= status;
            await transaction.save();
            return transaction;
        case "SUCCESS":
            transaction.transactionStatus = status;
            await transaction.save();
            return transaction;
        case "FAILED":
            transaction.transactionStatus = status;
            await transaction.save();
            return transaction;
        case "REVERSED":
            transaction.transactionStatus = "REVERSED";
            await transaction.save();
            return transaction;
        case "CANCELLED":
            transaction.transactionStatus = "CANCELLED";
            await transaction.save();
            return transaction;
    }
}

module.exports = {
    count,
    findOneTransaction,
    findTransactions,
    updateTransaction,
    createTransaction,
    updateSingleTransaction
}