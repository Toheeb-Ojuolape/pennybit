const ApiError = require("../helpers/ApiError")
const catchAsync = require("../helpers/catchAsync")
const pick = require("../helpers/pick")

const { authService } = require("../services")

const register = catchAsync(async function(req, res) {
    const user = await authService.register(req.body)
})