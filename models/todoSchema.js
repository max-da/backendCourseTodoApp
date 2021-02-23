const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
/*     todoUser: [{
        type:mongoose.Schema.ObjectId,
        ref: "User",
    }], */
        name:{
            type: String,
            lowercase: true,
            required: true,
            minlength: 2,
            maxlength: 15

        },
        date: {
            type: Date,
            default: Date.now
        }
})
const Todo = mongoose.model("todo", todoSchema);
module.exports = Todo;