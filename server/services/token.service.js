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
            expires: expires.ToDate(),
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
    const tokenDoc = await Token.findOne({ type, user: userId })
    if(tokenDoc){
        tokenDoc.expires = expires,
        tokenDoc.blacklisted = blacklisted,
        tokenDoc.token = token,
        tokenDoc.save()
        return tokenDoc
    }
}