import express from "express";

import { userAuth } from "../../../middleware/userAuthMIddleware.js";
// import adminOnly from "../../../middleware/adminMddleware.js";

import {validate} from "../../../middleware/validate.js";
import { updateProfile } from "../controllers/user.controller.js";
import { updateProfileSchema } from "../validations/user.validation.js";

const router = express.Router();

router.patch(
  "/users/profile",
  userAuth,
  validate(updateProfileSchema),
  updateProfile,
);

export default router;
