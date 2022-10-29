const jwt = require("jsonwebtoken")
const moment = require("moment")
const ApiError = require("../helpers/ApiError")
const { Token, User } = require("../models")

const generateToken = (user, expires) => {
    const payload = {
        sub: user.id,
        user, 
        iat: moment().unix(),
        exp: expires.unix()
    }
    return jwt.sign(payload, process.env.JWT_SECRET_KEY)
}

const saveToken = async (token, userId, expires, type, blacklisted = false) => {
    try {
        const tokenDoc = await Token.create({
            token,
            user: userId,
            expires: expires.toDate(),
            type,
            blacklisted
        })
        return tokenDoc
    } catch (error) {
        const message = error.message || error
        const errCode = error.code || 500
        throw new ApiError(errCode, message)
    }
}

const saveUpdateToken = async (token, userId, expires, type, blacklisted = false) => {
    try {
        const tokenDoc = await Token.findOne({ type, user: userId })
        if(tokenDoc){
            tokenDoc.expires = expires,
            tokenDoc.blacklisted = blacklisted,
            tokenDoc.token = token,
            tokenDoc.save()
            return tokenDoc
        }
        const newToken = await Token.create({
            token,
            user: userId,
            expires: expires.toDate(),
            type,
            blacklisted
        })
        return newToken
    } catch (error) {
        const message = error.message || error
        const errCode = error.code || 500
        throw new ApiError(errCode, message)
    }
}

const verifyToken = async (token, type) => {
    try {
        console.log("second")
        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY)
        console.log(payload)
        const tokenDoc = await Token.findOne({
            token,
            type,
            user: payload.sub,
            blacklisted: false
        })
        if(!tokenDoc){
            const err = {
                code: 404,
                message: "Invalid token"
            }
            throw err
        }
        return tokenDoc
    } catch (error) {
        const message = error.message || error
        const errCode = error.code || 500
        throw new ApiError(errCode, message)
    }
}

const verifyTokenResetPassword = async (token, type) => {
    try {
        let payload
        const err = {
            code: 500,
            message: "The token is invalid",
        };
        try {
            payload = jwt.verify(token, process.env.JWT_SECRET_KEY)
        } catch (error) {
            throw err;   
        }
        const tokenDoc = await Token.findOne({
            token,
            type,
            user: payload.sub,
            blacklisted: false
        })
        if(!tokenDoc){
            throw err
        }
        return payload
    } catch (error) {
        const message = error.message || error
        const errCode = error.code || 500
        throw new ApiError(errCode, message)
    }
}

const generateAuthTokens = async (user, newUser = false) => {
    try {
        const accessTokenExpires = moment().add(2, "days")
        const accessToken = generateToken(user, accessTokenExpires)
        const emailTokenExpires = moment().add(60, 'minutes')
        const returnTokens = {
            access: {
                token: accessToken,
                expires: accessTokenExpires.toDate()
            }
        }
        if(newUser){
            const emailVerificationToken = generateToken(user, emailTokenExpires)
            await saveToken(emailVerificationToken, user._id, emailTokenExpires, "emailToken")
            returnTokens.emailToken = {
                token: emailVerificationToken,
                expires: emailTokenExpires.toDate()
            }
        }
        return returnTokens
    } catch (error) {
        const message = error.message || error
        const errCode = error.code || 500
        throw new ApiError(errCode, message)
    }
}

const generateResendTokens = async (user) => {
    try {
        const refreshTokenExpires = moment().add(60, 'minutes')
        const emailVerificationToken = generateToken(user, refreshTokenExpires)
        const emailTokenExpires = refreshTokenExpires
        await saveToken(emailVerificationToken, user._id, emailTokenExpires, "emailToken")
        const returnTokens = {}
        returnTokens.emailToken = {
            token: emailVerificationToken,
            expires: emailTokenExpires.toDate()
        }
        return returnTokens
    } catch (error) {
        const message = error.message || error
        const errCode = error.code || 500
        throw new ApiError(errCode, message)
    }
}

const generateResetPasswordToken = async (email) => {
    try {
        const user = await User.findOne({ email })
        if(!user) throw new ApiError(404, "No user found with that email")
        const expires = moment().add(60, 'minutes')
        const resetPasswordToken = generateToken(user, expires)
        await saveToken(resetPasswordToken, user._id, expires, "resetPassword")
        return resetPasswordToken
    } catch (error) {
        const message = error.message || error
        const errCode = error.code || 500
        throw new ApiError(errCode, message)
    }
}

const generateSetPasswordToken = async (email) => {
    try {
        const user = await User.findOne({ email })
        if(!user) throw new ApiError(404, "No user found with that email")
        const expires = moment().add(2, 'days')
        const setPasswordToken = generateToken(user, expires)
        await saveToken(setPasswordToken, user._id, expires, "resetPassword")
        return {
            token: setPasswordToken,
            expires: expires.toDate()
        }
    } catch (error) {
        const message = error.message || error
        const errCode = error.code || 500
        throw new ApiError(errCode, message)
    }
}

const generateUpdateSetPasswordTokne = async (email, expires) => {
    try {
        const user = await User.findOne({ email })
        if(!user) throw new ApiError(404, "No user found with that email")
        const setPasswordToken = generateToken(user, expires)
        await saveUpdateToken(setPasswordToken, user._id, expires, "resetPassword")
        return {
            token: setPasswordToken,
            expires: expires.toDate()
        }
    } catch (error) {
        const message = error.message || error
        const errCode = error.code || 500
        throw new ApiError(errCode, message)
    }
}

const deleteToken = async (userId, type) => {
    try {
        await Token.findOneAndRemove({
            user: userId,
            type
        })
    } catch (error) {
        const message = error.message || error
        const errCode = error.code || 500
        throw new ApiError(errCode, message)
    }
}


module.exports = {
    generateToken,
    saveToken,
    verifyToken, 
    generateAuthTokens,
    generateResetPasswordToken,
    generateSetPasswordToken,
    generateResendTokens,
    verifyTokenResetPassword,
    generateUpdateSetPasswordTokne,
    deleteToken
}