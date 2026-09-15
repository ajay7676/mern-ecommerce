import { createAdminProductService } from "../services/adminProduct.service.js";

export const createAdminProductController = async (req, res, next) => {
  try {
    const product = await createAdminProductService({
      payload: req.body,
      adminId: req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};