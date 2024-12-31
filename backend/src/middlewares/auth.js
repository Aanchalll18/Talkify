import jwt from "jsonwebtoken"
import User from '../models/user.model.js'

export const authUser =async(req , res,next)=>{
    try{
        const token =req.cookie.jwt;
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Invalid Credentials"
            })
        }
        const decode=jwt.verify(token,process.env.JWT_SECRET)

        if(!decode){
            return res.status(400).json({
                success:false,
                message:"Unauthorized-invalid token"
            })
        }
        const user=await User.findById(decode.userId).select("-password")

        if(!user){
            return res.status(400).json({
                success:false,
                message:"User not found"
            })
        }
        req.user=user
        next()

    }
    catch(e){
        console.log("error",e)
        return res.status(500).json({
            success:false,
            message:e.message
        })
    }
}