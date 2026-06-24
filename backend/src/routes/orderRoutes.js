import express from "express";
import { createOrderFromCart, getAllOrdersByAdmin, getMyAllOrders, getSingleOrder } from "../controllers/orderController.js";
import { userAuth } from "../middleware/userAuthMIddleware.js";
import adminOnly from "../middleware/adminMddleware.js";


const router = express.Router();

router.post("/orders",userAuth, createOrderFromCart);
router.get("/orders/my-orders",userAuth, getMyAllOrders);
router.get("/admin/orders",userAuth,adminOnly,getAllOrdersByAdmin);
router.get("/orders/:orderId", userAuth, getSingleOrder);



export default router;