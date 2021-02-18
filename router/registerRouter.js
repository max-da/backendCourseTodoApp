const express = require("express");
const router = express.Router();
const {
    registerGET,
    registerPOST
} = require("../controllers/registerControl")



router.get("/register", registerGET)

router.post("/register", registerPOST)







module.exports = router;