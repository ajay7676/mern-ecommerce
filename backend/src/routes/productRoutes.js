import express from "express";
import { createProduct, deleteProduct, getAllProducts, getSingleProduct, updateProduct } from "../controllers/productController.js";
import {userAuth} from '../middleware/userAuthMIddleware.js'
const router = express.Router();


router.post("/product/create" , createProduct);
router.get("/products" , userAuth,  getAllProducts);
router.get("/product/:productId" , getSingleProduct);
router.put("/product/:productId" , updateProduct);
router.post("/product/:productId" , deleteProduct);


export default  router;