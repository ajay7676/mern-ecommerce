import HandleError from "../../../utils/handleError.js";
import {
  createProductVariantService,
  createManyProductVariantsService,
  getProductVariantsService
} from "../services/productVariant.service.js";

/**
 * @desc    Create product variant
 * @route   POST /api/v1/admin/products/:productId/variants
 * @access  Admin
 */

const createProductVariant = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const adminId = req.user?._id || req.user?.id;
    const variant = await createProductVariantService(
      productId,
      req.body,
      adminId,
    );
    res.status(201).json({
      success: true,
      message: "Product variant created successfully",
      variant,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create multiple product variants
 * @route   POST /api/v1/admin/products/:productId/variants/bulk
 * @access  Admin
 */

const createManyProductVariants = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const adminId = req.user?._id || req.user?.id;
    /**
     * Support both formats:
     *
     * 1. { "variants": [...] }
     * 2. [...]
     */
    const variants = Array.isArray(req.body) ? req.body : req.body?.variants;
    if (!Array.isArray(variants) || variants.length === 0) {
      return next(new HandleError("Variants array is required", 400));
    }

     const createdVariants = await createManyProductVariantsService(
      productId,
      variants,
      adminId
    );

    res.status(201).json({
      success: true,
      message: "Product variants created successfully",
      count: createdVariants.length,
      variants: createdVariants,
    });

  } catch (error) {
    next(error);
  }
};


/**
 * @desc    Get public product variants
 * @route   GET /api/v1/products/:productId/variants
 * @access  Public
 */

const getProductVariants = async (req, res, next) => {
  try {
    const { productId } = req.params;

    const result = await getProductVariantsService(productId, {
      isAdmin: false,
    });

    res.status(200).json({
      success: true,
      message: "Product variants fetched successfully",
      product: result.product,
      count: result.count,
      variants: result.variants,
      options: result.options,
      defaultVariant: result.defaultVariant,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get admin product variants
 * @route   GET /api/v1/admin/products/:productId/variants
 * @access  Admin
 */
const getAdminProductVariants = async (req, res, next) => {
  try {
    const { productId } = req.params;

    const result = await getProductVariantsService(productId, {
      isAdmin: true,
      queryParams: req.query,
    });

    res.status(200).json({
      success: true,
      message: "Admin product variants fetched successfully",
      product: result.product,
      count: result.count,
      variants: result.variants,
      options: result.options,
      defaultVariant: result.defaultVariant,
    });
  } catch (error) {
    next(error);
  }
};

export {
     createProductVariant,
     createManyProductVariants,
     getProductVariants,
     getAdminProductVariants
     };
