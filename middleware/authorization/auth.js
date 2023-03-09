const CustomError = require("../../helpers/error/CustomError")
const jwt=require("jsonwebtoken")
const {isTokenIncluded, getAccessTokenFromHeader}=require("../../helpers/authorization/tokenHelpers")


const getAccessToRoute=(req, res, next)=>{
    const {JWT_SECRET_KEY}=process.env;

    if(!isTokenIncluded(req)){
        // 401 Unauthorized
        // 403 Forbidden, If you try to reach admin part you get this error
        return next(
            new CustomError("You not authorized yet!", 401)
        );
    }
    const accessToken=getAccessTokenFromHeader(req);

    jwt.verify(accessToken, JWT_SECRET_KEY, (err, decoded)=>{
        if(err){
            return next(new CustomError("You are not authorized to access this route", 401));
        }
        console.log(decoded);
        next();
    })
}

module.exports={
    getAccessToRoute
}