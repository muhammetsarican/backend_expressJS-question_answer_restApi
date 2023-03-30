const express=require("express");
const { addAnswerToQuestion, getAllAnswersByQuestion, getSingleAnswer, editAnswer } = require("../controllers/answer");
const { getAccessToRoute, getAnswerOwnerAccess } = require("../middleware/authorization/auth");
const { checkQuestionAndAnswerExist } = require("../middleware/database/databaseErrorHelpers");

const router=express.Router({mergeParams:true});

router.post("/answer", getAccessToRoute, addAnswerToQuestion);
router.get("/answers", getAllAnswersByQuestion)
router.get("/:answer_id", checkQuestionAndAnswerExist, getSingleAnswer)
router.put("/:answer_id/edit", [checkQuestionAndAnswerExist, getAccessToRoute, getAnswerOwnerAccess], editAnswer)
module.exports=router;