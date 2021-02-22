 const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyUser = (req, res, next)=>{
    const token = req.cookies.jwToken;
    if(!token ) return res.render("login.ejs", {err:"Du måste logga in"})
  const validUser =   jwt.verify(token, process.env.TOKEN_KEY)
  
  // läser in den här token data , lägger till token datan i req objektet. 
  //
  if(validUser) {
    req.user = validUser;
  }

  next();
}

module.exports = verifyUser;
 