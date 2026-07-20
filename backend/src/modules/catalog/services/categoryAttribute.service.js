import mongoose from "mongoose";
import Category from "../models/category.model.js";
import CategoryAttribute from "../models/categoryAttribute.model.js";
import HandleError from "../../../utils/handleError.js";

const ATTRIBUTE_TYPES_WITH_OPTIONS = ["select", "multi_select", "color"];

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

const normalizeOptions = (options = [], type) => {
  if (!ATTRIBUTE_TYPES_WITH_OPTIONS.includes(type)) {
    return [];
  }

  if (!Array.isArray(options) || options.length === 0) {
    throw new HandleError(`${type} attribute must have options`, 400);
  }

  const normalizedOptions = options.map((option) => {
    const label = option.label?.trim();
    if (!label) {
      throw new HandleError("Option label is required", 400);
    }
    const value = option.value
      ? option.value.trim().toLowerCase()
      : generateSlug(label);

    if (!value) {
      throw new HandleError("Option value is required", 400);
    }

    if (type === "color" && !option.colorCode) {
      throw new HandleError("Color code is required for color option", 400);
    }

    return {
      label,
      value,
      colorCode: option.colorCode?.trim(),
    };
  });

  const values = normalizedOptions.map((option) => option.value);
  const uniqueValues = [...new Set(values)];

  if (values.length !== uniqueValues.length) {
    throw new HandleError("Duplicate option values are not allowed", 400);
  }

  return normalizedOptions;
};

const getCategoryOrThrow = async (categoryId) => {
  if (!isValidObjectId(categoryId)) {
    throw new HandleError("Invalid category ID", 400);
  }

  const category = await Category.findOne({
    _id: categoryId,
    isDeleted: false,
  });

  if (!category) {
    throw new HandleError("Category not found", 404);
  }

  return category;
};

/**
 * Create CategoryAttribute
 */
const createCategoryAttributeService = async (attributeData, adminId) => {
  const {
    category,
    name,
    slug,
    type = "text",
    options = [],
    unit,
    isRequired = false,
    isFilterable = true,
    isComparable = false,
    showOnProductPage = true,
    sortOrder = 0,
    isActive = true,
  } = attributeData;

  if (!category) {
    throw new HandleError("Category is required", 400);
  }

  if (!name || !name.trim()) {
    throw new HandleError("Attribute name is required", 400);
  }

  await getCategoryOrThrow(category);

  const finalSlug = slug ? generateSlug(slug) : generateSlug(name);

  const duplicateAttribute = await CategoryAttribute.findOne({
    category,
    slug: finalSlug,
    isDeleted: false,
  });

  if (duplicateAttribute) {
    throw new HandleError(
      "Attribute already exists for this category",
      409
    );
  }

  const normalizedOptions = normalizeOptions(options, type);

  const categoryAttribute = await CategoryAttribute.create({
    category,
    name: name.trim(),
    slug: finalSlug,
    type,
    options: normalizedOptions,
    unit,
    isRequired,
    isFilterable,
    isComparable,
    showOnProductPage,
    sortOrder,
    isActive,
    createdBy: adminId,
  });

  return categoryAttribute;
};

/**
 * Get CategoryAttributes by category
 */
const getCategoryAttributesByCategoryService = async (
  categoryId,
  options = {}
) => {
  const { isAdmin = false } = options;

  await getCategoryOrThrow(categoryId);

  const query = {
    category: categoryId,
    isDeleted: false,
  };

  if (!isAdmin) {
    query.isActive = true;
  }

  const attributes = await CategoryAttribute.find(query)
    .sort({ sortOrder: 1, createdAt: 1 })
    .lean();

  return attributes;
};

export {
  createCategoryAttributeService,
  getCategoryAttributesByCategoryService,
};