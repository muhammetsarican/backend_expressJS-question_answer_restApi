const User = require("../models/user");
const CustomError = require("../helpers/error/CustomError")
const asyncErrorWrapper = require("express-async-handler")
const {sendJwtToClient}=require("../helpers/authorization/tokenHelpers")

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

const tokentest = (req, res, next) => {
    res.json({
        success:true, 
        message:"Welcome to Tokentest"
    })

}

module.exports = ({
    register,
    tokentest
});