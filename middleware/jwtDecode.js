const jwt = require("jsonwebtoken");
require("dotenv").config();

//Dekodar jwt för att ge tillgång till username osv

const jwtDecode = (req, res, next)=>
{const token = req.cookies.jwToken;
    
const decoded = jwt.verify(token, process.env.TOKEN_KEY)

req.email = decoded.user.email;
next()
}
module.exports = jwtDecode;