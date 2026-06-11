import express from 'express';
import { createRegisterUser, loginUser, logoutUser } from '../controllers/userController.js';

const router = express.Router();

 router.post("/register" , createRegisterUser)
 router.post("/login" , loginUser)
 router.post("/logout" , logoutUser)


export default router;