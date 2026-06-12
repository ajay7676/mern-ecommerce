import express from 'express';
import { createRegisterUser, requestForgotPassword, getProfile, loginUser, logoutUser, resetPassword, updateProfile, updatePassword } from '../controllers/userController.js';
import {userAuth} from '../middleware/userAuthMIddleware.js'
const router = express.Router();

 router.post("/register" , createRegisterUser)
 router.post("/login" , loginUser)
 router.post("/logout" , logoutUser)
 router.get("/profile" ,userAuth, getProfile)
 router.put("/update-profile" ,userAuth, updateProfile)
 router.put("/update-password" ,userAuth, updatePassword)
 router.post("/forgot-password" , requestForgotPassword)
 router.post("/reset-password/:token" ,resetPassword )


export default router;