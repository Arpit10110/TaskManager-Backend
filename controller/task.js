import supabase from "../db/connectdb.js";

export const createtask =async(req,res)=>{
    try {

     const {title, desc, duedate, status, } = await req.body;
     const user_email = await req.email;
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


export const gettaskdetail =async(req,res)=>{
    try {

     const {id} = await req.body;
     const {data} = await supabase.from("TaskList").select('*').eq("id",id)


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



export const gettask =async(req,res)=>{
    try {
     const {email} = await req.email;
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



export const deltask =async(req,res)=>{
    try {

     const {id} = await req.body;

     const {data} = await supabase.from("TaskList").delete().eq("id", id);

         return res.json({
             success: true,
             data:data,
             message:"Task deleted Successfully "
         })

    } catch (error) {
     return res.json({
         success: false,
         error:"error"
     })
    }
}


export const changestatus =async(req,res)=>{
    try {

        const {id} = await req.body;
   
        const {data} = await supabase.from("TaskList").select('status').eq("id",id)

   
        const newStatus = !data[0].status;
   
        const update_data_res = await supabase.from("TaskList").update({ status: newStatus }).eq("id", id).select();
        
   
            return res.json({
                success: true,
                data:update_data_res,
                message:"Task status updated Successfully "
            })
   
       } catch (error) {
        return res.json({
            success: false,
            error:"error"
        })
       }
}


export const updatetask =async(req,res)=>{
    try {

        const {title, desc, duedate, id} = await req.body;

        const update_data_res = await supabase.from("TaskList").update({title:title,desc:desc,duedate:duedate}).eq("id", id).select();
        
   
            return res.json({
                success: true,
                data:update_data_res,
                message:"Task updated Successfully "
            })
   
       } catch (error) {
        return res.json({
            success: false,
            error:"error"
        })
       }
}