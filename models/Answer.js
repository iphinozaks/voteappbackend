import mongoose from "mongoose";

const Answer = mongoose.model("answer", {
    quest_id: {
        type: String,
        required: true
    },
    ans_id: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
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

export default Answer;