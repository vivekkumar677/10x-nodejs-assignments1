const express = require("express");
const router = express.Router();
const bodyparser = require("body-parser");
const User = require("../models/users");
const { body, validationResult } = require('express-validator'); 
const Post = require("../models/posts");
const faker = require("faker");


router.get("/", async (req, res)=>{
    try{  
        const posts = await Post.find();  
        res.json({
            status:"success",
            data: posts
        })   
    }catch(e){
        res.json({
            status: "failed",
            message: e.message
        })
    }
});

router.post("/",  async (req, res)=>{
    try{  
        console.log(req.body) ;
        console.log(req.user) ;
        const post = await Post.create({
            title: req.body.title,
            body: req.body.body,
            image: faker.internet.avatar(),
            user: req.user});
        return res.json({
            status:"success",
            data: post
        })   
    }catch(e){
        res.json({
            status: "failed",
            message: e.message
        })
    }
});
router.get("/:id", async (req, res)=>{
    try{  
        const posts = await Post.find({user: req.params.id});  
        res.json({
            status:"success",
            data: posts
        })   
    }catch(e){
        res.json({
            status: "failed",
            message: e.message
        })
    }
});
router.delete("/", async (req, res) => {
    try{  
        const posts = await Post.deleteMany({title: req.body.title});  
        res.json({
            status:"success",
            data: posts
        })   
    }catch(e){
        res.json({
            status: "failed",
            message: e.message
        })
    }
});
router.put("/", async (req, res) => {
    try{  
        const posts = await Post.updateOne({user: req.user}, req.body);  
        res.json({
            status:"success",
            data: posts
        })   
    }catch(e){
        res.json({
            status: "failed",
            message: e.message
        })
    }
});

module.exports = router;