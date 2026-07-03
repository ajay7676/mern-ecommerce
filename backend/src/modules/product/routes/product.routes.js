import express from "express";

import {
    createProduct,
    getAllProducts,
    getAdminProducts,
    getAdminSingleProduct,
    updateSingleProductByAdmin,
    getSingleProduct,
    deleteProduct,
} from '../controllers/product.controller.js'

import { userAuth } from '../../../middleware/userAuthMIddleware.js'
import adminOnly from "../../../middleware/adminMddleware.js";

const router = express.Router();

/**
 * Public product routes
 */

// Get all published products
router.get("/products", getAllProducts);

// Get single published product
router.get("/products/:productId", getSingleProduct);


/**
 * Admin product routes
*/
// Create product
router.post(
  "/admin/products",
  userAuth,
  adminOnly,
  createProduct
);
// Get all products for admin
router.get(
  "/admin/products",
  userAuth,
 adminOnly,
  getAdminProducts
);

// Get  single product for admin

router.get(
  "/admin/products/:productId",
  userAuth,
  adminOnly,
  getAdminSingleProduct
);

// Update a  singe product for admin

router.patch(
  "/admin/products/:productId",
  userAuth,
  adminOnly,
  updateSingleProductByAdmin

);

// Delete product
router.delete(
  "/admin/products/:productId",
  userAuth,
  adminOnly,
  deleteProduct
);

export default router;