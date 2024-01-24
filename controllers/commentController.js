import Comment from "../models/Comment.js";

export const GetComByParams = async (request,response) => {
    let data = await Comment.find({quest_id: request.body.params})
    if (data) {
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
                    "data tidak ditemukan"
                ]
            }
        })
    }
}