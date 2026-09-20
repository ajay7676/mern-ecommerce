import {
  createAdminProductService,
  getAdminProductsService,
  getAdminProductDetailService 
} from "../services/adminProduct.service.js";

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

export const getAdminProductsController = async (req, res, next) => {
  try {
    const data = await getAdminProductsService(req.query);

    return res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const getAdminProductDetailController = async (req, res, next) => {
  try {
    const data = await getAdminProductDetailService(req.params.productId);

    return res.status(200).json({
      success: true,
      message: "Product detail fetched successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};