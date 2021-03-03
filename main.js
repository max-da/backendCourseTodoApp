const { path } = require("dotenv/lib/env-options");
const express = require("express");
const mongoose = require("mongoose");
const nodeSass = require("node-sass-middleware");
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended : true}));
require("dotenv").config();
const registerRouter = require("./router/registerRouter")
const todoRouter = require("./router/todoRouter")
const loginRouter = require("./router/loginRouter")
const homeRouter = require("./router/homeRouter")
const resetRouter = require("./router/resetRouter")

const options ={useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex:true, useCreateIndex: true}
//app.use("/", router)
const cookieParser = require("cookie-parser")
app.set("view engine", "ejs")


app.use(nodeSass(
       { src:__dirname + "/scss",
        dest: __dirname + "/public/style/css",
        debug:true,
    outputStyle:"compressed",
prefix:"/css"}

)
    )
    app.use(express.static(__dirname + "/public/style"))
  
    app.use(cookieParser())
mongoose.connect(process.env.DbLogin,options, (err)=>{
    if (err) return
    app.listen(8000,()=>{
        console.log("Portnumber:8000")
    })
})
app.use(resetRouter)
app.use(homeRouter)
app.use(registerRouter)
app.use(todoRouter)
app.use(loginRouter)
//app.use(fbRouter)
