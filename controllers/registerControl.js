const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/userSchema");

const registerGET = (req, res) => {
  res.render("register.ejs", {err:""});
};

const registerPOST = async (req, res) => {
  try {
    const { firstname, lastname,email, password, confirmPassword } = req.body;
    const salt = await bcrypt.genSalt(10);

    if (password === confirmPassword) {
      const hashedPassword = await bcrypt.hash(password, salt);

    
      const user = await new User({
        firstname:firstname,
        lastname:lastname,
        email: email,
        password: hashedPassword,
      }).save();

      return res.redirect("/registerSuccess");
    } else {
        
     
      return res.render("register.ejs",{err:"Lösenorden matchar ej"})
    }
  } catch (err) {
    return res.render("register.ejs",{err:err})
  }
};

const regSuccGET = (req,res)=>{
  
 
  res.render("regSuccess.ejs");

 
}

module.exports = {
  registerGET,
  registerPOST,
  regSuccGET
};
