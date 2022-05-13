const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    task:{
        type:String,
        required:true
    },
    complete:{
        type:Boolean,
        default:false
    },
    description:{
        type:String,
    },
    date:{
        type:Date
    },
    userId:{
        type:String,
    }
});

const Task = mongoose.model('Task',taskSchema);

module.exports = Task;