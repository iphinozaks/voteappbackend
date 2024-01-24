import mongoose from "mongoose";

const Comment = mongoose.model("comment", {
    quest_id: {
        type: String,
        required: true
    },
    answer_id: {
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
    comment: {
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

export default Comment;