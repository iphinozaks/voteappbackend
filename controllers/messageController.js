import User from "../models/User.js";
import Message from "../models/Message.js";
import { genCode } from "../generate/genPass.js";
import { pusher } from "../utils/pusherServer.js";
import Notify from "../models/Notify.js";

export const AddChatRoom = async (request,response) => {
    let users = await User.find({
        '_id': {
        $in: request.body.key
        }
    },{_id: true,username: true})
    let room_key = users[0]._id + '%' + users[1]._id;
    let isDuplicate = await Message.find({room_key: room_key});
    if (isDuplicate.length > 0) {
        response.json({
            code: 200,
            status: "OK",
            data: isDuplicate
        })
    }else {
        let data = {
            room_key: room_key,
            users: users
        } 
        Message.insertMany(data)
        .then((result) => {
            response.json({
                code: 200,
                status: "OK",
                data: result
            })
        })
        .catch((err) => {
            response.json({
                code: 500,
                status: "ERROR",
                errors: {
                    "database": [
                        "chat room invalid",
                        err.message
                    ]
                }
            })
        })
    }    
} 

export const GetChatList = async (request,response) => {
    let data = await Message.find({users: {$elemMatch: {_id: request.body.id}}})
    if (data.length > 0) {
        response.json({
            code: 200,
            status: "OK",
            data: data 
        })
    }else {
        response.json({
            code: 404,
            status: "NOT_FOUND",
            errors: {
                "database": [
                    "data tidak ada"
                ]
            }
        })
    }
}

export const DeleteRoom = async (request,response) => {
    let del = await Message.deleteOne({room_key: request.body.key})
    if (del.deletedCount > 0) {
        response.json({
            code: 200,
            status: "OK"
        })
    }else {
        response.json({
            code: 500,
            status: "ERROR",
            errors: {
                "database": [
                    "delete data gagal"
                ]
            }
        })
    }
}

export const PushChat = async (request,response) => {
    let data = {
        _id: genCode(23),
        to: request.body.data.to,
        toUser: request.body.data.toUser,
        from: request.body.data.from,
        fromUser: request.body.data.fromUser,
        text: request.body.data.text,
        created_at: request.body.data.created_at,
        update_at: request.body.data.update_at
    }
    let update = await Message.updateMany({room_key: request.body.data.room_key},{$push: {messages: data}})
    let result = await Message.find({room_key: request.body.data.room_key})
    if (update.modifiedCount > 0) {
        let data = {
            to: request.body.data.to,
            from: request.body.data.from,
            quest_id: "",
            username: request.body.data.fromUser,
            answer: request.body.data.text,
            comment: "",
            chat_key: request.body.data.room_key,
            context: "messages",
            message: `${request.body.data.fromUser} telah mengirimi anda pesan`
        }
        let notif = await Notify.insertMany(data);
        if (notif) {
            pusher.trigger("voteChat","pushChat", {result})
            pusher.trigger("voteNotif","pushNotif",{notif})
            response.json({
                code: 200,
                status: "OK",
                data: result
            })
        }else {
            pusher.trigger("voteChat","pushChat", {result})
            response.json({
                code: 200,
                status: "OK",
                data: result
            })
        }
    }else {
        response.json({
            code: 500,
            status: "ERROR",
            errors: {
                "database": [
                    "kirim pesan gagal"
                ]
            }
        })
    }
}

export const GetMessageById = async (request,response) => {
    let data = await Message.find({room_key: request.body.id},{messages: {text: request.body.text}})
    if (data[0]) {
       response.json({
        code: 200,
        status: "OK",
        chat: data[0].messages[0].text
       }) 
    }else {
        response.json({
            code: 404,
            status: "NOT_FOUND",
            errors: [
                "data tidak ditemukan"
            ]
        })
    }
}