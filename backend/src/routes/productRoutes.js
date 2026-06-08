import express from "express";
import { createProduct, getAllProducts } from "../controllers/productController.js";

const router = express.Router();


router.post("/product/create" , createProduct);
router.get("/products" , getAllProducts);

export default  router;