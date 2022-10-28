const mongoose = require("mongoose")
const moment = require("moment")
let schema = mongoose.Schema

var transactionSchema = new schema({
    narration: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    transactionStatus: {
        type: "string",
        enum: ["INITIATED", "PROCESSING", "ABANDONED", "SUCCESS", "FAILED", "REVERSED", "CANCELLED"],
        default: "INITIATED",
    },
    transactionType: {
        type: "string",
        enum: ["CREDIT", "DEBIT"],
    },
    transactionReference: {
        type: String,
        required: true,
        trim: true
    },
    amount: {
        type: Number,
        required: true
    },
    transactionDate: {
        type: String,
        default: moment().format(),
    }
})

const Transaction = mongoose.model("Transaction", transactionSchema)
module.exports = Transaction