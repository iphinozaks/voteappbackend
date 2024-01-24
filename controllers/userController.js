import User from "../models/User.js";
import { genPass,verifyPass,genToken } from "../generate/genPass.js";

export const Login = async (request,response) => {
    let user = await User.findOne({$or: [{email: request.body.name},{username: request.body.name}]})
    if (user) {
        if (verifyPass(user.password,request.body.password)) {
            const token = genToken(user._id);
            User.updateMany({_id: user._id},{access_Token: token})
            .then(() => {
                user = {
                    "_id": user._id,
                    "username": user.username,
                    "email": user.email,
                    "roles": user.roles,
                    "access_Token": token
                }
                response.json({
                    code: 200,
                    status: "OK",
                    data: user
                }) 
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
        } else {
            response.json({
                code: 401,
                status: "UN_AUTHORIZED",
                errors: {
                    "password": [
                        "password tidak sesuai"
                    ]
                }
            })
        }
    }else {
        response.json({
            code: 404,
            status: "NOT_FOUND",
            errors: {
                "username": [
                    "user tidak ditemukan" 
                ],
                "email": [
                    "user tidak ditemukan"
                ]
            }
        })
    }
}

export const GetUserCount = async (request,response) => {
    let data = await User.find({}).count();
    if (data) {
       response.json({
        code: 200,
        status: "OK",
        count: data - 1
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

export const UserAuth = async (request,response) => {
    const user = await User.findOne({access_Token: request.body.auth_token},{password: false,access_Token: false})
    if (user) {
        response.json({
            code: 200,
            status: "OK",
            data: user
        })
    }else {
        response.json({
            code: 401,
            status: "UN_AUTHORIZED",
            errors: {
                "access_token": [
                    "user tidak di authorized"
                ]
            }
        })
    }
}

export const Registration = async (request,response) => {
    request.body.password = genPass(request.body.password)
    await User.insertMany(request.body)
    .then((result) => {
        response.json({
            code: 200,
            status: "OK",
            data: result[0]
        })
    })
    .catch((error) => {
        response.json({
            code: 500,
            status: "SERVER_ERROR",
            errors: [
                    error.message 
                ]
        })
    })
}

export const UserLogout = async (request,response) => {
    let user = await User.findOne({access_Token: request.body.token})
    if (user) {
        let update = await User.updateMany({access_Token: request.body.token},{$set: {access_Token: ""}})
        if (update.modifiedCount > 0) {
            response.json({
                code: 200,
                status: "OK"
            })
        }else {
            response.json({
                code: 400,
                status: "NOT_FOUND",
                errors: {
                    "server": [
                        "token tidak valid" 
                    ]
                }
            })
        }
    }else {
        response.json({
            code: 400,
            status: "NOT_FOUND",
            errors: {
                "server": [
                    "token tidak ada"
                ]
            }
        })
    }
}