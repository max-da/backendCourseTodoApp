 const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyUser = (req, res, next)=>{
    const token = req.cookies.jwToken;
    if(!token ) return res.render("login.ejs", {err:"Please log in"})
  const validUser =   jwt.verify(token, process.env.TOKEN_KEY)
  

  if(validUser) {
    req.user = validUser;
  }

  next();
}

module.exports = verifyUser;
 