/*jslint node: true */
/* jshint esversion: 8 */
/*jshint -W033 */
require("express-async-errors");
const bcrypt = require('bcryptjs');
const emailConfig = require('../config/mailgun-js')();
const mailgun = require('mailgun-js')(emailConfig);
const { user } = require('../models');
const jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
var shortid = require('shortid');
const statusCodes = require('../utils/responseCode');
const { sortHandler, catcherrHandler, successHandler } = require('../middleware/validation-middleware');
const { body, validationResult } = require('validatorjs');
const { Op, QueryTypes, sequelize } = require('sequelize')
const db = require('../models');

module.exports = {
    async signup(req, res) {
        try {    
        const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(req.body.password, salt);
            req.body.password = hashPassword;
            req.body.isActive = 1;
            const users = new user(req.body);
            await users.save()
            const data = { msg: "User created successfully!", statusCodes: statusCodes.ok, success: true }
            sortHandler(res, data);
         } catch (error) {
            const data = { statusCodes: statusCodes.Internalservererror, error: error.message, msg: "Something went wrong!", success: false }
            catcherrHandler(res, data)
        }
    },
    async signin(req, res) {
        try {   
            dataemail = req.body.email;
            const password = req.body.password;
            const salt = await bcrypt.genSalt(10);

            if (req.emialndudice === '') {
                const data = { msg: "Wrong credentials pass", statusCodes: statusCodes.Unauthorized, success: false }
                return sortHandler(res, data);
            }

            if (req.emialndudice.dataValues.token != ''){
                const data = { msg: "you are already loged in", statusCodes: statusCodes.Unauthorized, success: false }
                return sortHandler(res, data);
            }

            const isPasswordMatched = await bcrypt.compare(password, req.emialndudice.dataValues.password);
            if (!isPasswordMatched) {
                const data = { statusCodes: statusCodes.Unauthorized, msg: "Wrong credentials pass", success: false }
                return sortHandler(res, data)}

            const token = await jwt.sign({
                id: req.emialndudice.dataValues.id
            }, process.env.SECRET_KEY, {
                expiresIn: process.env.JWT_EXPIRE,
            });
            await user.update({
                token: token }, {
                where: { email: req.emialndudice.dataValues.email}
            });
            // update last login time date
            var date_format_str = new Date().toLocaleString("en-US", {
                timeZone: "Asia/Kolkata", hour12: false
            }).replace(',', '');
            await user.update({ lastlogin: date_format_str }, { where: { id: req.emialndudice.dataValues.id } }); // on login update last login time
            res.cookie("jwt", token, { httpOnly: true })
            const data = { statusCodes: statusCodes.ok, msg: "LoggedIn Successfully", data: token, success: true }
            successHandler(res, data)

        } catch (error) {
            const data = { statusCodes: statusCodes.Internalservererror, error: error.message, msg: "Something went wrong!", success: false }
            catcherrHandler(res, data)
        }
    },

    async logout(req, res) {
        try {
           const logoutuser= await user.update({
                token: ''
            }, {
                where: { id: req.user }
            });
            ////if (res.cookie('jwt', '', { maxAge: 1 })){
            if (logoutuser){
            const data = { msg: "Successfully log out!", statusCodes: statusCodes.ok, success: true }
            sortHandler(res, data);}else{
                console.log("Invalid token")
                exit(1)
            }
        } catch (error) {
            const data = { statusCodes: statusCodes.Internalservererror, error: error.message, msg: "Something went wrong!", success: false }
            catcherrHandler(res, data)
        }
    },

}