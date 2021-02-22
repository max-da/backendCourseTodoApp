const mongoose = require("mongoose");
const Todo = require("./todoSchema");


const userSchema = new mongoose.Schema ({
    firstname:{type:String, required:true},
    lastname:{type:String, required:true},
    email:{type:String, required: true, unique:true},
    password:{type:String, required:true, minlength:5},
    token: String,
    tokenExp: Date,
    userTodos: [{
        type:mongoose.Schema.ObjectId,
        ref: "Todo",
    }]



})

userSchema.methods.addUserTodo =  function(todoID){
    this.userTodos.push(todoID);
    this.save();
}

const User = mongoose.model("User",userSchema)
module.exports = User;