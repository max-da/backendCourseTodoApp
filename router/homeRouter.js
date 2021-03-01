const express = require("express");
const router = express.Router();
const verifyUser = require("../middleware/verifyUser")
const {homeGET,logoutGET} = require("../controllers/homeControl")


router.get("/", verifyUser, homeGET)

router.get("/logout",  logoutGET)

module.exports = router;