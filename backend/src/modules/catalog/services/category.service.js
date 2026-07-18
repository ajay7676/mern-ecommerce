import mongoose from "mongoose";
import Category from "../models/category.model.js";
import HandleError from '../../../utils/handleError.js'

const generateSlug = (text = "") => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

const buildCategoryTree = (categories = []) => {
  const categoryMap = new Map();
  const categoryTree = [];

  categories.forEach((category) => {
    categoryMap.set(String(category._id), {
      ...category,
      children: [],
    });
  });

  categories.forEach((category) => {
    const categoryId = String(category._id);
    const parentId = category.parentCategory
      ? String(category.parentCategory)
      : null;

    const currentCategory = categoryMap.get(categoryId);

    if (parentId && categoryMap.has(parentId)) {
      const parentCategory = categoryMap.get(parentId);
      parentCategory.children.push(currentCategory);
    } else {
      categoryTree.push(currentCategory);
    }
  });

  return categoryTree;
};


const createCategoryService = async (categoryData, adminId) => {
  const {
    name,
    slug,
    description,
    image,
    parentCategory = null,
    sortOrder = 0,
    isActive = true,
    isFeatured = false,
  } = categoryData;

  if (!name || !name.trim()) {
    throw new HandleError("Category name is required", 400);
  }

  let parent = null;
  let level = 0;
  let ancestors = [];

  if (parentCategory) {
    if (!isValidObjectId(parentCategory)) {
      throw new HandleError("Invalid parent category ID", 400);
    }

    parent = await Category.findOne({
      _id: parentCategory,
      isDeleted: false,
    });

    if (!parent) {
      throw new HandleError("Parent category not found", 404);
    }

    level = parent.level + 1;
    ancestors = [...parent.ancestors, parent._id];
  }

  const finalSlug = slug ? generateSlug(slug) : generateSlug(name);

  const duplicateCategory = await Category.findOne({
    parentCategory: parent ? parent._id : null,
    slug: finalSlug,
    isDeleted: false,
  });

  if (duplicateCategory) {
    throw new HandleError(
      "Category already exists under this parent category",
      409
    );
  }

  const path = parent ? `${parent.path}/${finalSlug}` : finalSlug;

  const category = await Category.create({
    name: name.trim(),
    slug: finalSlug,
    description,
    image,
    parentCategory: parent ? parent._id : null,
    ancestors,
    level,
    path,
    sortOrder,
    isActive,
    isFeatured,
    createdBy: adminId,
  });

  return category;
};

//  Get All categories by Admin

const getAdminCategoriesService = async (queryParams = {}) => {
  const {
    keyword,
    parentCategory,
    level,
    isActive,
    page = 1,
    limit = 20,
  } = queryParams;

  const query = {
    isDeleted: false,
  };

  if (keyword && typeof keyword === "string" && keyword.trim()) {
    query.$or = [
      { name: { $regex: keyword.trim(), $options: "i" } },
      { slug: { $regex: keyword.trim(), $options: "i" } },
      { path: { $regex: keyword.trim(), $options: "i" } },
    ];
  }

  if (parentCategory === "null" || parentCategory === "root") {
    query.parentCategory = null;
  } else if (parentCategory) {
    if (!isValidObjectId(parentCategory)) {
      throw new HandleError("Invalid parent category ID", 400);
    }

    query.parentCategory = parentCategory;
  }

  if (level !== undefined) {
    query.level = Number(level);
  }

  if (isActive !== undefined) {
    query.isActive = isActive === "true";
  }

  const currentPage = Number(page) || 1;
  const perPage = Number(limit) || 20;
  const skip = (currentPage - 1) * perPage;

  const [categories, totalCategories] = await Promise.all([
    Category.find(query)
      .populate("parentCategory", "name slug path")
      .populate("createdBy", "name email")
      .populate("updatedBy", "name email")
      .sort({ level: 1, sortOrder: 1, createdAt: -1 })
      .skip(skip)
      .limit(perPage)
      .lean(),

    Category.countDocuments(query),
  ]);

  return {
    categories,
    pagination: {
      totalCategories,
      currentPage,
      totalPages: Math.ceil(totalCategories / perPage),
      limit: perPage,
    },
  };
};
/**
 * Get public categories for customers
 */
const getPublicCategoriesService = async (queryParams = {}) => {
  const {
    keyword,
    parentCategory,
    level,
    isFeatured,
    page = 1,
    limit = 50,
  } = queryParams;

  const query = {
    isActive: true,
    isDeleted: false,
  };

  if (keyword && typeof keyword === "string" && keyword.trim()) {
    query.$or = [
      { name: { $regex: keyword.trim(), $options: "i" } },
      { slug: { $regex: keyword.trim(), $options: "i" } },
      { path: { $regex: keyword.trim(), $options: "i" } },
    ];
  }

  if (parentCategory === "null" || parentCategory === "root") {
    query.parentCategory = null;
  } else if (parentCategory) {
    if (!isValidObjectId(parentCategory)) {
      throw new HandleError("Invalid parent category ID", 400);
    }

    query.parentCategory = parentCategory;
  }

  if (level !== undefined) {
    query.level = Number(level);
  }

  if (isFeatured !== undefined) {
    query.isFeatured = isFeatured === "true";
  }

  const currentPage = Number(page) || 1;
  const perPage = Number(limit) || 50;
  const skip = (currentPage - 1) * perPage;

  const [categories, totalCategories] = await Promise.all([
    Category.find(query)
      .select(
        "name slug description image parentCategory ancestors level path sortOrder isFeatured"
      )
      .populate("parentCategory", "name slug path")
      .sort({ level: 1, sortOrder: 1, name: 1 })
      .skip(skip)
      .limit(perPage)
      .lean(),

    Category.countDocuments(query),
  ]);

  return {
    categories,
    pagination: {
      totalCategories,
      currentPage,
      totalPages: Math.ceil(totalCategories / perPage),
      limit: perPage,
    },
  };
};

/**
 * Get public category hierarchy/tree
 */
const getPublicCategoryTreeService = async () => {
  const categories = await Category.find({
    isActive: true,
    isDeleted: false,
  })
    .select(
      "name slug description image parentCategory ancestors level path sortOrder isFeatured"
    )
    .sort({ level: 1, sortOrder: 1, name: 1 })
    .lean();

  const categoryTree = buildCategoryTree(categories);

  return categoryTree;
};

export {
  createCategoryService,
  getAdminCategoriesService,
  getPublicCategoriesService,
  getPublicCategoryTreeService,
};