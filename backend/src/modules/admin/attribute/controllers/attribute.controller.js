import { createAttributeService } from "../services/attribute.service.js";

export const createAttributeController = async (req, res, next) => {
  try {
    const attribute = await createAttributeService({
      payload: req.body,
      adminId: req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: "Attribute created successfully",
      data: attribute,
    });
  } catch (error) {
    next(error);
  }
};