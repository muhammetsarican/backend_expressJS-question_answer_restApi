const express=require("express")
const{home}=require('../controllers/question')

const router=express.Router()

router.get("/", home)

module.exports=router;