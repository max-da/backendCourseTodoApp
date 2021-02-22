const express = require("express");
const router = express.Router();
const verifyUser = require("../middleware/verifyUser")
const {resetGET, resetPOST,resetParams, resetFormPOST} = require("../controllers/resetControl");


router.get("/resetPassword", resetGET);

router.post("/resetPassword", resetPOST)

router.get("/resetPassword/:token", resetParams)

router.post("/resetPasswordForm", resetFormPOST)





module.exports = router;