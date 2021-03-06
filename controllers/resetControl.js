const User = require("../models/userSchema");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
require("dotenv").config();
const bcrypt = require("bcrypt");

const resetGET = (req, res) => {
  res.render("resetPassword.ejs", { err: "", errorReset: "" });
};

//Först kollar att man är användare, sen skapas ett token vilet är ett godtyckligt nummer som gäller i en viss tid
//detta sparas sen i model man kommer sen använda detta nummer för en custom endpoint där man kan reseta sitt password
const resetPOST = async (req, res) => {
  const email = req.body.email;

  try {
    if (!email)
      res.render("resetPassword.ejs", {
        errorReset: "",
        err: "Please enter field before submitting",
      });
    const user = await User.findOne({ email: email });

    if (!user) res.render("resetPassword.ejs", { errorReset: true, err: "" });

    const token = crypto.randomBytes(16).toString("hex");
    console.log(token);
    user.token = token;
    user.tokenExp = Date.now() + 3600000;
    await user.save();

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "max.dahlbo@gmail.com",
        pass: process.env.TRANSPORT_PASS,
      },
    });

    await transport.sendMail({
      from: "max.dahlbo@gmail.com",
      to: user.email,

      html:
        "<h1>Dear " +
        user.firstname +
        "</h1>" +
        "<p>A request for a password reset has been submitted, to change password please follow the link</p>" +
        `<h2> <a href="http://localhost:8000/resetPassword/${user.token}">Reset password</a>`,
    });

    res.redirect("/success");
  } catch (err) {
    res.send(err);
  }
};
//Mailet som skickas har alltså token som adress, och man skapar sen en egen endpoint med denna token 
//här hämtar vi samma token från params, kollar att den inte gått ut 
const resetParams = async (req, res) => {
  const token = req.params.token;

  try {
    const user = await User.findOne({
      token: token,
      tokenExp: { $gt: Date.now() },
    });
    if (!user) res.render("login.ejs", { err: "Reset link expired" });
    res.render("resetPasswordForm.ejs", {
      errorReset: "",
      err: "",
      email: user.email,
    });
  } catch (err) {
    res.render("resetPassword.ejs", { errorReset: "", err: err });
  }
};
//samma errorhantering som i registrering, uppdaterar och sparar
const resetFormPOST = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;
    const salt = await bcrypt.genSalt(10);
    if (!password || !confirmPassword)
      res.render("resetPasswordForm.ejs", {
        err: "Please enter both fields",
        email: email,
      });

    if (
      (password && password != confirmPassword) ||
      (password && password.length < 5)
    ) {
      return res.render("resetPasswordForm.ejs", {
        err: "Password is too short or doesn't match",
        email: email,
      });
    } else if (password) {
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = await User.findOne({ email: email });
      user.password = hashedPassword;
      user.save();
      res.render("regSuccess.ejs");
    } else {
      res.render("resetPasswordForm.ejs", {
        err: "Password is too short or doesn't match",
        email: email,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  resetGET,
  resetPOST,
  resetFormPOST,
  resetParams,
};
