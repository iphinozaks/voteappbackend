import Question from "../models/Question.js";
import { genCode } from "../generate/genPass.js";

export const CreateQuestion = async (request,response) => {
    let data = {
        author_id: request.body.author_id,
        username: request.body.username,
        question: request.body.quest
    }
    let create = await Question.insertMany(data)
    if (create.length > 0) {
        let data = {
            ans_id: genCode(10),
            answer: request.body.answer.ansSatu,
            ans_count: 0
        }
        Question.updateMany({_id: create[0]._id},{$push: {answers: data}})
        .then((result) => {
            if (result.modifiedCount > 0) {
                let data = {
                    ans_id: genCode(10),
                    answer: request.body.answer.ansDua,
                    ans_count: 0
                } 
                Question.updateMany({_id: create[0]._id},{$push: {answers: data}}) 
                .then((result) => {
                    if (result.modifiedCount > 0) {
                        if (request.body.answer.ansTiga) {
                            let data = {
                                ans_id: genCode(10),
                                answer: request.body.answer.ansTiga,
                                ans_count: 0
                            }
                            Question.updateMany({_id: create[0]._id},{$push: {answers: data}})
                            .then((result) => {
                                if (result.modifiedCount > 0) {
                                    if (request.body.answer.ansEmpat) {
                                        let data = {
                                            ans_id: genCode(10),
                                            answer: request.body.answer.ansEmpat,
                                            ans_count: 0
                                        }
                                        Question.updateMany({_id: create[0]._id},{$push: {answers: data}})
                                        .then((result) => {
                                            if (result.modifiedCount > 0) {
                                                if (request.body.answer.ansLima) {
                                                    let data = {
                                                        ans_id: genCode(10),
                                                        answer: request.body.answer.ansLima,
                                                        ans_count: 0
                                                    }
                                                    Question.updateMany({_id: create[0]._id},{$push: {answers: data}})
                                                    .then((result) => {
                                                        if (result.modifiedCount > 0) {
                                                            response.json({
                                                                code: 200,
                                                                status: "OK"
                                                            }) 
                                                        }else {
                                                            response.json({
                                                                code: 200,
                                                                status: "OK"
                                                            })
                                                        }
                                                    })
                                                    .catch(() => {
                                                        response.json({
                                                            code: 200,
                                                            status: "OK"
                                                        })
                                                    })
                                                }else {
                                                    response.json({
                                                        code: 200,
                                                        status: "OK"
                                                    }) 
                                                }
                                            }else {
                                                response.json({
                                                    code: 200,
                                                    status: "OK"
                                                }) 
                                            }
                                        })
                                        .catch(() => {
                                            response.json({
                                                code: 200,
                                                status: "OK"
                                            }) 
                                        })
                                    }else {
                                        response.json({
                                            code: 200,
                                            status: "OK"
                                        }) 
                                    }
                                }else {
                                    response.json({
                                        code: 200,
                                        status: "OK"
                                    }) 
                                }
                            })
                            .catch(() => {
                                response.json({
                                    code: 200,
                                    status: "OK"
                                })
                            })
                        }else {
                            response.json({
                                code: 200,
                                status: "OK"
                            })
                        }
                    }else {
                        response.json({
                            code: 200,
                            status: "OK"
                        })
                    }
                })
                .catch(() => {
                    response.json({
                        code: 200,
                        status: "OK"
                    })
                })  
            }else {
                response.json({
                    code: 200,
                    status: "OK"
                })
            }
        })
        .catch(() => {
            response.json({
                code: 500,
                status: "SERVER_ERROR",
                errors: {
                    "server": [
                        "internal server error"
                    ]
                }
            })
        })
    }else {
        response.json({
            code: 500,
            status: "SERVICE_ERROR",
            errors: {
                "server": [
                    "internal server error"
                ]
            }
        })
    }
}

export const GetAllQuestions = async (request,response) => {
    if (request.body.currentPages) {
        const pagination = 4
        const pageNumber = request.body.currentPages ? request.body.currentPages : 1
        let quests = await Question.find({}).skip(pageNumber * pagination).limit(pagination);
        if (quests.length) {
            response.json({
                code: 200,
                status: "OK",
                data: {
                    pages: request.body.currentPages + 1,
                    quest: quests
                }
            }) 
        }else {
            response.json({
                code: 404,
                status: "NOT_FOUND",
                errors: {
                    "server": [
                        "data question kosong"
                    ]
                }
            })
        }
    }else {
        let quests = await Question.find({}).limit(4);
        if (quests.length) {
            response.json({
                code: 200,
                status: "OK",
                data: {
                    pages: 1,
                    quest: quests
                }
            }) 
        }else {
            response.json({
                code: 404,
                status: "NOT_FOUND",
                errors: {
                    "server": [
                        "data question kosong"
                    ]
                }
            })
        }
    }
}

export const GetTopTopic = async (request,response) => {
    let quests = await Question.find({}).limit(10);
    if (quests) {
        response.json({
            code: 200,
            status: "OK",
            quests
        })
    }else {
        response.json({
            code: 404,
            status: "NOT_FOUND",
            errors: {
                "database": [
                    "data tidak ditemukan"
                ]
            }
        })
    }
}

export const GetQuestById = async (request,response) => {
    let data = await Question.find({_id: request.body.id}) 
    if (data) {
        response.json({
            code: 200,
            status: "OK",
            quest: data
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
