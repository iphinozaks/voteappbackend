import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import "./utils/database.js";
import express from "express";
import { Server } from "socket.io";
import bodyParser from "body-parser";
import router from "./routes/router.js"
import cookieParser from "cookie-parser";
import { io } from "./utils/socketServer.js";

dotenv.config();

const port  = process.env.PORT || 8000;

const app = express();

const server = http.createServer(app);
io.attach(server);

app.use(cors({
    origin: ["http://localhost:3000"], 
    method: ["GET","POST"]
}))

app.use(cookieParser())
app.use(express.json()) 
app.use(express.static("public")) 
app.use(bodyParser.urlencoded({extended: true})) 

app.use(router);

server.listen(port, () => {
    console.log(`server runing on port ${port}`);
})