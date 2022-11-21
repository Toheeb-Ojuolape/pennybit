const {  Transaction } = require("../models")
const ApiError = require("../helpers/ApiError")

const ticks = ((new Date().getTime() * 10000) + 621355968000000000)
const reference = `PennyBit_${ticks}`

const createTransaction = async (body) => {
    try {
        const newTransaction = await Transaction.create({
            user: body.userId,
            narration: "Transfer successful",
            transactionType: body.transactionType,
            amount: parseInt(body.amount),
            transactionReference: reference,
            invoice: body.invoice
        })
        return JSON.parse(JSON.stringify(newTransaction))
    } catch (error) {
        throw new ApiError(error.code || 500, error.message || error); 
    }
}

const updateSingleTransaction = async (status, criteria) => {
    try {
        var transaction = await findOneTransaction(criteria)
        if(!transaction) throw new ApiError(400, "Transaction with that reference does not exist")
        await updateTransaction({ transactionReference: txnRef }, status)
    } catch (error) {
        throw new ApiError(error.code || 500, error.message || error)
    }
}

const findOneTransaction = async (ref) => {
    try {
        const transaction = await Transaction.findOne({ ...ref })
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

const updateTransactionStatus = async (criteria, status) => {
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
    updateTransactionStatus,
    createTransaction,
    updateSingleTransaction
}