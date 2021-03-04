const express = require("express");
const router = express.Router();
const {
    registerGET,
    registerPOST,
    regSuccGET
} = require("../controllers/registerControl")



router.get("/register", registerGET)

router.post("/register", registerPOST)


router.get("/success", regSuccGET)




module.exports = router;