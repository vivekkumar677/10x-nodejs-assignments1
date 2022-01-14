
const express = require("express");
const bodyparser = require("body-parser");
const faker = require("faker");
const mogoose = require("mongoose");
const User = require("./model/user");
var methodOverride = require('method-override')
const app = express();

mogoose.connect("mongodb://localhost:27017/users");
app.use(bodyparser());

app.use(express.static("public"));
app.use(methodOverride('_method'));

app.set('views', './views');
app.set('view engine', 'ejs');

app.get("/", async (req, res) =>{
    const users = await User.find();
    console.log(users);
    res.render("home.ejs", {users});
});

app.get("/form", (req, res) =>{
    res.render("form.ejs");
});

app.post("/add/user", async (req, res) =>{
    //Create records in database
    await User.create(req.body);
    res.redirect("/");
});

app.put("/edit/:id/user", async (req, res) =>{
    console.log("I am in edit");
    await User.updateOne({_id: req.params.id}, {selected: true});
    res.redirect("/");
});

app.delete("/delete/:id/user", async (req, res) =>{
    console.log("I am in delete");
    await User.deleteOne({_id: req.params.id});
    res.redirect("/");
})
app.listen(3000, ()=> console.log("Server is running"));
