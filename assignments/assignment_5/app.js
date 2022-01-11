// Create a Rest API backend service for a post sharing project in NodeJs and Express
// Create a sign up and registration API for users (user email as their username)
// Create User and Post schema for the app, a user can create a post with title, body, and image (URL)
// Create CRUD APIs for the posts, allow all users to see all the posts, but only authorized user can edit/delete the post
// Use JWT for authenticating the users and allowing only authorized users to edit/delete their posts

const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const userRoutes = require("./routes/user");
const loginRoutes = require("./routes/login");
const postRoutes = require("./routes/posts");
const User = require("./models/users");
var jwt = require('jsonwebtoken');
mongoose.connect("mongodb://localhost:27017/users");
const secret = "RESTAPI"


const app = express();
app.use(bodyparser());

app.use("/api/v1/posts", async (req, res, next) => {
    try {
        // console.log(req.headers);
        const token = req.headers.authorization.split("test ")[1];
        console.log(token);
        if (!token) {
            return res.json({
                status: "failed",
                message: "Not valid request"
            })
        }
        jwt.verify(token, secret, async function (err, decoded) {
            console.log(err, decoded);
            if (err) {
                return res.json({
                    status: "failed",
                    message: "Invalid token"
                })
            }
            const user = await User.findOne({ _id: decoded.data });
            console.log(user);
            req.user = user._id;
            next();
        });
    } catch (e) {
        res.status(400).json({
            status: "failed",
            message: "Token not authenticated"
        });
    }
});

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/", loginRoutes);
app.use("/api/v1/posts", postRoutes);

app.listen(3000, () => console.log("Server is started"));
