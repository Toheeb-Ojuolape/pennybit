const express = require("express")
const txnController = require("../controllers/transaction.controller")
const { authService } = require("../services")
const router = express.Router()

router.get(
    "/transactions/all",
    [authService.validateToken],
    txnController.GetTransactions
)

router.get(
    "/transaction",
    [authService.validateToken],
    txnController.GetSingleTransactionByReference
)

module.exports = router