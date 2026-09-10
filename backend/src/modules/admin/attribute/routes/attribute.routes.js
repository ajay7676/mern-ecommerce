import express from "express";
import { userAuth } from "../../../../middleware/userAuthMIddleware.js";
import adminOnly from "../../../../middleware/adminMddleware.js";
import {validate} from "../../../../middleware/validate.js";
import { createAttributeSchema } from "../validations/attribute.validation.js";
import { createAttributeController } from "../controllers/attribute.controller.js";



const router = express.Router();


router.post(
  "/admin/attributes",
  userAuth,
  adminOnly,
  validate(createAttributeSchema),
  createAttributeController
);



export default router;