const express=require("express");
const { addAnswerToQuestion, getAllAnswersByQuestion, getSingleAnswer, editAnswer, deleteAnswer, likeAnswer, undoLikeAnswer } = require("../controllers/answer");
const { getAccessToRoute, getAnswerOwnerAccess } = require("../middleware/authorization/auth");
const { checkQuestionAndAnswerExist } = require("../middleware/database/databaseErrorHelpers");

const router=express.Router({mergeParams:true});

router.post("/answer", getAccessToRoute, addAnswerToQuestion);
router.get("/answers", getAllAnswersByQuestion);
router.get("/:answer_id", checkQuestionAndAnswerExist, getSingleAnswer);
router.put("/:answer_id/edit", [checkQuestionAndAnswerExist, getAccessToRoute, getAnswerOwnerAccess], editAnswer);
router.delete("/:answer_id/delete", [checkQuestionAndAnswerExist, getAccessToRoute, getAnswerOwnerAccess], deleteAnswer);
router.get("/:answer_id/like", [checkQuestionAndAnswerExist, getAccessToRoute], likeAnswer);
router.get("/:answer_id/undoLike", [checkQuestionAndAnswerExist, getAccessToRoute], undoLikeAnswer);
module.exports=router;