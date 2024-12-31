import express from 'express'
import { login, logout, signup,profilePicture } from '../controllers/userControllers.js';
import { authUser } from '../middlewares/auth.js';

const userRouter=express.Router();

userRouter.post("/signup",signup)
userRouter.post("/login",login)
userRouter.post("/logout",logout)
userRouter.put('/update/profilePicture',authUser,profilePicture)


export default userRouter;