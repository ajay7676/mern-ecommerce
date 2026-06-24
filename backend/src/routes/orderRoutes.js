import express from "express";
import { createOrderFromCart, getMyAllOrders, getSingleOrder } from "../controllers/orderController.js";
import { userAuth } from "../middleware/userAuthMIddleware.js";


const router = express.Router();

router.post("/orders",userAuth, createOrderFromCart);
router.get("/orders/my-orders",userAuth, getMyAllOrders);
router.get("/orders/:orderId", userAuth, getSingleOrder);


export default router;