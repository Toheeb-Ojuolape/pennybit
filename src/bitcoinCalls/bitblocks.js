import axios from "axios";
import headers from "../helpers/headers";
import { Auth } from "./bitauth";

export default class BitBlocks extends Auth{
    getBlockHash(block){
        const body = {
            jsonrpc: '1.0',
            id: 'curltext',
            method: 'getblockhash',
            params: [block]
        }
        return axios.post(this.url, body, headers)
    }

    getBlock(blockHash){
        const body = {
            jsonrpc: '1.0',
            id: 'curltext',
            method: 'getblock',
            params: [blockHash]
        }
        return axios.post(this.url, body, headers)
    }
}