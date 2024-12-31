import { generateToken } from "../lib/utlis.js"
import User from "../models/user.model.js"
import bcrypt from 'bcryptjs'
import cloudinary from '../lib/cloudinary.js'


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

        const newUser=new User (
            {
                fullname,
                email,
                password:hashedPassword,
            })
            if(newUser){
                generateToken(newUser._id,res)
                await newUser.save();

                res.status(200).json({
                    success:true,
                    message:"newUser created succesfylly!!",
                    newUser
                })

            }else{
                 res.status(400).json({
                    success:false,
                    message:"Invalid user data"});
            }
    }
    catch(e){
        console.log("error",e.message)
        return res.status(400).json({
            success:false,
            message:e.message
        })

    }
}

export const login= async (req,res)=>{
    try{
        const {email,password}=req.body;
    if(!email || !password){
        return res.status(400).json({
            "success":false,
            message:"All fields are mandatory"
        })
    }
    const user=await User.findOne({email})
    if(!user){
        return res.status(400).json({
            success:false,
            message:"user doesn't exits"
        })
    }
   const isPassword= await bcrypt.compare(password,user.password)
   if(!isPassword){
    return res.status(400).json({
        success:false,
        message:"Invalid password"
    })
   }
   generateToken(user._id,res)

   res.status(200).json({
    _id:user._id,
    fullname:user.fullname,
    email:user.email,
    profilepic:user.profilepic
   })



    }
    catch(e){
        console.log(e);
        return res.status(200).json({
            success:false,
            message:"can't login",
            e:e.message
        })
    }
}

export const logout=(req,res)=>{
    try{
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({
            success:true,
            message:"logged out successfully"
        })

    }
    catch(e){
        console.log(e)
        return res.status(400).json({
            success:fasle,
            message:"error occured",
            e:e.message
        })
    }
}
export const profilePicture =async (req,res)=>{
    try{
        const {profilepic}=req.body
        const userId=req.user._id;
        if(!profilepic){
            return res.status(400).json({
                success:false,
                message:"please upload the picture"
            })
        }
        const uploadPicture=await cloudinary.uploader.upload(profilepic)

        const updatedUser=await User.findByIdAndUpdate(
            userId,
            {profilepic:uploadPicture.secure_url},{new:true}
        );
        res.staus(200).json({
            success:true,
            meassgae:"image uplloaded successfully",
            updatedUser
        })

    }
    catch(e){
        console.log(e)
        return res.status(400).json({
            success:false,
            message:"Failed to upload Profile Picture",
            error:e.message
        })
    }
}