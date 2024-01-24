import mongoose from "mongoose";

const Notify = mongoose.model("notify", {
    to: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    quest_id: {
        type: String
    },
    chat_key: {
        type: String
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
    },
    context: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true,
        default: false
    },
    message: {
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

export default Notify;