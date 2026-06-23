import express from 'express';
import {userAuth} from '../middleware/userAuthMIddleware.js'
import adminOnly from '../middleware/adminMddleware.js';
import { addToCart, getAllCartItems, removeCartItem, updateCartQuantity } from '../controllers/cartController.js';
const router = express.Router();

 router.post("/cart" ,userAuth,addToCart);
 router.get("/cart" ,userAuth,getAllCartItems);
 router.put("/cart" ,userAuth,updateCartQuantity);
 router.delete("/cart/:productId", userAuth, removeCartItem);

  export default router;