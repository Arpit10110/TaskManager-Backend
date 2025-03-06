import supabase from "../db/connectdb.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"



export const createuser =async(req,res)=>{
       try {

        const {email,name,password} = await req.body;
        const hashpass = await bcrypt.hash(password,10)
        const userdata={
            email,
            name,
            password:hashpass
        }

       const user_exit= await supabase.from("UserList").select('*').eq("email",email)

        if(user_exit.data.length > 0){
            return  res.json({
                success: false,
                message: "User already exist"
            })
        }

        const {data,error} = await supabase.from("UserList").insert([userdata]).single();
        if (error) {
            return res.json({
                success: false,
                error:error
            })
        }else{
            return res.json({
                success: true,
                message:"User created successfully"
            })
        }
       } catch (error) {
        return res.json({
            success: false,
            error:"error"
        })
       }
}


export const login =async(req,res)=>{
       try {
       
        const {email,password} = await req.body;

        const user_exit = await supabase.from("UserList").select('*').eq("email",email)

        if(user_exit.data.length == 0){
            return  res.json({
                success: false,
                message:"User do not exist"
            })
        }
        const match = await bcrypt.compare(password,user_exit.data[0].password)
        if(match){

            const token = jwt.sign({email:email},process.env.JWT_SECRET,{expiresIn:"10d"}) 


          res.cookie("token",token,{
                maxAge:10 * 24 * 60 * 60 * 1000,
                httpOnly:true,
            })

            return res.json({
                success: true,
                data:user_exit.data[0],
                token:token
            })


        }else{
            return res.json({
                success: false,
                message:"Wrong password"
            })
        }
        
       } catch (error) {
        return res.json({
            success: false,
            error:"error"
        })
       }
}

export const signout = (req,res)=>{
    return res.cookie("token","",{expires:new Date(Date.now())}).json({
        success: true,
        message:"user logout successfully "
    })
}