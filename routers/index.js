const express=require("express");
const auth=require("./auth")
const question=require("./question");

const router=express.Router();

router.use("/auth", auth)
router.use("/question", question)

module.exports=router;