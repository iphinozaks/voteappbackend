import Answer from "../models/Answer.js";
import Notify from "../models/Notify.js";
import Comment from "../models/Comment.js";
import Question from "../models/Question.js";
import { Socket } from "../utils/socketServer.js";

export const GetAnsByParams = async (request,response) => {
    let data1 = await Answer.find({quest_id: request.body.params})
    let data2 = await Comment.find({quest_id: request.body.params})
    let quest = data1.concat(data2)   
    const unique = []
    for (let i = 0; i < quest.length; i++) {
        const isDuplicate = unique.find((obj) => obj.user_id === quest[i].user_id);
        if (!isDuplicate) {
            unique.push(quest[i]);
        }else {
            let index = unique.findIndex(x => x.user_id == quest[i].user_id)
            unique.splice(index,1,quest[i])
        }
    }
    if (unique) {
        response.json({
            code: 200,
            status: "OK",
            data: unique
        })
    }else {
        response.json({
            code: 404,
            status: "NOT_FOUND",
            error: {
                "server": [
                    "data tidak ditemukan"
                ]
            }
        })
    } 
}

export const AddAnswer = async (request,response) => {
    const ans = await Answer.find({$and: [{quest_id: request.body.req.quest_id},{user_id: request.body.req.user_id}]})
    if (ans.length == 0) {
        let data = {
            ans_id: request.body.req.ans_id,
            quest_id: request.body.req.quest_id,
            user_id: request.body.req.user_id,
            username: request.body.req.username,
            answer: request.body.req.choose
        }
        Answer.insertMany(data)
        .then(async (result) => {
            if (result) {  
                Socket.emit("pushAnswer", result) 
                const quest = await Question.find({_id: request.body.req.quest_id},{answers: {$elemMatch: {ans_id: request.body.req.ans_id}}}) 
                const update = await Question.updateMany({answers: {$elemMatch: {ans_id: quest[0].answers[0].ans_id}}},{$set: {"answers.$[filt].ans_count": quest[0].answers[0].ans_count + 1}},{arrayFilters: [{"filt.ans_id": quest[0].answers[0].ans_id}]})
                if (update.modifiedCount > 0) {
                    if (request.body.req.comment) {
                        let data = {
                            quest_id: request.body.req.quest_id,
                            answer_id: request.body.req.ans_id,
                            user_id: request.body.req.user_id,
                            username: request.body.req.username,
                            answer: quest[0].answers[0].answer,
                            comment: request.body.req.comment
                        }
                        let addcomment = await Comment.insertMany(data)
                        if (addcomment) {
                            let data = {
                                to: request.body.req.author_id,
                                from: request.body.req.user_id,
                                quest_id: request.body.req.quest_id,
                                username: request.body.req.username,
                                answer: request.body.req.choose,
                                comment: request.body.req.comment,
                                context: "response",
                                message: `${request.body.req.username} telah menanggapi pertanyaan anda`
                            }
                            let notif = await Notify.insertMany(data)
                            if (notif) {
                                Socket.emit("pushNotif",notif); 
                                response.json({
                                    code: 200,
                                    status: "OK"
                                })
                            }else {
                                response.json({
                                    code: 500,
                                    status: "SREVER_ERROR",
                                    errors: {
                                        "server": [
                                            "server error"
                                        ]
                                    }
                                })
                            }
                        }else {
                            response.json({
                                code: 500,
                                status: "SREVER_ERROR",
                                errors: {
                                    "server": [
                                        "server error"
                                    ]
                                }
                            })
                        }
                    }else {
                        let data = {
                            to: request.body.req.author_id,
                            from: request.body.req.user_id,
                            quest_id: request.body.req.quest_id,
                            username: request.body.req.username,
                            answer: request.body.req.choose,
                            comment: request.body.req.comment,
                            context: "response",
                            message: `${request.body.req.username} telah menanggapi pertanyaan anda`
                        }
                        let notif = await Notify.insertMany(data)
                        if (notif) {
                            Socket.emit("pushNotif",notif);     
                            response.json({
                                code: 200,
                                status: "OK" 
                            })
                        }else {
                            response.json({
                                code: 500,
                                status: "SREVER_ERROR",
                                errors: {
                                    "server": [
                                        "server error"
                                    ]
                                }
                            })
                        }
                    }
                }else {
                    response.json({
                        code: 500,
                        status: "SREVER_ERROR",
                        errors: {
                            "server": [
                                "server error"
                            ]
                        }
                    })
                }
            }else {
                response.json({
                    code: 500,
                    status: "SREVER_ERROR",
                    errors: {
                        "server": [
                            "server error"
                        ]
                    }
                }) 
            }
        })
        .catch(() => {
            response.json({
                code: 500,
                status: "SREVER_ERROR",
                errors: {
                    "server": [
                        "server error"
                    ]
                }
            }) 
        })  
    }else {
        response.json({
            code: 402,
            status: "BAD_REQUEST",
            errors: {
                "server": [
                    "anda sudah melakukan voting sebelumnya"
                ]
            }
        }) 
    }
}