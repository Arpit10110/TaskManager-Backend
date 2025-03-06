import express from "express"
import { config } from "dotenv";
import router from "./routes/routes.js";
import cookieParser from "cookie-parser";
import cors from "cors"
config()
const app = express()
app.use(cors({
    origin: process.env.Frontend_url, // Your frontend URL
    credentials: true // Allow cookies to be sent
}));
app.use(express.json());
app.use(express.urlencoded({extended:true})); 
app.use(cookieParser())
app.use(router)
export default app;