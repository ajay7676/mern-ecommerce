import express from "express";

import {
  createAdminBrand,
  deleteAdminBrand,
  deleteTemporaryBrandUploads,
  getAdminBrand,
  getAdminBrands,
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

// GET ALL BRANDS

router.get("/admin/brands", userAuth,getAdminBrands);


router.get("/admin/brands/:brandId", userAuth, getAdminBrand );

router.patch("/admin/brands/:brandId", userAuth, adminOnly, updateAdminBrand);
router.delete("/admin/brands/:brandId", userAuth, adminOnly, deleteAdminBrand);

export default router;
