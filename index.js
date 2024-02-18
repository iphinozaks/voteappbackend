import cors from "cors";
import dotenv from "dotenv";
import "./utils/database.js";
import express from "express";
import bodyParser from "body-parser";
import router from "./routes/router.js"
import cookieParser from "cookie-parser";

dotenv.config();

const port  = process.env.PORT || 8000;

const app = express();

app.use(cors({
    origin: ["https://voteappbackendapi.cyclic.app"], 
    method: ["GET","POST"]
}))

app.use(cookieParser())
app.use(express.json()) 
app.use(express.static("public")) 
app.use(bodyParser.urlencoded({extended: true})) 

app.use(router);

app.listen(port, () => {
    console.log(`server runing on port ${port}`);
})
