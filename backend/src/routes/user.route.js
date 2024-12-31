import express from 'express'
import { login, logout, signup,profilePicture } from '../controllers/userControllers.js';

const userRouter=express.Router();

userRouter.post("/signup",signup)
userRouter.post("/login",login)
userRouter.post("/logout",logout)
userRouter.put('/update/profilePicture',profilePicture)


export default userRouter;