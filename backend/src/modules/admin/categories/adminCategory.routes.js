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

router.use(userAuth, adminOnly);

router
  .route("/admin/categories")
  .get(getAdminCategories)
  .post(createAdminCategory);

  router.get(
  "/admin/categories/tree",
  getAdminCategoryTree,
);

router.get(
  "/admin/categories/stats",
  getAdminCategoryStats,
);

router.get(
  "/admin/categories/options",
  getAdminCategoryOptions,
);

router
  .route("/admin/categories/:categoryId")
  .get(getAdminCategory)
  .patch(updateAdminCategory)
  .delete(deleteAdminCategory);


export default router;
