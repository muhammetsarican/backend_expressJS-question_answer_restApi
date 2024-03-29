const express=require("express");
const{askNewQuestion, getAllQuestions, getSingleQuestion, editQuestion, deleteQuestion, likeQuestion, undoLikeQuestion}=require('../controllers/question');
const {getAccessToRoute, getQuestionOwnerAccess}=require("../middleware/authorization/auth");
const {checkQuestionExist}=require("../middleware/database/databaseErrorHelpers");
const questionQueryMiddleware=require("../middleware/query/questionQueryMiddleware")
const answerQueryMiddleware=require("../middleware/query/answerQueryMiddleware")

const Question=require("../models/question");
const Answer=require("../models/answer");
const answer=require("./answer")

const router=express.Router();

router.get("/questions", questionQueryMiddleware(Question, {
    population:{
        path:"user",
        select: "name profile_image"
    }
}), getAllQuestions);
router.post("/ask", getAccessToRoute, askNewQuestion);
router.get("/:id", checkQuestionExist, answerQueryMiddleware(Answer, {
    population:[
        {
            path:"user",
            select:"name profile_image"
        },
        {
            path:"answers",
            select:"content"
        }
    ]
}), getSingleQuestion)
router.put("/:id/edit", [getAccessToRoute, checkQuestionExist, getQuestionOwnerAccess], editQuestion)
router.delete("/:id/delete", [getAccessToRoute, checkQuestionExist, getQuestionOwnerAccess], deleteQuestion)
router.get("/:id/like", [getAccessToRoute, checkQuestionExist], likeQuestion)
router.get("/:id/undoLike", [getAccessToRoute, checkQuestionExist], undoLikeQuestion)

router.use("/:question_id", checkQuestionExist, answer);
module.exports=router;