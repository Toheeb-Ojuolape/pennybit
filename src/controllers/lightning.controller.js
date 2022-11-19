const ApiError = require("../helpers/ApiError")
const qrcodeHelper = require("../helpers/qrCode")
const catchAsync = require("../helpers/catchAsync")
const { authService, transactionService, lightningService } = require("../services")


require("dotenv").config()

const createInvoice = catchAsync(async (req, res) => {
    const user = await authService.getUserById(req.user._id)
    if(!user) throw new ApiError(400, "User not found")
    const amount = req.body.amountInSats
    await lightningService.generatingInvoice(amount)
    .then(async (invoice) => {
        const txnPayload = {
            userId: req.user._id,
            transactionType: "CREDIT",
            invoice: invoice.PaymentRequest,
            amount
        }
        await lightningService.subscribeToInvoice(txnPayload)
        const qrCode = await qrcodeHelper.uploadBase64ToCloudinary(invoice.PaymentRequest)
        res.status(201).send({
            message: "Invoice generation was successful",
            data: {
                user,
                invoice,
                QR: qrCode
            }
        })
    })
    .catch((error) => {
        throw new ApiError(error.code || 500, error.message || error)
    })
})


const lookupInvoice = catchAsync(async (req, res) => {
    const user = await authService.getUserById(req.user._id)
    if(!user) throw new ApiError(400, "User not found")
    const lookup = await lightningService.invoiceLookUp(req.body.invoice)
    res.status(201).send({
        message: "Invoice lookup was successful",
        data: {
            Invoice: { lookup }
        }
    })
})

const lookupInvoiceHash = catchAsync(async (req, res) => {
    const user = await authService.getUserById(req.user._id)
    if(!user) throw new ApiError(400, "User not found") 
    const lookup = await lightningService.lookupInvoiceHash(req.body)
    res.status(201).send({
        message: "Invoice lookup was successful",
        data: {
            Invoice: { lookup }
        }
    })
})

const payUserInvoice = catchAsync(async (req, res) => {
    const user = await authService.getUserById(req.user._id)
    if(!user) throw new ApiError(400, "User not found")
    const { amountInSats, invoice } = req.body
    const decodedInvoice = await lightningService.decodeInvoice(invoice)
    const feeReport = await lightningService.feeReport()
    const totalPayable = feeReport + user.availableBalance
    if(totalPayable >= availableBalance) return new ApiError(403, "Insufficient funds. Kindly topup your balance")
    const invoicePaid = await lightningService.payWithInvoice(invoice)
    if(invoicePaid){
        const txnreq = {
            userId: req.user._id,
            transactionType: "DEBIT",
            amount: (amountInSats / 100000000),
            invoice
        }
        const newTxn = await transactionService.createTransaction(txnreq)
        res.status(201).send({
            message: "Invoice payment was successful",
            data: {
                invoicePaid,
                Transaction: newTxn
            }
        })
    }
    else{
        throw new ApiError(400, "something happened")
    }
})


module.exports = {
    createInvoice,
    payUserInvoice,
    lookupInvoice,
    lookupInvoiceHash
}