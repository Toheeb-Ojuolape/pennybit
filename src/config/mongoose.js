const mongoose = require("mongoose")
const logger = require("../helpers/logger")
require("dotenv").config()

mongoose.Promise = global.Promise
mongoose 
  .connect(process.env.DB_CONN, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    logger.info("Database Connected successfully");
  })
  .catch((err) => {
    logger.error("Not connected");
    logger.error(err);
  });

module.exports = { mongoose };