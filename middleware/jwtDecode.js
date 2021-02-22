const jwt = require("jsonwebtoken");
require("dotenv").config();



const jwtDecode = (req, res, next)=>
{const token = req.cookies.jwToken;
    
const decoded = jwt.verify(token, process.env.TOKEN_KEY)
req.decoded = decoded;
next()
}
module.exports = jwtDecode;