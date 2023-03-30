const express=require("express");
const{askNewQuestion, getAllQuestions, getSingleQuestion, editQuestion, deleteQuestion, likeQuestion, undoLikeQuestion}=require('../controllers/question');
const {getAccessToRoute, getQuestionOwnerAccess}=require("../middleware/authorization/auth");
const {checkQuestionExist}=require("../middleware/database/databaseErrorHelpers");
const answer=require("./answer")

const router=express.Router();

router.get("/questions", getAllQuestions);
router.post("/ask", getAccessToRoute, askNewQuestion);
router.get("/:id", checkQuestionExist,getSingleQuestion)
router.put("/:id/edit", [getAccessToRoute, checkQuestionExist, getQuestionOwnerAccess], editQuestion)
router.delete("/:id/delete", [getAccessToRoute, checkQuestionExist, getQuestionOwnerAccess], deleteQuestion)
router.get("/:id/like", [getAccessToRoute, checkQuestionExist], likeQuestion)
router.get("/:id/undoLike", [getAccessToRoute, checkQuestionExist], undoLikeQuestion)

router.use("/:question_id", checkQuestionExist, answer);
module.exports=router;