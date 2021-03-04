require("dotenv").config();
const jwt = require("jsonwebtoken");
//Tar bort jwt or redirectar vid logout
const logoutGET = (req, res) => {
  res.clearCookie("jwToken").redirect("/login");
};

module.exports = {
  logoutGET,
};
