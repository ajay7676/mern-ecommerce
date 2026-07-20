import express from "express";

import {
  createCategoryAttribute,
  getAdminCategoryAttributes,
  getPublicCategoryAttributes,
} from "../controllers/categoryAttribute.controller.js";

import { userAuth } from '../../../middleware/userAuthMIddleware.js'
import adminOnly from "../../../middleware/adminMddleware.js";


const router = express.Router();

/**
 * Public route
 */
router.get(
  "/categories/:categoryId/attributes",
  getPublicCategoryAttributes
);

/**
 * Admin routes
 */
router.post(
  "/admin/category-attributes",
  userAuth,
  adminOnly,
  createCategoryAttribute
);

router.get(
  "/admin/categories/:categoryId/attributes",
  userAuth,
  adminOnly,
  getAdminCategoryAttributes
);

export default router;