const mongoose = require("mongoose")

const tokenSchema = mongoose.Schema({
    token: {
        type: String,
        required: true,
      },
      user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true,
      },
      type: {
        type: String,
        enum: ["refresh", "resetPassword", "emailToken"],
        required: true,
      },
      expires: {
        type: Date,
        required: true,
      },
      blacklisted: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true, versionKey: false })

const Token = mongoose.model("Token", tokenSchema)
module.exports = Token