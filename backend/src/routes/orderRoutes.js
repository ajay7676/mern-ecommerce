import express from "express";
import { createOrderFromCart } from "../controllers/orderController.js";
import { userAuth } from "../middleware/userAuthMIddleware.js";


const router = express.Router();

router.post("/orders",userAuth, createOrderFromCart);

  export default router;