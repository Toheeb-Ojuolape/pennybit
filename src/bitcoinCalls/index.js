const dotenv = require('dotenv')
const { default: BitBase } = require('./bitbase')
dotenv.config()

const User = process.env.RPC_USER
const Password = process.env.RPC_PASSWORD
const rpcPort = process.env.RPC_PORT
const rpcUrl = process.env.RPC_URL

const base = new BitBase(User, Password, rpcUrl, rpcPort)
export default base;