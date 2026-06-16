import express from 'express';
import {userAuth} from '../middleware/userAuthMIddleware.js'
import adminOnly from '../middleware/adminMddleware.js';
import { addToCart } from '../controllers/cartController.js';
const router = express.Router();

 router.post("/cart" ,userAuth,addToCart)

  export default router;