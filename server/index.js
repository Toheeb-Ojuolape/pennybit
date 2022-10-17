const express = require("express")
const app = express()
const logger = require("./helpers/logger")
require("dotenv").config()
require("./config/mongoose")
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Index page
app.get("/", (req, res) => {
    res.status(200).send({ 
        message: "Welcome to Pent. Your go to application regarding home/house reviews. Everything you need to know, all in one click"
    })
})

// Routes

// Invalid routes
app.get("*", (req, res) => {
    res.status(404).send({
        message: "Oops... Page not found"
    })
})

app.listen(port, () => {
    logger.info(`Server started at ${port}`)
})