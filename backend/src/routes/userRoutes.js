import express from 'express';
import { createRegisterUser } from '../controllers/userController';

const router = express.Router();

 router.post("/register" , createRegisterUser)


export default router;