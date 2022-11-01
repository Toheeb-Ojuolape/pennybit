import headers from '../helpers/headers'
const axios = require('axios')
const bitAuth = require('./bitauth')


export default class BitTransactions extends bitAuth.Auth{
    getTransaction(transactionid, wallet){
        const body = {
            jsonrpc: '1.0',
            id: 'curltext',
            method: 'gettransaction',
            params: [transactionid]
        }
        return axios.post(`${this.url}/wallet/${wallet}`, body, headers)
    }

    decodeRawTransaction(transactionHex){
        const body = {
            jsonrpc: '1.0',
            id: 'curltext',
            method: 'decoderawtransaction',
            params: [transactionHex]
        }
        return axios.post(this.url, body, headers)
    }

    listunspent() {
        const body = {
            jsonrpc: '1.0',
            id: 'curltext',
            method: 'listunspent',
            params: []
        }
        return axios.post(this.url, body, headers)
    }

    createTransaction(wallet, address, amount, feerate = 1){
        const body = {
            jsonrpc: '1.0',
            id: 'curltext',
            method: 'sendtoaddress',
            params: [address, amount, '', '', false, true, null, "unset", null, feerate]
        }
        return axios.post(`${this.url}/wallet/${wallet}`, body, headers)
    }

    getFeeEstimate(target) {
        const body = {
            jsonrpc: '1.0',
            id: 'curltext',
            method: 'estimatesmartfee',
            params: [target]
        }
        return axios.post(this.url, body, headers)
    }

    setTransactionFee(wallet, fee) {
        const body = {
            jsonrpc: '1.0',
            id: 'curltext',
            method: 'settxfee',
            params: [fee]
        }
        return axios.post(`${this.url}/wallet/${wallet}`, body, headers)
    }
}