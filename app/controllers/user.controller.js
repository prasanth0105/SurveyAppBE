const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const userSchema = require('../models/registrationSchema');
const transport = require('../misc/mailer');
const joi = require('../middlewares/joi');
const randomString = require('randomstring');
//register api
function registerData(req, res, next) {
    const firstName = req.body.firstName;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const secretToken = randomString.generate();
    const active = false;
    const newUser = {
        firstName: firstName,
        email: email,
        password: password,
        secretToken: secretToken,
        active: active
    }
    //password hashing
    if (password === confirmPassword) {
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(newUser.password, salt, function (err, hash) {
                newUser.password = hash;
                userSchema.create(newUser).then(function (user) {
                    res.send("user added");
                    console.log('User Added...');
                    //Compose email
                    const html = `Hi there
                    <br/>
                    Thankyou for registering
                    <br/><br/>
                    Please verify your email by typing the following token
                    <br/>
                    Token:<b>${secretToken}</b>
                    <br/>On the following page:
                    <a href="http://localhost:8080/verify">http://localhost:8080/verify</a>
                    <br/>
                    Have a nice day.`
                    //Send email
                    transport.sendMail({
                        from: "sitharakm17@gmail.com",
                        to: newUser.email,
                        subject: "Please verify your email",
                        html: html
                    })
                    console.log("please check your email");
                }).catch(err => {
                    console.log(err);
                    err.code = 409;
                    return next(err);
                });
            });
        });
    }
    else {
        res.send("passwords not matching");
    }
}
//login api
function loginData(req, res, next) {
    userSchema.find({ email: req.body.email }, function (err, users) {
        if (!users || !users.length) {
            res.send('invalid email');
            console.log('invalid email');
        }
        if (!users[0].active) {
            res.send('Sorry you have to validate email');
        }
        bcrypt.compare(req.body.password, users[0].password, function (err, result) {
            if (result === true) {
                res.send('user logged in');
                console.log('user logged in');
            }
            else {
                console.log('invalid password');
            }
        });
    });
}
//verify api
function verifyData(req, res, next) {
    var item = {
        active: "true",
        secretToken: ""
    }
    userSchema.updateOne({ secretToken: req.body.secretToken }, { $set: item }, function (err, users) {
        if (err) {
            res.send('user not found');
        }
        else {
            res.send('you may login now');
        }
    });
}
router.post('/register', joi.validator(joi.registerInfo), (req, res, next) => registerData(req, res, next));
router.post('/login', joi.validator(joi.loginInfo), (req, res, next) => loginData(req, res, next));
router.put("/verify", (req, res) => verifyData(req, res));
module.exports = router;