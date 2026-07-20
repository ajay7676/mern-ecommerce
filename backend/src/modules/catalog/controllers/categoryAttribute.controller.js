import {
  createCategoryAttributeService,
  getCategoryAttributesByCategoryService,
} from "../services/categoryAttribute.service.js";

/**
 * @desc    Create category attribute
 * @route   POST /api/v1/admin/category-attributes
 * @access  Admin
 */

const createCategoryAttribute = async (req, res, next) => {
  try {
    const adminId = req.user?._id || req.user?.id;
    const attribute = await createCategoryAttributeService(req.body, adminId);
    res.status(201).json({
      success: true,
      message: "Category attribute created successfully",
      attribute,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get category attributes for admin
 * @route   GET /api/v1/admin/categories/:categoryId/attributes
 * @access  Admin
 */

const getAdminCategoryAttributes = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const attributes = await getCategoryAttributesByCategoryService(
      categoryId,
      {
        isAdmin: true,
      },
    );

    res.status(200).json({
      success: true,
      message: "Category attributes fetched successfully",
      attributes,
    });
  } catch (error) {
    next(error);
  }
};


/**
 * @desc    Get public category attributes
 * @route   GET /api/v1/categories/:categoryId/attributes
 * @access  Public
 */


const getPublicCategoryAttributes = async (req, res, next) => {
  try {
    const { categoryId } = req.params;

    const attributes = await getCategoryAttributesByCategoryService(
      categoryId,
      {
        isAdmin: false,
      }
    );

    res.status(200).json({
      success: true,
      message: "Category attributes fetched successfully",
      attributes,
    });
  } catch (error) {
    next(error);
  }
};

export {
  createCategoryAttribute,
  getAdminCategoryAttributes,
  getPublicCategoryAttributes,
};