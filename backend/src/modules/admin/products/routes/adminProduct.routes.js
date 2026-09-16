import express from "express";
import { userAuth } from "../../../../middleware/userAuthMIddleware.js";
import adminOnly from "../../../../middleware/adminMddleware.js";
import {validate} from "../../../../middleware/validate.js";
import {uploadProductImagesMiddleware} from '../../../../middleware/adminproductImageUpload.middleware.js'
import { createAdminProductSchema } from "../validations/adminProduct.validation.js";
import { createAdminProductController } from "../controllers/adminProduct.controller.js";
import {
  deleteTemporaryProductImagesController,
  uploadTemporaryProductImagesController
 }
  from "../controllers/adminProductImage.controller.js";


const router = express.Router();





router.post(
  "/admin/products/images/temp",
   userAuth,
  adminOnly,
  uploadProductImagesMiddleware,
  uploadTemporaryProductImagesController
);
router.delete(
  "/admin/products/images/temp",
  userAuth,
  adminOnly,
  deleteTemporaryProductImagesController
);
router.post(
  "/admin/products",
   userAuth,
  adminOnly,
  validate(createAdminProductSchema),
  createAdminProductController
);


export default router;