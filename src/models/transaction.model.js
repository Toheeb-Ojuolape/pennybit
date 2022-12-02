const mongoose = require("mongoose")
const moment = require("moment")
let schema = mongoose.Schema

var transactionSchema = new schema({
    narration: {
        type: String,
        required: true
    },
    user: {
        type: schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    transactionStatus: {
        type: String,
        enum: ["INITIATED", "PROCESSING", "ABANDONED", "SUCCESS", "FAILED", "REVERSED", "CANCELLED"],
        default: "INITIATED",
    },
    transactionType: {
        type: String,
        enum: ["CREDIT", "DEBIT"],
    },
    transactionReference: {
        type: String,
        required: true,
        trim: true
    },
    amountInSats: {
        type: Number,
        required: true
    },
    amountInBtc: {
        type: Number,
        required: true
    },
    invoice: {
        type: String
    },
    rhash: {
        type: String
    },
    transactionDate: {
        type: String,
        default: moment().format(),
    },
    createdAt: {
        type: String,
        default: moment().format(),
      },
      updatedAt: {
        type: String,
        default: moment().format(),
    }
})

const Transaction = mongoose.model("Transaction", transactionSchema)
module.exports = Transaction