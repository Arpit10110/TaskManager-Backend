import jwt from "jsonwebtoken"


export const getuser = async(req,res,next)=>{
    try {

        const {token} = req.cookies;

        if(!token){
           return res.json({
                success:false,
                messgae:"Please Login...",
            })
        }

        const decoded =  jwt.verify(token,process.env.JWT_SECRET)
        const data = {email: decoded.email}
        req.email =await data ;
        next();
        
    } catch (error) {
        console.log(error)
        return res.json({
            success:false,
            error:error
        })
    }
} 