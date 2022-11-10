import axios from "axios";
import headers from "../helpers/headers";
import { Auth } from "./bitauth";

export default class BitWallet extends Auth{
    createWallet(name){
        const body = {
            jsonrpc: '1.0',
            id: 'curltext',
            method: 'createwallet',
            params: [name]
        }
        return axios.post(this.url, body, headers)
    }

    listWallets(){
        const body = {
            jsonrpc: '1.0',
            id: 'curltext',
            method: 'listwallets',
            params: []
        }
        return axios.post(this.url, body, headers)
    }

    getWalletBalance(wallet) {
        const body = {
            jsonrpc: '1.0',
            id: 'curltext',
            method: 'getbalance',
            params: []
        }
        return axios.post(`${this.url}/wallet/${wallet}`, body, headers)
    }

    getTransaction(wallet){
        const body = {
            jsonrpc: '1.0',
            id: 'curltext',
            method: 'listtransactions',
            params: []
        }
        return axios.post(`${this.url}/wallet/${wallet}`, body, headers)
    }
}