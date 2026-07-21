import express from "express";

import { 
    createProductVariant,
    createManyProductVariants,
    getProductVariants,
    getAdminProductVariants,
    updateProductVariant,
    deleteProductVariant,
    setDefaultProductVariant,
    updateProductVariantStatus

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

router.patch(
  "/admin/products/:productId/variants/:variantId/default",
  userAuth,
  adminOnly,
  setDefaultProductVariant
);

router.patch(
  "/admin/products/:productId/variants/:variantId/status",
  userAuth,
  adminOnly,
  updateProductVariantStatus
);

router.patch(
  "/admin/products/:productId/variants/:variantId",
  userAuth,
  adminOnly,
  updateProductVariant
);

router.delete(
  "/admin/products/:productId/variants/:variantId",
  userAuth,
  adminOnly,
  deleteProductVariant
);

export default router;