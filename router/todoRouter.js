const express = require("express");
const router = express.Router();

const {homeRender,
       addDataGET,
       addDataPOST,
       deleteGET,
       editGET,
       editPOST,


} = require("../controllers/todoControl")

router.get("/myTodos", homeRender);


router.get("/addData", addDataGET)



router.post("/addData", addDataPOST)


router.get("/delete/:id", deleteGET)

router.get("/edit/:id", editGET)

router.post("/edit", editPOST)

module.exports = router;
