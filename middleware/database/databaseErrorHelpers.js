const CustomError = require('../../helpers/error/CustomError');
const User=require('../../models/user');
const asyncErrorWrapper=require('express-async-handler');

const checkUserExists = asyncErrorWrapper(async(req, res, next)=>{
    const {id}=req.params;

    const user=await User.findById(id);

    if(!user){
        return next(new CustomError('There is no such user with that ID.',400));
    }

    next();
})

module.exports={
    checkUserExists
};