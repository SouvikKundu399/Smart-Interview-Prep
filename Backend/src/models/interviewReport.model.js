import mongoose from "mongoose";

const technicalQuestionSchema = mongoose.Schema({
    question: {
        type: String,
        requuired: [true,"Technical question is required"],
    },
    intension: {
        type: String,
        required: [true, "Intention is required"]
    },
    answer: {
        type: String,
        required: [true, "answer is required"]
    }
},{
    _id:false
})

const behavioralQuestionSchema = mongoose.Schema({
    question: {
        type: String,
        requuired: [true, "Behavioral question is required"],
    },
    intension: {
        type: String,
        required: [true, "Intention is required"]
    },
    answer: {
        type: String,
        required: [true, "answer is required"]
    }
}, {
    _id: false
})

const skillGapsSchema = mongoose.Schema({
    skill:{
        type: String,
        required: [true,"Skills is required"]
    },
    severity:{
        type: String,
        enum: ["low","medium","high"],
        required: true
    }},{
        _id: false
})


const preparationPlanSchema = new mongoose.Schema({
    day: {
        type: Number,
        required: [true,"Day is required"],
    },
    focus:{
        type: Number,
        required: [true, "Focus is required"]
    },
    tasks: [{
        type: String,
        required: [true, "Task is required"]
    }]
})    

const interviewReportSchema = mongoose.Schema({
    jobDescription : {
        type: String,
        required: [true,"Job Description is required"]
    },
    resume : {
        type: String
    },
    selfDescription: {
        type: String
    },
    matchScore: {
        type: Number,
        min: 0,
        max: 100
    },
    get matchScore() {
        return this._matchScore;
    },
    set matchScore(value) {
        this._matchScore = value;
    },
    technicalQuestion: [technicalQuestionSchema],
    behavioralQuestion: [behavioralQuestionSchema],
    skillGaps: [skillGapsSchema],
    preparationPlan: [preparationPlanSchema],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    title:{
        type: String,
        required: [true,"Job title is required"]
    }
},{
    timestamps: true
})

const InterviewReport = mongoose.model("InterviewReport",interviewReportSchema);

export default InterviewReport;