import mongoose from "mongoose";

const userSchems=new mongoose.Schema(
    {
        email:{
            type:String,
            required:true,
            unique:true
        },
        fullname:{
            type:String,
            required:true,
        },
        password:{
            type:String,
            required:true,
        },
        profilepic:{
            type:String,
            default:""
        }
    },
    {timestamps:true}
)

const User =mongoose.model("User",userSchems)
export default User;