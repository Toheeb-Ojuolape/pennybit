const express = require("express")
const cors = require("cors")
const app = express()
const logger = require("./helpers/logger")
const listAllRoutes = require("express-list-endpoints")
const { errorConverter, errorHandler } = require("./helpers/error")
const Table = require("cli-table")
require("dotenv").config()
const port = process.env.PORT
require("./config/mongoose")


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors("*"))

// Routes
// Index page
app.get("/", (req, res) => {
    res.status(200).send({ 
        message: "Welcome to Pennybit"
    })
})
// Routes
app.use("/api", require("./routes/index"))
// Invalid routes
app.get("*", (req, res) => {
    res.status(404).send({
        message: "Oops... Page not found"
    })
})

// Convert error to ApiError if needed
app.use(errorConverter)

// Handle error
app.use(errorHandler)

app.listen(port, () => {
    logger.info(`Server started at ${port}`)
})

let routesList = listAllRoutes(app)
routesList = routesList.map((route) => {
    const obj = {}
    obj[route.path] = route.methods.join(" | ")
    return obj
})
const table = new Table()
table.push({ Endpoints: "Methods" }, ...routesList)
logger.info(table.toString())