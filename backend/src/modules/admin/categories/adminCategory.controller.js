import {
  createAdminCategoryService,
  deleteAdminCategoryService,
  getAdminCategoriesService,
  getAdminCategoryService,
  updateAdminCategoryService,
} from "./adminCategory.service.js";

export const getAdminCategories = async (req, res, next) => {
  try {
    const result = await getAdminCategoriesService(req.query);

    res.status(200).json({
      success: true,

      message: "Categories fetched successfully",

      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getAdminCategory = async (req, res, next) => {
  try {
    const category = await getAdminCategoryService(req.params.categoryId);

    res.status(200).json({
      success: true,

      message: "Category fetched successfully",

      data: {
        category,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const createAdminCategory = async (req, res, next) => {
  try {
    const adminId = req.user?._id;

    if (!adminId) {
      throw new HandleError("Authenticated admin ID is missing", 401);
    }

    const category = await createAdminCategoryService(req.body, adminId);

    res.status(201).json({
      success: true,

      message: "Category created successfully",

      data: {
        category,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateAdminCategory = async (req, res, next) => {
  try {
    const category = await updateAdminCategoryService({
      categoryId: req.params.categoryId,

      payload: req.body,
    });

    res.status(200).json({
      success: true,

      message: "Category updated successfully",

      data: {
        category,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteAdminCategory = async (req, res, next) => {
  try {
    const result = await deleteAdminCategoryService(req.params.categoryId);

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
