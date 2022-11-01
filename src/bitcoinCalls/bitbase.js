import BitAddresses from "./bitaddresses";
import { Auth } from "./bitauth";
import BitBlockchain from "./bitblockchain";
import BitBlocks from "./bitblocks";
import BitTransactions from "./bittransactions";
import BitWallet from "./bitwallet";

export default class BitBase extends Auth{
    constructor(user, password, rpcurl, port, ){
        super(user, password, rpcurl, port)
        this.blocks = new BitBlocks(user, password, rpcurl, port)
        this.addresses = new BitAddresses(user, password, rpcurl, port)
        this.blockchain = new BitBlockchain(user, password, rpcurl, port)
        this.transactions = new BitTransactions(user, password, rpcurl, port)
        this.wallet = new BitWallet(user, password, rpcurl, port)
    }

    getBlockchainInfo() {
        return this.blockchain.getBlockchainInfo()
    }

    getNewAddress(label, type, wallet){
        return this.addresses.getNewAddress(label, type, wallet)
    }

    getBlockHash(index){
        return this.blocks.getBlockHash(index)
    }

    getBlock(hash){
        return this.blocks.getBlock(hash)
    }

    getTransaction(txId, wallet){
        return this.transactions.getTransaction(txId, wallet)
    }

    decodeRawTransaction(transactionHex){
        return this.transactions.decodeRawTransaction(transactionHex)
    }

    createTransaction(wallet, address, amount, feerate = 1){
        return this.transactions.createTransaction(wallet, address, Number(amount.toFixed(8)), feerate)
    }

    getFeeEstimate(target){
        return this.transactions.getFeeEstimate(target)
    }

    setTransactionFee(wallet, txfee){
        return this.transactions.setTransactionFee(wallet, txfee)
    }

    createWallet(name){
        return this.wallet.createWallet(name)
    }

    listWallets(){
        return this.wallet.listWallets()
    }

    getWalletBalance(name){
        return this.wallet.getWalletBalance(name)
    }

    getTransactions(name){
        return this.wallet.getTransaction(name)
    }
}