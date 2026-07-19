import {
  createProductService,
  getAllProductsService,
  getSingleProductService,
  updateProductService,
  softDeleteProductService,
} from "../services/product.service.js";

const createProduct = async (req, res, next) => {
  try {
    const adminId = req.user?._id || req.user?.id;
    const product = await createProductService(req.body, adminId);
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    next(error);
  }
};

/**
 *  Get all published product for customers
 */
const getAllProducts = async (req, res, next) => {
  try {
    const result = await getAllProductsService(req.query, {
      isAdmin: false,
    });

    res.status(200).json({
      success: true,
      message: "Products fetched successfully ALL",
      products: result.products,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all  product for by Admin
 */
const getAdminProducts = async (req, res, next) => {
  try {
    const result = await getAllProductsService(req.query, {
      isAdmin: true,
    });

    res.status(200).json({
      success: true,
      message: "Admin products fetched successfully",
      products: result.products,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};

/**
 *  Get single published product for customers
 */
const getSingleProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;

    const product = await getSingleProductService(productId, {
      isAdmin: false,
    });

    res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      product,
    });
  } catch (error) {
    next(error);
  }
};

/**
 *  Get single product by admin
 */
const getAdminSingleProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;

    const product = await getSingleProductService(productId, {
      isAdmin: true,
    });

    res.status(200).json({
      success: true,
      message: "Admin product fetched successfully",
      product,
    });
  } catch (error) {
    next(error);
  }
};

/**
 *  Update Product by Admin
 */

const updateSingleProductByAdmin = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const adminId = req.user?._id || req.user?.id;
    const product = await updateProductService(productId, req.body, adminId);
    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    next(error);
  }
};

/**
 *  Soft delete product
 */

const deleteProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const adminId = req.user?._id || req.user?.id;
    const product = await softDeleteProductService(productId, adminId);
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      product,
    });
  } catch (error) {
     next(error)
  }
};
export {
  createProduct,
  getAllProducts,
  getAdminProducts,
  getSingleProduct,
  getAdminSingleProduct,
  updateSingleProductByAdmin,
  deleteProduct
};
