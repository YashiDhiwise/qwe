const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();
global.__basedir = __dirname;
const ejs = require("ejs");
let cookieParser = require('cookie-parser');
let logger = require('morgan');
const passport = require("passport")

const {clientPassportStrategy} = require("./config/clientPassportStrategy");

const app = express();

//template engine
app.set('view engine', 'ejs'); 
app.set('views', path.join(__dirname, 'views'));

//all routes 
const routes =  require("./routes/index")

//jobs configuration
require('./jobs/index');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes)

clientPassportStrategy(passport);


app.listen(process.env.PORT,()=>{
    console.log(`your application is running on ${process.env.PORT}`)
});
