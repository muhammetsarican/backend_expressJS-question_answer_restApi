const User = require("../models/user");
const CustomError=require("../helpers/error/CustomError")

const register = async (req, res, next) => {
    try {
        // POST DATA
        const name = "Hasan Ataman";
        const email = "hasanataman@gmail.com";
        const password = "12345";

        // Async Await
        const user = await User.create({
            name,
            email,
            password
        })
        res
            .status(200)
            .json({
                success: true,
                data: user
            })
    }
    catch(err){
        return next(new Error(err))
    }
}

const err = (req, res, next) => {
    // return next(new CustomError("Throwed an error", 400));
    // return next(SyntaxError("Syntax Error"))
    return next(TypeError("Type Error"))

}

module.exports = ({
    register,
    err
});