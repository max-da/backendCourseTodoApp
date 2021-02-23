const express = require("express");
const router = express.Router();
const Todo = require("../models/todoSchema");
const User = require("../models/userSchema")

const homeRender = async (req, res) => {
    const page = +req.query.page || 1;
    const sorted = +req.query.sorted || 1;
    
    try {
     
      const user = await User.findOne({email: req.email})
      //console.log(user.userTodos.length)
   //   const x = await user.userTodos.find().countDocuments();
    
      const totaldata = user.userTodos.length
     // const totaldata = await Todo.find().countDocuments();
     // console.log(totaldata)
      const dataPerPage = 2;
      const dataToShow = page + page;
      ///const data = await Todo.find().limit(dataToShow).sort({ date: sorted });
     
      const x = await User.findOne({email: req.email}).populate({path:"userTodos", limit:dataToShow})//.limit(dataToShow)
     const data = x.userTodos
     // console.log(x.userTodos[0])
      res.render("index.ejs", {
        totaldata,
        dataPerPage,
        page,
        removeLink: "",
        dataToShow,
        data,
        todoEdit: "",
        error: "",
      });
    } catch (err) {
     console.log(err)
    }
  };

const addDataGET = async (req, res) => {
    res.render("add.ejs", { removeLink: 1 });
  };

const addDataPOST = async (req, res) => {
   
    const page = +req.query.page || 1;
    const sorted = +req.query.sorted || 1;
    
    try {
      const  todo = await new Todo({
        name: req.body.name,
      }).save();
    
      const user = await User.findOne({email: req.email})
     
      user.addUserTodo(todo)

      res.redirect("/myTodos");
    } 
    catch (err) {
      console.log(err)
      const error = "Your todo is too short or too long";
  
      const totaldata = await Todo.find().countDocuments();
  
      const dataPerPage = 2;
      const dataToShow = page + page;
    
     // const data = await Todo.find().limit(dataToShow).sort({ name: sorted });
     const x = await User.findOne({email: req.email}).populate({path:"userTodos", limit:dataToShow})//.limit(dataToShow)
     const data = x.userTodos
  
      res.render("index.ejs", {
        data: data,
        error: error,
        todoEdit: "",
        totaldata: totaldata,
        dataPerPage: dataPerPage,
        removeLink: 1,
        page: "",
        dataToShow: dataToShow,
      });
    }
  
  };
  
  const deleteGET = async (req, res) => {
    
    await Todo.deleteOne({ _id: req.params.id });
    const id = req.params.id;
 


  const user = await User.findOne({email: req.email})
  user.removeFromUserTodo(id)


   res.redirect(req.headers.referer);
  };

const editGET = async (req, res) => {
    try {
      const todoEdit = await Todo.findOne({ _id: req.params.id });
      let error = "";
      const editReferer = req.headers.referer;
     
      const data = await Todo.find();
  
      res.render("index.ejs", {
        todoEdit: todoEdit,
        error: error,
        data: data,
        totaldata: "",
        dataPerPage: "",
        editReferer: editReferer,
        removeLink: 1,
        totalDataPart: "",
        dataToShow: "",
      });
    } catch (err) {
     
      const error = "Please enter a todo before submitting";
      const data = await Todo.find();
      res.render("index.ejs", {
        data: data,
        error: error,
        totaldata: "",
        dataPerPage: "",
        totalDataPart: "",
        dataToShow: "",
      });
    }
  };

const editPOST = async (req, res) => {

  
    try {
      await Todo.updateOne(
        { _id: req.body.id },
        {
          name: req.body.name,
        },
        { runValidators: true }
      );
    } catch (err) {
  
  
      const error = "Please finish editing todo before submitting";
      const data = await Todo.find();
      const todoEdit = "";
      res.render("index.ejs", {
        data: data,
        error: error,
        todoEdit: todoEdit,
        totaldata: "",
        dataPerPage: "",
        totalDataPart: "",
        dataToShow: "",
        data: "",
      });
    }
  
    res.redirect(req.body.editRef);
  };

module.exports = {
    homeRender,
    addDataGET,
    addDataPOST,
    deleteGET,
    editGET,
    editPOST
}