import User from "../models/user.model.js"
import bcrypt from 'bcryptjs'


export const signup=  async (req,res)=>{
    const {fullname,email,password}=req.body
    try{
        if(!email || 
            !password ||
            !fullname
        ){
            return res.status(400).json({
                success:false,
                message:"All fields are mandotary"

            })
        }
        if(password.length < 6){
            return res.status(400).json({
                success:false,
                message:"Enter 6 length password"
            })
        }
        const user=await User.findOne({email})
        if(user){
            return res.status(400).json({
                success:false,
                message:"User already exits"
            })
        }
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt)

    }
    catch(e){

    }
}

export const login=(req,res)=>{
    res.send("login router")
}

export const logout=(req,res)=>{
    res.send("logout router")
}