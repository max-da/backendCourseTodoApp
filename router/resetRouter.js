const express = require("express");
const router = express.Router();
const verifyUser = require("../middleware/verifyUser")
const resetGET = require("../controllers/resetControl");


router.get("/resetPassword", resetGET);







module.exports = router;