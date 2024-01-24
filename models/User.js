import mongoose from "mongoose";

const User = mongoose.model("user", {
    username: {
        type: String,
        required: true,
        min: 8,
        max: 100
    },
    email: {
        type: String,
        required: true,
        unique: true,
        min: 5,
        max: 225
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 100
    },
    roles: {
        type: String,
        default: "user"
    },
    access_Token: {
        type: String,
        default: ""
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

export default User;