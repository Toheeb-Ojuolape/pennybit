import nodeService from "../services/node.service"
import nodeManager from "./nodeManager"

const connect = async (data) => {
    try {
        const { host, cert, macaroon } = data
        const { token, pubkey } = await nodeManager.connect(host, cert, macaroon)
        await nodeService.createNode({ host, cert, macaroon, token, pubkey })
        return JSON.parse(JSON.stringify(user))
    } catch (error) {
        throw new ApiError(error.code || 500, error.message || error)
    }
}

const getInfo = async (token) => {
    const node = await nodeService.getNodeByToken(token);
    if(!node) throw new Error("Node not found with this token")
    const rpc = nodeManager.getRpc(token)
    const rpcInfo = rpc.getInfo()
    const channelBalance = await rpc.channelBalance()
    return JSON.parse(JSON.stringify({ rpcInfo, channelBalance }))
}

module.exports = {
    connect,
    getInfo
}