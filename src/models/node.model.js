const mongoose = require("mongoose")

const nodeSchema = mongoose.Schema({
    host: {
        type: String,
    },
    cert: {
        type: String,
    },
    macaroon: {
        type: String,
    }, 
    token: {
        type: String,
    }, 
    pubkey: {
        type: String,
    },
    userId: {
        type: String,
    }
}, { timestamps: true })

const NodeModel = mongoose.model("Node", nodeSchema)
module.exports = NodeModel 