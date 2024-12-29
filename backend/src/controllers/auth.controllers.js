import User from "../models/user.model.js"


export const signup=(req,res)=>{
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