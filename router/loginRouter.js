const express = require("express");
const router = express.Router();
const verifyUser = require("../middleware/verifyUser")
const {loginGET, loginPOST}  = require("../controllers/loginControl")



router.get("/login", loginGET)


router.post("/login", loginPOST)












module.exports = router;