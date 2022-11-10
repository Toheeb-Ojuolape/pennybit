import axios from "axios";
import headers from "../helpers/headers";
import { Auth } from "./bitauth";

export default class BitAddresses extends Auth{
    getNewAddress(label, type, wallet){
        let _type = ''
        switch (type) {
            case 'p2pkh':
                _type = 'legacy'
                break;
            case 'p2sh':
                _type = 'p2sh-segwit'
                break;
            default:
                _type = 'bech32'
                break;
        }

        const body = {
            jsonrpc: '1.0',
            id: 'curltext',
            method: 'getnewaddress',
            params: [label, _type]
        }
        return axios.post(`${this.url}/wallet/${wallet}`, body, headers)
    }
}