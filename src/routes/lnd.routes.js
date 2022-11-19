const express = require("express")
const validate = require("../helpers/validate")
const lndController = require("../controllers/lightning.controller")
const lndValidation = require("../policies/lnd.policy")
const { authService } = require("../services")
const router = express.Router()

router.post(
    "/generateinvoice",
    [validate(lndValidation.createInvoice), authService.validateToken],
    lndController.createInvoice
)

router.post(
    "/invoicelookup",
    [validate(lndValidation.createInvoice), authService.validateToken],
    lndController.lookupInvoice
)

router.post(
    "/invoicelookuphash",
    [validate(lndValidation.createInvoice), authService.validateToken],
    lndController.lookupInvoiceHash
)

router.post(
    "/payinvoice",
    [validate(lndValidation.createInvoice), authService.validateToken],
    lndController.payUserInvoice
)

module.exports = router