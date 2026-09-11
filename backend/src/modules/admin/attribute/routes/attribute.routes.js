import express from "express";
import { userAuth } from "../../../../middleware/userAuthMIddleware.js";
import adminOnly from "../../../../middleware/adminMddleware.js";
import {validate} from "../../../../middleware/validate.js";
import {
   createAttributeSchema, 
   getAttributesQuerySchema
 } from "../validations/attribute.validation.js";
import { 
  createAttributeController,
   getAttributesController 
  } from "../controllers/attribute.controller.js";
import { validateQuery } from "../../../../middleware/validateQuery.js";



const router = express.Router();


router.post(
  "/admin/attributes",
  userAuth,
  adminOnly,
  validate(createAttributeSchema),
  createAttributeController
);

router.get(
  "/admin/attributes",
  userAuth,
  adminOnly,
  validateQuery(getAttributesQuerySchema),
  getAttributesController
);



export default router;