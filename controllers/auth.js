const User = require("../models/user");
const CustomError = require("../helpers/error/CustomError")
const asyncErrorWrapper = require("express-async-handler")
const {sendJwtToClient}=require("../helpers/authorization/tokenHelpers");
const {validateUserInput, comparePassword} = require("../helpers/input/inputHelpers");


const register = asyncErrorWrapper(async (req, res, next) => {
    // POST DATA
    // Async Await
    const { name, email, password, role } = req.body;
    const user = await User.create({
        name,
        email,
        password,
        role
    })
    sendJwtToClient(user, res);
});

const getUser = (req, res, next) => {
    res.json({
        success:true, 
        data:{
            id:req.user.id,
            name:req.user.name
        }
    })
}
const login=asyncErrorWrapper(async (req, res, next)=>{
    const {email, password}=req.body;
    if(validateUserInput(email, password)){
        res.status(200)
        .json({
            success:true, 
            message:"You successfully logged in"
        })
    }
    else{
        return next(new CustomError("Please check email or password!", 400))
    }
    const user=await User.findOne({email}).select("+password");
    console.log(user)
    
    if(!comparePassword(password, user.password)){
        return next(new CustomError("Please check your credentials", 400))
    }
    
    sendJwtToClient(user, res);
});
const logout=asyncErrorWrapper(async (req, res, next)=>{
    const {NODE_ENV}=process.env;

    return res.status(200)
    .cookie({
        httpOnly: true,
        expires: new Date(Date.now()),
        secure: NODE_ENV==="development"?false:true
    }).json({
        success:true,
        message:"Logout Successfull"
    })
});

const imageUpload=asyncErrorWrapper(async (req, res, next)=>{

    const user= await User.findByIdAndUpdate(req.user.id, {
        profile_img:req.savedProfileImage
    },{
        new:true,
        runValidators:true
    });
    res.status(200)
    .json({
        success:true, 
        message:"Image Upload Successfull",
        data: user
    })
})

module.exports = ({
    register,
    getUser,
    login,
    logout,
    imageUpload 
});