import express from "express";

import {
  createAdminUser,
  getAdminUser,
  getAdminUsers,
  updateAdminUser,
  updateAdminUserStatus,
  deleteAdminUser,
} from "./adminUser.controller.js";

import { userAuth } from "../../../middleware/userAuthMIddleware.js";
import adminOnly from "../../../middleware/adminMddleware.js";

const router = express.Router();

// router.use(userAuth, adminOnly);

router.post("/admin/users", userAuth, adminOnly, createAdminUser);
router.get("/admin/users", userAuth, adminOnly, getAdminUsers);

router.get("/admin/users/:userId", userAuth, adminOnly, getAdminUser);
router.patch("/admin/users/:userId", userAuth, adminOnly, updateAdminUser);


router.patch("/admin/users/:userId/status",userAuth, adminOnly, updateAdminUserStatus);

router.delete("/admin/users/:userId", userAuth, adminOnly ,deleteAdminUser);

export default router;
