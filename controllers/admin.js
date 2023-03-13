const CustomError = require("../helpers/error/CustomError");
const User=require("../models/user");
const asyncErrorWrapper=require("express-async-handler");

const blockUser=asyncErrorWrapper(async (req, res, next)=>{
    const {id}=req.params;

    const user= await User.findById(id);

    user.blocked=!user.blocked;

    await user.save()

    return res.status(200)
    .json({
        success:true,
        message:"Block - Unblock Successfull"
    });
});

const deleteUser=asyncErrorWrapper(async (req, res, next)=>{
    const {id}=req.params;

    const user=await User.findByIdAndDelete(id);

    // user=await user.remove(); // I got an error, error is user.remove not a function, and I find a different way.

    return res.status(200)
    .json({
        success:true,
        message:"Delete Operation Successfull",
        data:user
    });
})
module.exports={
    blockUser,
    deleteUser
};