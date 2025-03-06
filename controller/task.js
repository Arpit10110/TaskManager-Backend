import supabase from "../db/connectdb.js";

export const createtask =async(req,res)=>{
    try {

     const {title, desc, duedate, status, user_email} = await req.body;
     const taskdata={ title, desc, duedate, status, user_email}

     const {data,error} = await supabase.from("TaskList").insert([taskdata]).single();

         return res.json({
             success: true,
             message:"Task Created Successfully"
         })

    } catch (error) {
     return res.json({
         success: false,
         error:"error"
     })
    }
}



export const gettask =async(req,res)=>{
    try {

     const {email} = await req.body;

     const {data} = await supabase.from("TaskList").select('*').eq("user_email",email)


         return res.json({
             success: true,
             data:data
         })

    } catch (error) {
     return res.json({
         success: false,
         error:"error"
     })
    }
}