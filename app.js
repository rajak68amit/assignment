/*jslint node: true */
/* jshint esversion: 8 */
/*jshint -W033 */
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const morgan = require('morgan');
const methodOverride = require('method-override');

const app = express();
var cookieParser = require('cookie-parser')
const notfound = require('./utils/methodHttpnotfound')
const errorHandling = require('./utils/errorHandling')

app.use(express.json());
app.use(cors())
app.use(cookieParser())
//expressBusboy.extend(app);
app.use(bodyParser.urlencoded({ extended: true }))

const RegistrationRoute = require('./routes/registration');
RegistrationRoute(app)

app.use(express.urlencoded({
    extended: false
}));
app.use(methodOverride('_method'));
app.use(morgan('dev'));

app.use(notfound);
app.use(errorHandling);
module.exports = app;
