import express from "express";
import { createProduct, getProducts } from "../controllers/productController.js";

const router = express.Router();


router.get("/products" , getProducts);
router.post("/product/create" , createProduct);

export default  router;