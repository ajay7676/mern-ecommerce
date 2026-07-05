import express from "express";
import {
    createCategory,
    getAdminCategories,
    getPublicCategories,
    getPublicCategoryTree
 } from "../controllers/category.controller.js";

// Change these paths according to your project

import { userAuth } from '../../../middleware/userAuthMIddleware.js'
import adminOnly from "../../../middleware/adminMddleware.js";

const router = express.Router();

/**
 * Public category routes
 */
router.get("/categories", getPublicCategories);
router.get("/categories/tree", getPublicCategoryTree);

/**
 * Admin category routes
 */

router.post(
  "/admin/categories",
  userAuth,
  adminOnly,
  createCategory
);
router.get(
  "/admin/categories",
  userAuth,
  adminOnly,
  getAdminCategories
);

export default router;