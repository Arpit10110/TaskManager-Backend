import express from "express"
import { config } from "dotenv";
import router from "./routes/routes.js";
import cors from "cors"
config()
const app = express()
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true})); 
app.use(router)
export default app;