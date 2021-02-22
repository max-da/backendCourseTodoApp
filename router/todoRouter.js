const express = require("express");
const router = express.Router();
const verifyUser = require("../middleware/verifyUser")
const {homeRender,
       addDataGET,
       addDataPOST,
       deleteGET,
       editGET,
       editPOST,


} = require("../controllers/todoControl")

router.get("/myTodos", verifyUser, homeRender);


router.get("/addData",verifyUser, addDataGET)



router.post("/addData", verifyUser,addDataPOST)


router.get("/delete/:id",verifyUser, deleteGET)

router.get("/edit/:id",verifyUser, editGET)

router.post("/edit",verifyUser, editPOST)

module.exports = router;
