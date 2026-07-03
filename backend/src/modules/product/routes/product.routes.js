import express from "express";

import {
    createProduct
} from '../controllers/product.controller.js'

import { userAuth } from '../../../middleware/userAuthMIddleware.js'
import adminOnly from "../../../middleware/adminMddleware.js";

const router = express.Router();

// Create product
router.post(
  "/admin/products",
  userAuth,
  adminOnly,
  createProduct
);


export default router;