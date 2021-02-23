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
        ref: "todo",
    }]



})

userSchema.methods.addUserTodo =  function(todoID){
    this.userTodos.push(todoID);
    this.save();
}

userSchema.methods.removeFromUserTodo = function(id){
    const index = this.userTodos.indexOf(id);
      this.userTodos.splice(index, 1);
    
    this.save()
}

const User = mongoose.model("User",userSchema)
module.exports = User;