import express from "express";

import {
  createAdminBrand,
  deleteTemporaryBrandUploads,
  updateAdminBrand,
  uploadBrandBanner,
  uploadBrandLogo,
} from "./adminBrand.controller.js";

import { userAuth } from "../../../middleware/userAuthMIddleware.js";
import adminOnly from "../../../middleware/adminMddleware.js";
import {
  bannerUpload,
  logoUpload,
} from "../../../middleware/brandUpload.middleware.js";

const router = express.Router();

router.post("/admin/brands", userAuth, adminOnly, createAdminBrand);

router.post(
  "/admin/brands/upload-logo",
  userAuth,
  adminOnly,
  logoUpload,
  uploadBrandLogo,
);

router.post(
  "/admin/brands/upload-banner",
  userAuth,
  adminOnly,
  bannerUpload,
  uploadBrandBanner,
);
router.delete(
  "/admin/brands/uploads",
  userAuth,
  adminOnly,
  deleteTemporaryBrandUploads,
);
router.patch("/admin/brands/:brandId", userAuth, adminOnly, updateAdminBrand);

export default router;
