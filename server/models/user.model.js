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
    pin: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        trim: true,
    },
    dateOfBirth: {
        type: String,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    availableBalance: {
        type: Number
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Others"],
        required: true,
    },
    accountConfirmed: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        enum: ["Active", "Inactive", "Deactivated"],
        default: "Inactive"
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