const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const loginGET = (req, res) => {
  res.render("login.ejs", { err: "" });
};

const loginPOST = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password)
      return res.render("login.ejs", { err: "Please enter all fields" });

    const user = await User.findOne({ email: email });

    if (!user)
      return res.render("login.ejs", {
        err: "There is no user with that email",
      });

    const validUser = await bcrypt.compare(password, user.password);
    if (!validUser) return res.render("login.ejs", { err: "Wrong password" });
    
    const jwToken = await jwt.sign({user:user},process.env.TOKEN_KEY)
    
    if (jwToken) {
        const cookie = req.cookies.jwToken;

   if (!cookie){
        res.cookie("jwToken",jwToken,{maxAge: 604800, httpOnly:true})
    }



    res.redirect("/");
}

  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  loginGET,
  loginPOST,
};
