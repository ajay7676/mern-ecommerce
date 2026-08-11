import express from "express";
import  {
  uploadProductImages,
} from '../controllers/productImageUpload.controller.js';

import {
  parseProductImages,
}  from '../../../middleware/productImageUpload.middleware.js';

import { userAuth } from '../../../middleware/userAuthMIddleware.js'
import adminOnly from "../../../middleware/adminMddleware.js";

const router = express.Router();

router.post(
  "/uploads/product-images",
  userAuth,
 adminOnly,
  parseProductImages,
  uploadProductImages,
);

export default router;
