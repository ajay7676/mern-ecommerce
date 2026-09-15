import express from "express";
import { userAuth } from "../../../../middleware/userAuthMIddleware.js";
import adminOnly from "../../../../middleware/adminMddleware.js";
import {validate} from "../../../../middleware/validate.js";
import { createAdminProductSchema } from "../validations/adminProduct.validation.js";
import { createAdminProductController } from "../controllers/adminProduct.controller.js";


const router = express.Router();




router.post(
  "/admin/products",
   userAuth,
  adminOnly,
  validate(createAdminProductSchema),
  createAdminProductController
);



export default router;