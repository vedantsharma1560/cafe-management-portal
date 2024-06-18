const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const db = require("../models");
const { resDocCreated, resErrorOccured, resServerError, resFound, resAlreadyExists, resNotFound } = require("../utils/response");
const config = require("../config/config");
let secretKey = config.JWT_SECRET;

const signup = async (req, res) => {
    try {
        if (Object.keys(req.body).length === 0) return resNotFound(res, 'Please Provide First Name, email and password');
        let { password, firstName, email } = req.body;
        let check = await db.user.findOne({
            where: {
                email,
                firstName
            }
        });
        if (check) return resAlreadyExists(res, check);
        const hashedPass = await bcrypt.hash(password, 10);
        const user = await db.user.create({ ...req.body, password: hashedPass });
        return resDocCreated(res, user);
    } catch (error) {
        return resServerError(res, error);
    }
};

const login = async (req, res) => {
    try {
        let { email, password } = req.body;
        let check = await db.user.findOne({ where: { email } });
        if (!check) return resNotFound(res, "User Not Found, Sign up first!");
        let user = await bcrypt.compare(password, check.password);
        if (!user) return resErrorOccured(res, "Incorrect Password!");
        const token = jwt.sign({ userId: check.id, firstName: check.firstName, lastName: check.lastName, email: check.email, role: check.role }, secretKey, { expiresIn: '1h' });
        return resDocCreated(res, token);
    } catch (error) {
        return resServerError(res, error);
    }
};

const addUserByAdmin = async (req, res) => {
    try {
        let doc = await db.user.create(req.body);
        return resDocCreated(res, doc);
    } catch (error) {
        return resServerError(res, error);
    }
};

const getAllUsers = async (req, res) => {
    try {
        let doc = await db.user.findAll();
        return resFound(res, doc);
    } catch (error) {
        return resServerError(res, error);
    }
};

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'example@gmail.com',
        pass: 'example'
    }
});

const forgetPassword = async (req, res) => {
    try {
        let check;
        if (req.body.email) {
            check = await db.user.findOne({
                where: {
                    email: req.body.email
                }
            });
        } else return resNotFound(res, "Please provide the Email Address");
        if (!check) return resNotFound(res, "User Not Found!");
        var mailOptions = {
            from: 'it.1902710@gmail.com',
            to: check.email,
            subject: 'Password By Cafe Management Portal',
            html: '<p><b>Your Login Details For Cafe Management System</b><br><b>Email: </b>' + check.email + '<br><b>Password: </b>' + check.password + '<br><a href="http://localhost:4200/">Click Here To Login!</a></p>'
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    } catch (error) {
        return resServerError(res, error);
    }
};

module.exports = {
    signup,
    addUserByAdmin,
    getAllUsers,
    login,
    forgetPassword,
};