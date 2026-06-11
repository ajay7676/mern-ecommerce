import express from "express";
import { createProduct, deleteProduct, getAllProducts, getSingleProduct, updateProduct } from "../controllers/productController.js";
import {roleAuth, userAuth} from '../middleware/userAuthMIddleware.js'
const router = express.Router();


router.post("/product/create" ,userAuth,roleAuth("admin"), createProduct);
router.get("/products" , userAuth,  getAllProducts);
router.get("/product/:productId" ,userAuth,roleAuth("admin"), getSingleProduct);
router.put("/product/:productId" ,userAuth,roleAuth("admin"), updateProduct);
router.post("/product/:productId" ,userAuth,roleAuth("admin"), deleteProduct);


export default  router;