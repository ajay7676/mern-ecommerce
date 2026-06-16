import express from 'express';
import {userAuth} from '../middleware/userAuthMIddleware.js'
import adminOnly from '../middleware/adminMddleware.js';
import { addToCart, getAllCartItems } from '../controllers/cartController.js';
const router = express.Router();

 router.post("/cart" ,userAuth,addToCart)
 router.get("/cart" ,userAuth,getAllCartItems)

  export default router;