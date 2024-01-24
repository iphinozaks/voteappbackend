import Pusher from "pusher";
import dotenv from "dotenv";

dotenv.config();

export const pusher = new Pusher({
	appId: process.env.API_ID,
	key: process.env.API_KEY,
	secret: process.env.API_SECRET,
	cluster: process.env.CLUSTER,
	encrypted: true
})
