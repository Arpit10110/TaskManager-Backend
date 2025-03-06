import express from "express";
import { createuser,login,signout } from "../controller/User.js";
import { createtask,gettask,deltask,changestatus,gettaskdetail,updatetask } from "../controller/task.js";
import { getuser } from "../middleware/IsAuth.js";
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
router.get("/signout",signout)
//tasks routes
router.post("/createtask",getuser,createtask)
router.delete("/deltask",deltask)
router.put("/changestatus",changestatus)
router.get("/gettask",getuser,gettask)
router.post("/gettaskdetail",gettaskdetail)
router.put("/updatetask",updatetask)


export default router