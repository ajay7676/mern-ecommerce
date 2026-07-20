import express from "express";

import { createProductVariant } from "../controllers/productVariant.controller.js";

import { userAuth } from '../../../middleware/userAuthMIddleware.js'
import adminOnly from "../../../middleware/adminMddleware.js";


const router = express.Router();

/**
 * Admin variant routes
 */
router.post(
  "/admin/products/:productId/variants",
  userAuth,
  adminOnly,
  createProductVariant
);

export default router;