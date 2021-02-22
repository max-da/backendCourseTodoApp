const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");



const homeGET = (req, res) =>{
    console.log(req.user)
    res.render("home.ejs",{user:req.user})
}


const logoutGET =  (req, res)=>{
    

    res.clearCookie("jwToken").redirect("/login")
}



module.exports = {
    homeGET,
    logoutGET
};