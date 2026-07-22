import express from 'express';
 
import { userAuth } from '../../../middleware/userAuthMIddleware.js'
// import adminOnly from "../../../middleware/adminMddleware.js";


import {
    addToCart , removeCartItem , updateCartItemQuantity , clearCart , getCartItems
} from '../controllers/cart.controller.js'


const router = express.Router();

router.get(
  "/cart",
  userAuth,
  getCartItems
);

router.post(
  "/cart/items",
  userAuth,
  addToCart
);

router.patch(
  "/cart/items/:cartItemId",
  userAuth,
  updateCartItemQuantity
);

router.delete(
  "/cart/items/:cartItemId",
  userAuth,
  removeCartItem
);

router.delete(
  "/cart/clear",
  userAuth,
  clearCart
);


export default router;