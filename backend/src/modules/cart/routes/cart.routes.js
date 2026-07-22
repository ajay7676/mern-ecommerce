import express from 'express';
 
import { userAuth } from '../../../middleware/userAuthMIddleware.js'
// import adminOnly from "../../../middleware/adminMddleware.js";


import {addToCart , removeCartItem , updateCartItemQuantity} from '../controllers/cart.controller.js'


const router = express.Router();


/**
 * Add a new item or increase the quantity
 * of an existing item.
 */
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



export default router;