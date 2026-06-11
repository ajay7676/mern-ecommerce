import express from 'express';
import { createRegisterUser, getProfile, loginUser, logoutUser, updateProfile } from '../controllers/userController.js';
import {userAuth} from '../middleware/userAuthMIddleware.js'
const router = express.Router();

 router.post("/register" , createRegisterUser)
 router.post("/login" , loginUser)
 router.post("/logout" , logoutUser)
 router.get("/profile" ,userAuth, getProfile)
 router.put("/update-profile" ,userAuth, updateProfile)


export default router;