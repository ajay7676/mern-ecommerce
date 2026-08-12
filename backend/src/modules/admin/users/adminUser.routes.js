import express from "express";

import {
  createAdminUser,
  getAdminUser,
  getAdminUsers,
  updateAdminUser,
  updateAdminUserStatus,
} from "./adminUser.controller.js";

import { userAuth } from '../../../middleware/userAuthMIddleware.js'
import adminOnly from "../../../middleware/adminMddleware.js";

const router = express.Router();

router.use(userAuth, adminOnly);

router.route("/admin/users").get(getAdminUsers).post(createAdminUser);

router.route("/admin/users/:userId").get(getAdminUser).patch(updateAdminUser);

router.patch("/admin/users/:userId/status", updateAdminUserStatus);

export default router;
