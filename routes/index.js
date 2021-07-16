const express = require("express")
const router =  express.Router()
router.use("/",require("./client/index"));

module.exports =router