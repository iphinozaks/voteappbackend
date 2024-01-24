import User from "../models/User.js";

export const RegValidate = async (request,response,next) => {
    if (request.body.username && request.body.username.length >= 8) {
        if (request.body.password && request.body.password.length >= 8) {
            if (request.body.password === request.body.confirm) {
                if (request.body.email && request.body.email.includes("@")) {
                    if (request.body.email.includes(".com") || request.body.email.includes(".yahoo")) {
                        let user = await User.findOne({email: request.body.email});
                        if (user == null) {
                            next();
                        }else {
                            response.json({
                                code: 400,
                                status: "BED_REQUEST",
                                errors: [
                                        "user dengan email ini sudah ada" 
                                    ]
                            })
                        }
                    } else {
                        response.json({
                            code: 400,
                            status: "BED_REQUEST",
                            errors: [
                                    "format email tidak sesuai"
                                ]
                        }) 
                    }
                } else {
                    response.json({
                        code: 400,
                        status: "BED_REQUEST",
                        errors: [
                                'email harus mengandung symbol "@"' 
                            ]
                    })
                }
            }else {
                response.json({
                    code: 400,
                    status: "BED_REQUEST",
                    errors: [
                            "password dan confirm-password harus sama" 
                        ]
                })
            }
        }else {
            response.json({
                code: 400,
                status: "BED_REQUEST",
                errors: [
                        "tidak boleh kosong",
                        "harus 8 karakter atau lebih" 
                    ]
            })
        }
    }else {
        response.json({
            code: 400,
            status: "BED_REQUEST",
            errors: [
                    "tidak boleh kosong",
                    "harus 8 karakter atau lebih" 
                ]
        })
    }
}

export const CreateQuestValidate = async (request,response,next) => {
    let user = await User.findOne({_id: request.body.author_id})
    if (user) {
        next();
    }else {
        response.json({
            code: 401,
            status: "UN_AUTHORIZED",
            errors: [
                    "user tidak terauthorized"
                ]
        })
    }
}