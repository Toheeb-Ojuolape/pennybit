const mongoose = require("mongoose")
const moment = require("moment")
const schema = mongoose.Schema

const userSchema = new schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    phoneNumber: {
        type: String,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    pin: {
        type: Number,
        trim: true,
    },
    accountConfirmed: {
        type: Boolean,
        default: false,
    },
    type: {
        type: String,
        enum: ["Active", "Inactive", "Deactivated"],
        required: true,
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

const User = mongoose.model("User", userSchema)
module.exports = User