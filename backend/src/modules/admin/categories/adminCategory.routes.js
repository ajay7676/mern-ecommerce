import express from "express";

import {
  createAdminCategory,
  deleteAdminCategory,
  getAdminCategories,
  getAdminCategory,
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

router
  .route("/admin/categories/:categoryId")
  .get(getAdminCategory)
  .patch(updateAdminCategory)
  .delete(deleteAdminCategory);

export default router;
