import headers from '../helpers/headers'
const axios = require('axios')
const bitAuth = require('./bitauth')

export default class BitBlockchain extends bitAuth.Auth{
    getBlockchainInfo() {
        const body = {
            jsonrpc: '1.0',
            id: 'curltext',
            method: 'getblockchaininfo',
            params: []
        }
        return axios.post(this.url, body, headers)
    }
}