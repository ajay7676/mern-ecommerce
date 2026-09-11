import express from "express";
import { userAuth } from "../../../../middleware/userAuthMIddleware.js";
import adminOnly from "../../../../middleware/adminMddleware.js";
import {validate} from "../../../../middleware/validate.js";
import {
  createAttributeSchema, 
  getAttributesQuerySchema,
  attributeParamsSchema,
  bulkDeleteAttributesSchema,
  updateAttributeSchema,
  updateAttributeStatusSchema,
   
 } from "../validations/attribute.validation.js";
import { 
  bulkDeleteAttributesController,
  createAttributeController,
  deleteAttributeController,
  getAttributeStatsController,
  getAttributeTypeSummaryController,
  getAttributesController,
  getSingleAttributeController,
  updateAttributeController,
  updateAttributeStatusController,
  } from "../controllers/attribute.controller.js";
import { validateQuery } from "../../../../middleware/validateQuery.js";
import { validateParams } from "../../../../middleware/validateParams.js";


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
router.get(
  "/admin/attributes/stats",
   userAuth,
  adminOnly,
  getAttributeStatsController
);

router.get(
  "/admin/attributes/type-summary",
  userAuth,
  adminOnly,
  getAttributeTypeSummaryController
);

router.delete(
  "/admin/attributes/bulk",
   userAuth,
  adminOnly,
  validate(bulkDeleteAttributesSchema),
  bulkDeleteAttributesController
);

router.get(
  "/admin/attributes/:attributeId",
   userAuth,
  adminOnly,
  validateParams(attributeParamsSchema),
  getSingleAttributeController
);

router.patch(
  "/admin/attributes/:attributeId",
   userAuth,
  adminOnly,
  validateParams(attributeParamsSchema),
  validate(updateAttributeSchema),
  updateAttributeController
);

router.patch(
  "/admin/attributes/:attributeId/status",
   userAuth,
  adminOnly,
  validateParams(attributeParamsSchema),
  validate(updateAttributeStatusSchema),
  updateAttributeStatusController
);

router.delete(
  "/admin/attributes/:attributeId",
   userAuth,
  adminOnly,
  validateParams(attributeParamsSchema),
  deleteAttributeController
);



export default router;