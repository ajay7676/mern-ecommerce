import express from "express";

import {
  createAdminCategory,
  deleteAdminCategory,
  getAdminCategories,
  getAdminCategory,
  getAdminCategoryOptions,
  getAdminCategoryStats,
  getAdminCategoryTree,
  updateAdminCategory,
} from "./adminCategory.controller.js";
import { userAuth } from "../../../middleware/userAuthMIddleware.js";
import adminOnly from "../../../middleware/adminMddleware.js";

const router = express.Router();


router.get("/admin/categories", userAuth, adminOnly, getAdminCategories);
router.post("/admin/categories", userAuth, adminOnly, createAdminCategory);


router.get("/admin/categories/tree", userAuth, adminOnly, getAdminCategoryTree);


router.get("/admin/categories/stats", userAuth, adminOnly, getAdminCategoryStats);


router.get("/admin/categories/options", userAuth, adminOnly, getAdminCategoryOptions);


router.get("/admin/categories/:categoryId", userAuth, adminOnly, getAdminCategory);
router.patch("/admin/categories/:categoryId", userAuth, adminOnly, updateAdminCategory);
router.delete("/admin/categories/:categoryId", userAuth, adminOnly, deleteAdminCategory);



export default router;
