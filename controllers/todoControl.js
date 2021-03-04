const express = require("express");
const router = express.Router();
const Todo = require("../models/todoSchema");
const User = require("../models/userSchema");

const homeRender = async (req, res) => {
  const page = +req.query.page || 1;
  const sorted = +req.query.sorted || 1;

  try {
    const user = await User.findOne({ email: req.email });

    const totaldata = user.userTodos.length;

    const dataPerPage = 2;
    const dataToShow = page + page;

    const x = await User.findOne({ email: req.email }).populate({
      path: "userTodos",
      options: { sort: { date: sorted }, limit: dataToShow },
    });
    const data = x.userTodos;

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
    console.log(err);
  }
};

const addDataGET = async (req, res) => {
  res.render("add.ejs", { removeLink: 1 });
};

const addDataPOST = async (req, res) => {
  const page = +req.query.page || 1;
  const sorted = +req.query.sorted || 1;

  try {
    const todo = await new Todo({
      name: req.body.name,
    }).save();

    const user = await User.findOne({ email: req.email });

    user.addUserTodo(todo);

    res.redirect("/");
  } catch (err) {
    console.log(err);
    const error = "Your todo is too short or too long";

    const totaldata = await Todo.find().countDocuments();

    const dataPerPage = 2;
    const dataToShow = page + page;

    const x = await User.findOne({ email: req.email }).populate({
      path: "userTodos",
      options: { sort: { date: sorted }, limit: dataToShow },
    });
    const data = x.userTodos;

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

  const user = await User.findOne({ email: req.email });
  user.removeFromUserTodo(id);

  res.redirect(req.headers.referer);
};

const editGET = async (req, res) => {
  try {
    const todoEdit = await Todo.findOne({ _id: req.params.id });
    console.log(todoEdit);
    let error = "";
    const editReferer = req.headers.referer;

    const x = await User.findOne({ email: req.email }).populate({
      path: "userTodos",
    }); //.limit(dataToShow)
    const data = x.userTodos;

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
    console.log(err);
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
    res.redirect(req.body.editRef);
  } catch (err) {
    const error = "Please finish editing todo before submitting";

    const x = await User.findOne({ email: req.email }).populate({
      path: "userTodos",
    }); //.limit(dataToShow)
    const data = x.userTodos;
    console.log(data);

    res.render("index.ejs", {
      data: data,
      error: error,
      todoEdit: "",
      totaldata: "",
      dataPerPage: "",
      totalDataPart: "",
      dataToShow: "",
      removeLink: 1,
    });
  }
};

module.exports = {
  homeRender,
  addDataGET,
  addDataPOST,
  deleteGET,
  editGET,
  editPOST,
};
