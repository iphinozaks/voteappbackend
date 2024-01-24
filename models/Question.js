import mongoose from "mongoose";

const Question = mongoose.model("question", {
    author_id: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        min: 8,
        max: 100
    },
    question: {
        type: String,
        required: true,
        min: 5,
        max: 100
    },
    answers: {
        type: Array
    },
    created_at: { 
        type: Date, 
        required: true, 
        default: Date.now 
    },
    update_at: { 
        type: Date, 
        required: true, 
        default: Date.now 
    }
})

export default Question;