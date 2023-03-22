const express=require("express");
const{askNewQuestion, getAllQuestions, getSingleQuestion}=require('../controllers/question');
const {getAccessToRoute}=require("../middleware/authorization/auth");
const {checkQuestionExist}=require("../middleware/database/databaseErrorHelpers");

const router=express.Router();

router.get("/questions", getAllQuestions);
router.post("/ask", getAccessToRoute, askNewQuestion);
router.get("/:id", checkQuestionExist,getSingleQuestion)

module.exports=router;