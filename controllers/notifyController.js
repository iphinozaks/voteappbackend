import Notify from "../models/Notify.js";

export const GetNotif = async (request,response) => {
    let notif = await Notify.find({to: request.body.user_id});
    if (notif) {
        response.json({
            code: 200,
            status: "OK",
            data: notif
        })
    }else {
        response.json({
            code: 404,
            status: "NOT_FOUND",
            errors: {
                "database": [
                    "data tidak di temukan"
                ]
            }
        })
    }
}

export const GetNewNotif = async (request,response) => {
    let notif = await Notify.find({$and: [{to: request.body.user_id},{status: false}]}).limit(5);
    if (notif) {
        response.json({
            code: 200,
            status: "OK",
            data: notif
        })
    }else {
        response.json({
            code: 404,
            status: "NOT_FOUND",
            errors: {
                "database": [
                    "data tidak di temukan"
                ]
            }
        })
    }
}

export const UpdateNotif = async (request,response) => { 
    if (request.body.data) {
        let update = await Notify.updateMany({_id: request.body.data._id},{$set: {status: true}})
        request.body.data.status = true
        if (update.modifiedCount > 0) {
            response.json({ 
                code: 200,
                status: "OK",
                data: request.body.data 
            })
        }else {
            response.json({
                code: 404,
                status: "NOT_FOUND",
                errors: {
                    "database": [
                        "data gagal di update"
                    ]
                }
            })
        }
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

export const DeleteNotif = async (request,response) => {
    let del = await Notify.deleteMany(
        {
          _id: {
            $in: request.body.data
          }
    })
    if (del.deletedCount > 0) {
        response.json({
            code: 200,
            status: "OK"
        })
    }else {
        response.json({
            code: 404,
            status: "NOT_FOUND",
            errors: {
                "database": [
                    "hapus data gagal",
                    "data tidak ditemukan"
                ]
            }
        })
    }
}