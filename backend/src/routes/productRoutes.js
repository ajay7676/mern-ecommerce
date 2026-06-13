import express from "express";
import {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

import { userAuth } from "../middleware/userAuthMIddleware.js";
import adminOnly from "../middleware/adminMddleware.js";

const router = express.Router();

// Public routes
router.get("/products", getAllProducts);
router.get("/product/:productId", getSingleProduct);

// Admin routes
router.post("/admin/product/create", userAuth, adminOnly, createProduct);
router.put("/admin/product/:productId", userAuth, adminOnly, updateProduct);
router.delete("/admin/product/:productId", userAuth, adminOnly, deleteProduct);

export default router;