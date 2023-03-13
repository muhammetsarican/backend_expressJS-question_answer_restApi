const express=require("express");
const {register, getUser, login, logout, imageUpload, forgotPassword, resetPassword, editDetails}=require("../controllers/auth");
const {getAccessToRoute}=require("../middleware/authorization/auth");
const profileImageUpload = require("../middleware/libraries/profileImageUpload");

const router=express.Router();

router.post("/register", register);
router.get("/profile", getAccessToRoute, getUser);
router.post("/login", login);
router.get("/logout", getAccessToRoute, logout);
router.post("/forgotPassword", forgotPassword);
router.post("/upload", [getAccessToRoute, profileImageUpload.single("profile_image")], imageUpload);
router.put("/resetPassword", resetPassword);
router.put("/edit", getAccessToRoute, editDetails)

router.get("/", (req, res, next)=>{
    res.status(200)
    .json({
        success:true,
        message:"Welcome to Express Js"
    })
});

module.exports=router;