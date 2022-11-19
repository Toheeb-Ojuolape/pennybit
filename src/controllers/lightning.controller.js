const ApiError = require("../helpers/ApiError")
const catchAsync = require("../helpers/catchAsync")
const { authService, tokenService, lightningService } = require("../services")


require("dotenv").config()

const createInvoice = catchAsync(async (req, res) => {
    const user = await authService.getUserById(req.user._id)
    if(!user) throw new ApiError(400, "User not founc")

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
        res.status(201).send({
            message: "Invoice generation was successful",
            data: {
                user,
                invoice
            }
        })
    })
    .catch((error) => {
        throw new ApiError(error.code || 500, error.message || error)
    })
})


module.exports = {
    createInvoice
}