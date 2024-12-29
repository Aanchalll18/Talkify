import express from "express"
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes.js'
import { connectDB } from "./lib/db.js";

dotenv.config()

const app=express();
app.use(express.json())

const PORT=process.env.PORT;
app.use(express.json());

app.use("/api/auth",authRoutes);

app.listen(PORT, ()=>{
    console.log(`server started at ${PORT}`)
    connectDB()
})