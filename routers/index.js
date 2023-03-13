const express=require("express");
const auth=require("./auth");
const question=require("./question");
const user=require("./user");
const admin=require("./admin");

const router=express.Router();

router.use("/auth", auth);
router.use("/question", question);
router.use("/user", user);
router.use("/admin", admin);
module.exports=router;