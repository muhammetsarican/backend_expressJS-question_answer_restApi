const express=require("express");
const { blockUser, deleteUser } = require("../controllers/admin");
const {getAccessToRoute, getAdminAccess}=require("../middleware/authorization/auth");
const {checkUserExists}=require("../middleware/database/databaseErrorHelpers");

const router=express.Router();

router.use([getAccessToRoute, getAdminAccess]);

router.get("/block/:id", checkUserExists, blockUser);
router.delete("/delete/:id", checkUserExists, deleteUser);
router.get("/", (req, res, next)=>{
    res.status(200)
    .json({
        success:true,
        message:"Welcome to Admin"
    });
    next()
});
module.exports=router;