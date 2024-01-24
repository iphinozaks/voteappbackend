import express from "express";
import {GetComByParams} from "../controllers/commentController.js";
import {RegValidate,CreateQuestValidate}from "../validation/validate.js";
import {AddAnswer,GetAnsByParams} from "../controllers/answerController.js";
import {CreateQuestion,GetAllQuestions,GetTopTopic,GetQuestById} from "../controllers/questionController.js";
import {AddChatRoom,GetChatList,DeleteRoom,PushChat} from "../controllers/messageController.js";
import {GetNotif,GetNewNotif,UpdateNotif,DeleteNotif} from "../controllers/notifyController.js";
import {Login,UserAuth,Registration,UserLogout,GetUserCount} from "../controllers/userController.js";

const router = express.Router()
 
router.post("/api/login", Login)    
router.post("/api/getNotif", GetNotif)
router.post("/api/logout", UserLogout)
router.post("/api/push_chat", PushChat)
router.post("/api/add_answer", AddAnswer)
router.post("/api/delete_room", DeleteRoom)
router.post("/api/getNewNotif", GetNewNotif)
router.post("/api/update_notif", UpdateNotif)
router.post("/api/user_auth_token", UserAuth)
router.post("/api/delete_notif", DeleteNotif)
router.post("/api/add_chat_room", AddChatRoom)
router.post("/api/get_chat_list", GetChatList)
router.post("/api/get_top_topic", GetTopTopic)
router.post("/api/get_user_count", GetUserCount)
router.post("/api/get_quest_by_id", GetQuestById)
router.post("/api/daftar", RegValidate, Registration) 
router.post("/api/get_ans_by_params", GetAnsByParams)
router.post("/api/get_com_by_params", GetComByParams)
router.post("/api/get_all_questions", GetAllQuestions)
router.post("/api/createQuest", CreateQuestValidate, CreateQuestion)   

export default router;