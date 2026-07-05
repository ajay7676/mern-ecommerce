import {
  createCategoryService,
  getAdminCategoriesService,
  getPublicCategoriesService,
  getPublicCategoryTreeService,
} from "../services/category.service.js";

/**
 * Create category / subcategory / item category
 *  POST /api/v1/admin/categories
 */

 const createCategory  = async(req, res, next) => {
    try {
        const adminId = req.user?._id || req.user?.id;
        const category = await createCategoryService(req.body, adminId);
        res.status(201).json({
            success: true,
            message: "Category created successfully",
            category,
        });
    } catch (error) {
        next(error)
        
    }
 };

 /**
 * @desc    Get all categories for admin
 * @route   GET /api/v1/admin/categories
 * @access  Admin
 */

 const getAdminCategories = async (req, res, next) => {
  try {
    const result = await getAdminCategoriesService(req.query);

    res.status(200).json({
      success: true,
      message: "Admin categories fetched successfully",
      categories: result.categories,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get public categories for customers
 * @route   GET /api/v1/categories
 * @access  Public
 */
const getPublicCategories = async (req, res, next) => {
  try {
    const result = await getPublicCategoriesService(req.query);

    res.status(200).json({
      success: true,
      message: "Categories fetched successfully",
      categories: result.categories,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get public category hierarchy/tree
 * @route   GET /api/v1/categories/tree
 * @access  Public
 */
const getPublicCategoryTree = async (req, res, next) => {
  try {
    const categories = await getPublicCategoryTreeService();

    res.status(200).json({
      success: true,
      message: "Category tree fetched successfully",
      categories,
    });
  } catch (error) {
    next(error);
  }
};



export {
  createCategory,
  getAdminCategories,
  getPublicCategories,
  getPublicCategoryTree
};