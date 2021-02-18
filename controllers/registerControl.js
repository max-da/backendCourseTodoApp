const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/userSchema");

const registerGET = (req, res) => {
  res.render("register.ejs", {err:""});
};

const registerPOST = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;
    const salt = await bcrypt.genSalt(10);

    if (password === confirmPassword) {
      const hashedPassword = await bcrypt.hash(password, salt);

      console.log(hashedPassword);
      const user = await new User({
        email: email,
        password: hashedPassword,
      }).save();

      return res.send("succ");
    } else {
        
      console.log({ err: "lösen matcha " });
      return res.render("register.ejs",{err:"Lösenorden matchar ej"})
    }
  } catch (err) {
    return res.render("register.ejs",{err:err})
  }
};

module.exports = {
  registerGET,
  registerPOST,
};
