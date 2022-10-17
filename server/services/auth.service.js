const { User } = require("../models")
const bcrypt = require("bcryptjs")
const ApiError = require("../helpers/ApiError")
const jwt = require("jsonwebtoken")

const register = async (data) => {
    try {
        let user = await User.findOne({ email: data.email })
        if(user){
            const err = {
                code: 400,
                message: "A youngster with this email already exist"
            }
            throw err
        }
        data.password = await bcrypt.hash(data.password, 10)
        user = await User.create(data)
        return JSON.parse(JSON.stringify(user))
    } catch (error) {
        throw new ApiError(error.code || 500, error.message || error)
    }
}

const login = async (email, password) => {
    try {
        const user = await User.findOne({ email })
        if(!user) throw new ApiError(400, "invalid email or password")
        await comparePassword(password, user)
        return user
    } catch (error) {
        throw new ApiError(error.code || 500, error.message || error)
    }
}

const comparePassword = async (password, user) => {
    try {
        const result = await bcrypt.compare(password, user.password)
        if(!result) throw new ApiError(400, "Invalid email or password")
        return result
    } catch (error) {
        throw new ApiError(error.code || 500, error.message || error)
    }
}

const getUsers = async (criteria = {}, options = {}) => {
    try {
        const { sort = { createdAt: -1 }, limit} = options
        const _limit = parseInt(limit, 10)
        const users = await User.find(criteria)
        .sort(sort)
        .limit(_limit)
        return users
    } catch (error) {
        throw new ApiError(error.code || 500, error.message || error)
    }
}

const getUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ email })
        if(!user) throw new ApiError(400, "Invalid user")
        return JSON.parse(JSON.stringify(user))
    } catch (error) {
        throw new ApiError(error.code || 500, error.message || error);
    }
}

const getUserById = async (_id) => {
    try {
        const user = await User.findOne({ _id })
        if(!user) throw new ApiError(400, "Invalid user")
        return JSON.parse(JSON.stringify(user))
    } catch (error) {
        throw new ApiError(error.code || 500, error.message || error);
    }
}

const validateToken = function(req, res, next) {
    const bearerHeader = req.headers.authorization
    if(!bearerHeader) throw new ApiError(400, "You need to attach a token")
    const bearer = bearerHeader.split(" ")
    const [, token] = bearer
    req.token = token
    jwt.verify(req.token, process.env.JWT_SECRET_KEY, (err, authData) => {
        if(err){
            const errorCode = err.code || 500
            const errorMessage = err.message || error
            return res.status(errorCode).send({
                message: `${errorMessage}`,
            })
        } else {
            req.user = authData.user; // Add User Id to request
            next();
        }
    })
}

const count = async (criteria = {}) => {
    return await User.find(criteria).countDocuments();
}

module.exports = {
    register,
    login,
    getUserByEmail,
    getUserById,
    getUsers,
    validateToken,
    count
}