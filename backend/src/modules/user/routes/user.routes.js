import express from "express";

import { userAuth } from "../../../middleware/userAuthMIddleware.js";
// import adminOnly from "../../../middleware/adminMddleware.js";

import { validate } from "../../../middleware/validate.js";
import {
  updateProfile,
  getProfile,
  uploadProfileAvatar,
} from "../controllers/user.controller.js";
import { updateProfileSchema } from "../validations/user.validation.js";
import { uploadImage } from "../../../middleware/upload.middleware.js";

const router = express.Router();

router.get("/user/profile", userAuth, getProfile);

router.patch(
  "/user/profile",
  userAuth,
  validate(updateProfileSchema),
  updateProfile,
);

// UPLOAD temporary profile avatar
router.post(
  "/user/profile/avatar",
  userAuth,
  uploadImage.single("avatar"),
  uploadProfileAvatar,
);

export default router;
