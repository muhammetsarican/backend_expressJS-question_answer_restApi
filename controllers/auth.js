const User = require("../models/user");
const CustomError = require("../helpers/error/CustomError")
const asyncErrorWrapper = require("express-async-handler")
const sendJwtToClient=require("../helpers/authorization/sendJwtToClient")

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

const err = (req, res, next) => {
    // return next(new CustomError("Throwed an error", 400));
    // return next(SyntaxError("Syntax Error"))
    return next(TypeError("Type Error"))

}

module.exports = ({
    register,
    err
});