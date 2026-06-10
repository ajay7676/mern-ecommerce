import express from 'express';
import { createRegisterUser, loginUser } from '../controllers/userController.js';

const router = express.Router();

 router.post("/register" , createRegisterUser)
 router.post("/login" , loginUser)


export default router;