import express from "express";

import { 
    createProductVariant,
    createManyProductVariants,
    getProductVariants,
    getAdminProductVariants

 } from "../controllers/productVariant.controller.js";

import { userAuth } from '../../../middleware/userAuthMIddleware.js'
import adminOnly from "../../../middleware/adminMddleware.js";


const router = express.Router();

/**
 * Public variant routes
 */
router.get("/products/:productId/variants", getProductVariants);


/**
 * Admin variant routes
 */

/**
 * Get single variant
 */
router.get(
  "/admin/products/:productId/variants",
  userAuth,
  adminOnly,
  getAdminProductVariants
);

/**
 * Create single variant
 */
router.post(
  "/admin/products/:productId/variants",
  userAuth,
  adminOnly,
  createProductVariant
);

/**
 * Create multiple variants
 */
router.post(
  "/admin/products/:productId/variants/bulk",
  userAuth,
  adminOnly,
  createManyProductVariants
);

export default router;