import mongoose from "mongoose";
import Product from "../models/product.model.js";
import Category from "../../catalog/models/category.model.js";
import Brand from "../../catalog/models/brand.model.js";
import HandleError from "../../../utils/handleError.js";

/**
 *  Genrate SEO friendly slug
 */

const generateSlug = (text = " ") => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

/**
 *  Check Valid MongoDB ObjectId
 */

const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

/**
 * Update only allowed fields
 */
const updateAllowedFields = (document, data, allowedFields = []) => {
  allowedFields.forEach((field) => {
    //   Ye check karta hai ki data ke andar wo field available hai ya nahi.
    if (Object.prototype.hasOwnProperty.call(data, field)) {
      document[field] = data[field];
    }
  });
  return document;
};

/**
 * Check category exists
 */

const getActiveCategoryOrThrow = async (categoryId) => {
  if (!isValidObjectId(categoryId)) {
    throw new HandleError("Invalid category ID", 400);
  }
  const category = await Category.findOne({
    _id: categoryId,
    isActive: true,
    isDeleted: false,
  });

  if (!category) {
    throw new HandleError("Category not found or inactive", 404);
  }
  return category;
};

/**
 * Check Brand exists
 */

const getActiveBrandOrThrow = async (brandId) => {
  if (!isValidObjectId(brandId)) {
    throw new HandleError("Invalid brand ID", 400);
  }
  const brand = await Brand.findOne({
    _id: brandId,
    isActive: true,
    isDeleted: false,
  });

  if (!brand) {
    throw new HandleError("Brand not found or inactive", 404);
  }
  return brand;
};

/**
 * Build product query for list/search/filter
 */

const buildProductQuery = (queryParams = {}, options = {}) => {
  const { isAdmin } = options;

  const {
    keyword,
    category: categoryId,
    brand: brandId,
    status,
    visibility,
    minPrice,
    maxPrice,
    isFeatured,
  } = queryParams;

  const query = {
    isDeleted: false,
  };

  /**
   *  Customer side should only see published public products.
   *  Admin side can see draft, published, archived etc.
   */

  if (!isAdmin) {
    query.status = "published";
    query.visibility = "public";
  }
  if (isAdmin && status) {
    query.status = status;
  }

  if (isAdmin && visibility) {
    query.visibility = visibility;
  }
  if (keyword && typeof keyword === "string" && keyword.trim()) {
    query.$or = [
      { name: { $regex: keyword.trim(), $options: "i" } },
      { shortDescription: { $regex: keyword.trim(), $options: "i" } },
      { description: { $regex: keyword.trim(), $options: "i" } },
      { sku: { $regex: keyword.trim(), $options: "i" } },
    ];
  }
  if (categoryId && isValidObjectId(categoryId)) {
    query.category = categoryId;
  }
  if (brandId && isValidObjectId(brandId)) {
    query.brand = brandId;
  }
  if (minPrice || maxPrice) {
    query.price = {};

    if (minPrice) {
      query.price.$gte = Number(minPrice);
    }
    if (maxPrice) {
      query.price.$lte = Number(maxPrice);
    }
  }
  if (isFeatured !== undefined) {
    query.isFeatured = isFeatured === "true";
  }

  return query;
};

/**
 *  Create product
 */

const createProductService = async (productData, adminId) => {
  const { name, category, brand, sku, images = [] } = productData;

  if (!name) {
    throw new HandleError("Product name is required", 400);
  }

  if (!category) {
    throw new HandleError("Product category is required", 400);
  }

  if (!brand) {
    throw new HandleError("Product brand is required", 400);
  }

  if (!sku) {
    throw new HandleError("Product SKU is required", 400);
  }

  if (!Array.isArray(images) || images.length === 0) {
    throw new HandleError("At least one product image is required", 400);
  }
  await getActiveCategoryOrThrow(category);
  await getActiveBrandOrThrow(brand);

  const slug = productData.slug
    ? generateSlug(productData.slug)
    : generateSlug(name);

  const normalizedSku = sku.toUpperCase().trim();

  const existingProduct = await Product.findOne({
    $or: [{ slug }, { sku: normalizedSku }],
  });

  if (existingProduct) {
    throw new HandleError("Product with this slug or SKU already exists", 409);
  }

  const product = await Product.create({
    ...productData,
    slug,
    sku: normalizedSku,
    createdBy: adminId,
  });

  return product;
};

/**
 *  Get all products
 */

const getAllProductsService = async (queryParams = {}, options = {}) => {
  const page = Number(queryParams.page) || 1;
  const limit = Number(queryParams.limit) || 20;
  const skip = (page - 1) * limit;

  const sortOptions = {
    newest: { createdAt: -1 },
    oldest: { createdAt: 1 },
    price_low: { price: 1 },
    price_high: { price: -1 },
    rating: { ratings: -1 },
    popular: { sold: -1 },
  };

  const sortBy = sortOptions[queryParams.sort] || sortOptions.newest;
  const query = buildProductQuery(queryParams, options);

  const [products, totalProducts] = await Promise.all([
    Product.find(query)
      .populate("category", "name slug")
      .populate("brand", "name slug logo")
      .sort(sortBy)
      .skip(skip)
      .limit(limit)
      .lean(),
    Product.countDocuments(query),
  ]);

  return {
    products,
    pagination: {
      totalProducts,
      currentPage: page,
      totalPages: Math.ceil(totalProducts / limit),
      limit,
    },
  };
};

/**
 * Get single product
 */

const getSingleProductService = async (productId, options = {}) => {
  const { isAdmin = false } = options;

  if (!isValidObjectId(productId)) {
    throw new HandleError("Invalid product ID", 400);
  }

  const query = {
    _id: productId,
    isDeleted: false,
  };
  if (!isAdmin) {
    query.status = "published";
    query.visibility = "public";
  }

  const product = await Product.findOne(query)
    .populate("category", "name slug")
    .populate("brand", "name slug logo")
    .lean();

  if (!product) {
    throw new HandleError("Product not found", 404);
  }

  return product;
};

/**
 * Update product By Admin
 */

const updateProductService = async (productId, updateData, adminId) => {
  if (!isValidObjectId(productId)) {
    throw new HandleError("Invalid product ID", 400);
  }

  const product = await Product.findOne({
    _id: productId,
    isDeleted: false,
  });

  if (!product) {
    throw new HandleError("Product not found", 404);
  }
  if (updateData.category) {
    await getActiveCategoryOrThrow(updateData.category);
  }

  if (updateData.brand) {
    await getActiveBrandOrThrow(updateData.brand);
  }

  if (updateData.name && !updateData.slug) {
    updateData.slug = generateSlug(updateData.name);
  }

  if (updateData.slug) {
    updateData.slug = generateSlug(updateData.slug);
  }

  if (updateData.sku) {
    updateData.sku = updateData.sku.toUpperCase().trim();
  }

  if (updateData.slug || updateData.sku) {
    const duplicateProduct = await Product.findOne({
      _id: { $ne: productId },
      $or: [
        ...(updateData.slug ? [{ slug: updateData.slug }] : []),
        ...(updateData.sku ? [{ sku: updateData.sku }] : []),
      ],
    });

    if (duplicateProduct) {
      throw new HandleError(
        "Product with this slug or SKU already exists",
        409,
      );
    }
  }
  const allowedFields = [
    "name",
    "slug",
    "shortDescription",
    "description",
    "category",
    "brand",
    "price",
    "discountPrice",
    "costPrice",
    "currency",
    "sku",
    "stock",
    "lowStockThreshold",
    "trackInventory",
    "images",
    "seo",
    "status",
    "visibility",
    "isFeatured",
  ];
  updateAllowedFields(product, updateData, allowedFields);
  product.updatedBy = adminId;

  await product.save();

  return product;
};

/**
 *  Soft delete product by admin
 */

const softDeleteProductService = async (productId, adminId) => {
  if (!isValidObjectId(productId)) {
    throw new HandleError("Invalid product Id", 400);
  }
  const product = await Product.findOne({
    _id: productId,
    isDeleted: false,
  });

  if (!product) {
    throw new HandleError("Product not found", 404);
  }

  product.isDeleted = true;
  product.deletedAt = new Date();
  product.deletedBy = adminId;
  product.status = "archived";
  await product.save();
  return product;
};

export {
  createProductService,
  getAllProductsService,
  getSingleProductService,
  updateProductService,
  softDeleteProductService,
}; 
