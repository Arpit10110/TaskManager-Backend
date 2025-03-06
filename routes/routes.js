import express from "express";
import { createuser,login } from "../controller/User.js";
import { createtask,gettask } from "../controller/task.js";
const router= express.Router();

// test
router.get("/",(req,res)=>{
        return( res.json({
            success:true,
            message:"Welcome to the backend"
        }))
})

//user routes
router.post("/signup",createuser)
router.post("/login",login)
//tasks routes
router.post("/createtask",createtask)
router.post("/gettask",gettask)


export default router