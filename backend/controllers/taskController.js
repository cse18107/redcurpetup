const Task = require('../models/taskModel');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const ErrorHandler = require('../utils/errorHandler');

dotenv.config({path:'../.env'});

const getTasks = async (req,res,next) => {
    try{
        const token = req.headers.token.split(' ')[1];

        const decode = jwt.verify(token,process.env.JWT_TOKEN);

        const tasks = await Task.find({userId: decode.id});

        res.status(200).json({
            result:"success",
            message:{
                userId:decode.id,
                tasks
            }
        })


    }catch(error) {

        return next(new ErrorHandler(error.message));
    }
};

const createTask = async (req,res,next) => {
    try{
        const taskBody = req.body;

        const token = req.headers.token.split(' ')[1];

        const decode = jwt.verify(token,process.env.JWT_TOKEN);

        const task = new Task(taskBody);

        task.userId = decode.id;

        await task.save(); 

        const tasks = await Task.find({userId: decode.id});

        res.status(200).json({
            result:'success',
            message:{
                tasks
            }
        })
    }catch(error) {

        return next(new ErrorHandler(error.message));
    }
};

const getTask = async (req,res,next) => {
    try{
        const id = req.param;

        const task = await Task.findById(id);

        res.status(200).json({
            result:"success",
            message:{
                task
            }
        })

    }catch(error) {

        return next(new ErrorHandler(error.message));
    }
};

const updateTasks = async (req,res,next) => {
    try{
        const {id} = req.params;

        console.log(id);

        const uptask = req.body;

        const task = await Task.findByIdAndUpdate(id,uptask);

        const token = req.headers.token.split(' ')[1];

        const decode = jwt.verify(token,process.env.JWT_TOKEN);

        const tasks = await Task.find({userId: decode.id});

        res.status(200).json({
            result:"success",
            message:{
                tasks
            }
        })
    }catch(error) {

        return next(new ErrorHandler(error.message));
    }
};
const deleteTasks = async (req,res,next) => {
    try{
        const {id} = req.params;

        const task = await Task.findByIdAndDelete(id);

        const token = req.headers.token.split(' ')[1];

        const decode = jwt.verify(token,process.env.JWT_TOKEN);

        const tasks = await Task.find({userId: decode.id});

        res.status(200).json({
            result:"success",
            message:{
                tasks
            }
        })
    }catch(error) {

        return next(new ErrorHandler(error.message));
    }
};

module.exports = {getTask,getTasks,updateTasks,deleteTasks,createTask}
