const User = require("../models/user");

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
        return next(err)
    }
}

// const err = () => {
//     throw new Error("Throwed an error");
// }

module.exports = ({
    register
    // err
});