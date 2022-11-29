const ApiError = require("../helpers/ApiError")
const catchAsync = require("../helpers/catchAsync")
const pick = require("../helpers/pick")
const sendMail = require("../helpers/mail")
const { User, Token } = require("../models")
const qrToImage = require("../helpers/qrCode")

const { authService, tokenService } = require("../services")

require("dotenv").config()

const register = catchAsync(async (req, res) => {
    const token = Math.floor(1000 + Math.random() * 9000)
    var userRequest = {
        ...req.body,
        pin: token.toString()
    }
    const user = await authService.register(userRequest)
    const tokens = await tokenService.generateAuthTokens(user, true)
    const template = "/templates/views/verification-code.html"
    const subject = "Verify Your PennyBit Account"
    const to = req.body.email
    const data = {
        "name": req.body.firstName,
        "token": token
    }
    sendMail(to, template, subject, data)
    res.status(201).send({
        message: "Youngster registration was successful",
        data: {
            user,
            token: tokens.access.token
        }
    })
})

const login = catchAsync(async (req, res) => {
    const { email, password } = req.body
    const user = await authService.login(email, password)
    const token = await tokenService.generateAuthTokens(user)
    res.status(201).send({
        message: "Login was successful",
        data: {
            user,
            token: token.access.token
        }
    })
})

const resendTokens = catchAsync(async (req, res) => {
    const token = Math.floor(1000 + Math.random() * 9000)
    const to = req.body.email
    const template = "/templates/views/verification-code.html"
    const subject = "Verify Your PennyBit Account"
    const user = await User.findOne({ to })
    if (!user) throw new ApiError(400, "Invalid email or password")
    if (user.status === "Active") throw new ApiError(400, "This account is activated already")
    await authService.updateUserById(user.id, { pin: token })
    const data = {
        "name": user.firstName,
        "token": token
    }
    sendMail(to, template, subject, data)
    res.status(200).send({
        message: "Token resent successfully",
    })
})

const emailVerification = catchAsync(async (req, res) => {
    try {
        const user = await authService.emailVerification(req.body)
        delete user.password
        res.send({
            message: "Account activated successfully",
            user
        })
    } catch (error) {
        const message = error.message || error;
        const code = error.code || 500;
        throw new ApiError(code, message);
    }
})

const forgotPassword = catchAsync(async (req, res) => {
    const user = JSON.parse(JSON.stringify(await authService.getUserByEmail(req.body.email)))
    const resetPasswordToken = await tokenService.generateResetPasswordToken(user.email)
    const template = "/templates/views/forgot-password.html"
    const subject = "Password Reset Request"
    const frontendUrl = process.env.FRONTEND_URL
    const resetUrl = `${frontendUrl}reset-password/${resetPasswordToken}`
    const to = user.email
    const data = {
        "name": user.firstName,
        "url": resetUrl
    }
    sendMail(to, template, subject, data)
    res.status(201).send({
        message: "Please check your mail",
        data: {}
    })
})


const resetPassword = catchAsync(async (req, res) => {
    await authService.resetPassword(req.body.token, req.body.newPassword)
    res.status(200).send({
        message: "password reset successfully",
        data: {}
    })
})

const updatePassword = catchAsync(async (req, res) => {
    await authService.updatePassword(req.user.email, req.body.oldPassword, req.body.newPassword)
    res.status(200).send({
        message: "Password updated successfully",
        data: {}
    })
})

const updateUserById = catchAsync(async (req, res) => {
    if (req.body.password) throw new ApiError("You can't update your password here")
    const user = await authService.updateUserById(req.user._id, req.body)
    res.status(201).send({
        message: "User updated successfully",
        data: { user }
    })
})

const getUser = catchAsync(async (req, res) => {
    let user;
    if (req.query.user) {
        user = JSON.parse(JSON.stringify(await authService.getUserById(req.query.user)))
    } else {
        user = JSON.parse(JSON.stringify(await authService.getUserById(req.user._id)))
    }
    res.status(200).send({
        message: "User details fetched successfully",
        data: {
            user
        }
    })
})

const getUsers = catchAsync(async (req, res) => {
    const filter = pick(req.query, ["type"])
    const options = pick(req.query, ["sortby", "limit", "page"])
    const { users, page } = await authService.getUsers(JSON.parse(JSON.stringify(filter)), options)
    const count = await authService.count(filter)
    res.status(200).send({
        message: "Users fetched successfully",
        data: {
            count,
            currentPage: page,
            users
        }
    })
})

module.exports = {
    register,
    login,
    emailVerification,
    resendTokens,
    forgotPassword,
    getUser,
    getUsers,
    resetPassword,
    updatePassword,
    updateUserById,
    getUser,
    getUsers,
}