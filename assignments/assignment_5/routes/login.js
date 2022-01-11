const express = require("express");
const router = express.Router();
const User = require("../models/users");
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const { json } = require("body-parser");
const secret = "RESTAPI"

router.post("/register", body("email"), body("password"), async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { name, email, password } = req.body;
        bcrypt.hash(password, 10, async function (err, hash) {
            try {
                if (err) {
                    console.log(err);
                    return res.status(400).json({
                        status: "failed",
                        message: "Invalid data"
                    })
                } else {
                    const user = await User.create({
                        name,
                        email,
                        password: hash
                    });
                    return res.json({
                        status: "succes",
                        data: user
                    })
                }
            } catch (e) {
                res.json({
                    status: "failed",
                    message: e.message
                })
            }
        });
    } catch (e) {
        res.json({
            status: "failed",
            message: e.message
        })
    }

});

router.post("/login", body("email"), body("password"), async (req, res) => {
    try {
        console.log(req.body);
        const { email, password } = req.body;
        // Load hash from your password DB.
        const user = await User.findOne({ email });
        console.log(user);
        console.log(password);
        bcrypt.compare(password, user.password, async function (err, result) {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    status: "failed",
                    message: "Invalid credentials"
                })
            } else {
                if(result){
                    const token = jwt.sign({
                        exp: Math.floor(Date.now() / 1000) + (60 * 60),
                        data: user._id
                    }, secret);
                    return res.json({
                        status: "success",
                        token: token
                    });
                }else{
                    console.log(result);
                    return res.status(400).json({
                        status: "failed",
                        message: "Invalid credentials"
                    })
                }
            }
        });
    } catch (e) {
        res.json({
            status: "failed",
            message: e.message
        })
    }
});


module.exports = router;
