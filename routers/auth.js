const express=require("express");
const {register, getUser, login, logout, imageUpload}=require("../controllers/auth");
const {getAccessToRoute}=require("../middleware/authorization/auth");
const profileImageUpload = require("../middleware/libraries/profileImageUpload");

const router=express.Router();

router.post("/register", register);
router.get("/profile", getAccessToRoute, getUser);
router.post("/login", login);
router.get("/logout", getAccessToRoute, logout);
router.post("/upload", [getAccessToRoute, profileImageUpload.single("profile_image")], imageUpload);

router.get("/", (req, res, next)=>{
    res.status(200)
    .json({
        success:true,
        message:"Welcome to Express Js"
    })
});

module.exports=router;