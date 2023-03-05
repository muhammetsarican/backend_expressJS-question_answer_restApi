const express=require("express")
const {register, err}=require("../controllers/auth")

const router=express.Router()

router.post("/register", register)
router.get("/error", err)

module.exports=router;