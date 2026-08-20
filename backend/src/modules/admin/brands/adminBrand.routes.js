import express from "express";

import { createAdminBrand } from "./adminBrand.controller.js";

import { userAuth } from "../../../middleware/userAuthMIddleware.js";
import adminOnly from "../../../middleware/adminMddleware.js";

const router = express.Router();

router.post("/admin/brands", userAuth, adminOnly, createAdminBrand);

export default router;
