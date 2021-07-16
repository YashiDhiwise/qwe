/*
 * Database connection file.
 */
const mongoose = require("mongoose")
const uri = process.env.DB_URL;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
var db = mongoose.connection

db.once("open", () => {
    console.log("Connection Successful")
})

db.on("error", () => {
    console.log("Error in mongodb connection")
})

module.exports = mongoose