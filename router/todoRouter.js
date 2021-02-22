const express = require("express");
const router = express.Router();
const verifyUser = require("../middleware/verifyUser")
const jwtDecode = require("../middleware/jwtDecode")
const {homeRender,
       addDataGET,
       addDataPOST,
       deleteGET,
       editGET,
       editPOST,


} = require("../controllers/todoControl")

router.get("/myTodos", verifyUser, jwtDecode, homeRender);


router.get("/addData",verifyUser,jwtDecode, addDataGET)



router.post("/addData", verifyUser,jwtDecode,addDataPOST)


router.get("/delete/:id",verifyUser, jwtDecode,deleteGET)

router.get("/edit/:id",verifyUser,jwtDecode, editGET)

router.post("/edit",verifyUser,jwtDecode, editPOST)

module.exports = router;
