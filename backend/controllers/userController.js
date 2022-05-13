const User = require('../models/userModel');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const ErrorHandler = require('../utils/errorHandler');

dotenv.config({path:'../.env'});

const getUser = async (req,res,next) => {
    try{
     
        const token = req.headers.token.split(' ')[1];

        const decode = jwt.verify(token,process.env.JWT_TOKEN);

        const { id, photoId } = decode;

        res.status(200).json({
            result:'success',
            message:{
                id,photoId
            }
        });

    }catch(error){
        return next(new ErrorHandler(error.message));
    }
};

const signup = async (req,res,next) => {
    try{
        const user = req.body;


        const users = await User.find();

        const isExistUser = await User.findOne({email:user.email});


        if(isExistUser){
            return res.status(500).json({
                result:'error',
                message:'User is already exist'
            });
        }

        const suser = new User(user);

        suser.photoId = users.length+1;

        await suser.save();

        res.status(200).json({
            result:"success",
            message:{
                user:suser
            }
        });

    }catch(error){
        return next(new ErrorHandler(error.message));
    }
};

const login = async (req,res,next) => {
    try{

        const { email, password } = req.body;
        
        const isExistUser = await User.findOne({email});

        if(!isExistUser){
            return next(new ErrorHandler('user does not exist',500));
        }

        const isValidPassword = await bcrypt.compare(password,isExistUser.password);

        if(!isValidPassword){
            return next(new ErrorHandler('please check the email id or password',500));
        }

        const token = jwt.sign({id:isExistUser._id,photoId:isExistUser.photoId},process.env.JWT_TOKEN,{expiresIn:'5h'})

        res.status(200).json({
            result:"success",
            message:{
                id:isExistUser._id,
                token,
                photoId:isExistUser.photoId
            }
        })

    }catch(error){
        return next(new ErrorHandler(error.message));
    }
}

module.exports = {getUser,login,signup}
