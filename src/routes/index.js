const express = require("express")
const router = express.Router()

const userRouter = require("./auth.route")
const lndRouter = require("./lnd.routes")

router.use("/user", userRouter)
router.use("/lnd", lndRouter)

module.exports = router