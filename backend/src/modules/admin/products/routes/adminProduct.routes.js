import express from "express";
import { userAuth } from "../../../../middleware/userAuthMIddleware.js";
import adminOnly from "../../../../middleware/adminMddleware.js";
import {validate} from "../../../../middleware/validate.js";
import {validateQuery} from '../../../../middleware/validateQuery.js'
import {uploadProductImagesMiddleware} from '../../../../middleware/adminproductImageUpload.middleware.js'
import {
  createAdminProductSchema,
 getAdminProductsQuerySchema
 } from "../validations/adminProduct.validation.js";
import { 
  createAdminProductController,
   getAdminProductsController
 } from "../controllers/adminProduct.controller.js";
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

router.get(
  "/admin/products",
   userAuth,
  adminOnly,
  validateQuery(getAdminProductsQuerySchema),
  getAdminProductsController
);
router.post(
  "/admin/products",
   userAuth,
  adminOnly,
  validate(createAdminProductSchema),
  createAdminProductController
);



export default router;