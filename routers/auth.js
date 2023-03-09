const express=require("express")
const {register, tokentest}=require("../controllers/auth")
const {getAccessToRoute}=require("../middleware/authorization/auth");

const router=express.Router()

router.post("/register", register)
router.get("/tokentest", getAccessToRoute, tokentest)

router.get("/", (req, res, next)=>{
    res.json({
        success:true,
        message:"Welcome to Express Js"
    })
})

module.exports=router;