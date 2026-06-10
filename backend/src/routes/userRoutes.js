import express from 'express';
import { createRegisterUser } from '../controllers/userController.js';

const router = express.Router();

 router.post("/register" , createRegisterUser)


export default router;