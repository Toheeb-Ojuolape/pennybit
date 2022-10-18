const jwt = require("jsonwebtoken")
const secretKey = process.env.JWT_SECRET_KEY

const signToken = payload =>
    new Promise((resolve, reject) => {
        jwt.sign(payload, secretKey, (err, token) => {
            if(err) reject(err)
            resolve(token)
        })
    })

const decodeToken = token => 
    new Promise((resolve, reject) => {
        const decoded = jwt.decode(token, secretKey, err => {
            if(err) reject(err)
        })
        resolve(decoded)
    })

module.exports = {
    signToken,
    decodeToken
}