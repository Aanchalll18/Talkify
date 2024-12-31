import express from "express"
import dotenv from 'dotenv'
import userRouter from './routes/user.route.js'
import { connectDB } from "./lib/db.js";
import cookieParser from 'cookie-parser'

dotenv.config()

const app=express();


const PORT=process.env.PORT;
app.use(express.json());
app.use(cookieParser());

app.use("/api/user",userRouter);

app.listen(PORT, ()=>{
    console.log(`server started at ${PORT}`)
    connectDB()
})