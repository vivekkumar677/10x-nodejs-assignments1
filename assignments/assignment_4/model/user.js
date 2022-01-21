const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    name: String, 
    email: String,
    age: Number,
    city: String,
    profession: String, 
    selected: Boolean
})
const userTab = mongoose.model("UserTab", userSchema);

module.exports = userTab;
