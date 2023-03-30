const mongoose=require("mongoose");
const Question = require("./question");

const Schema=mongoose.Schema;

const AnswerSchema=Schema({
    content:{
        type:String,
        required: [true, "Please provide a content"],
        minlength: [10, "Please provide a content at least 10 characters"]
    },
    createAt:{
        type:Date,
        default: Date.now
    },
    likes:[{
        type:mongoose.Schema.ObjectId,
        ref:"user"
    }],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"user",
        required:true
    },
    question:{
        type:mongoose.Schema.ObjectId,
        ref:"question",
        required:true
    }
})

AnswerSchema.pre("save", async function(next){
    if(!this.isModified("user")) return next();

    try{
        const question=await Question.findById(this.question);

        question.answers.push(this._id);
    
        await question.save();
        next();
    }
    catch(err){
        return next(err);
    }
})

module.exports=mongoose.model("Answer", AnswerSchema)