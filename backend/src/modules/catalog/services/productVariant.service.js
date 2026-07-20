import mongoose from 'mongoose';
import Product from '../../product/models/product.model.js';
import ProductVariant from '../models/productVariant.model.js';
import CategoryAttribute  from '../models/categoryAttribute.model.js';
import HandleError from '../../../utils/handleError.js';

const ALLOWED_VARIANT_ATTRIBUTE_TYPES = ["select", "color"];

/**
 * Check valid MongoDB ObjectId
 */

const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

/**
 * Normalize option value
 *
 * Example:
 * " Black " -> "black"
 * "XL " -> "xl"
 */
const normalizeOptionValue = (value = "") => {
  return String(value).trim().toLowerCase();
};
/**
 * Normalize SKU
 *
 * Example:
 * " tshirt-black-l " -> "TSHIRT-BLACK-L"
 */
const normalizeSku = (sku = "") => {
  return String(sku).trim().toUpperCase();
};

/**
 * Extract option value from different request formats
 *
 * Supported formats:
 *
 * optionValue: "black"
 *
 * selectedValue: "black"
 *
 * selectedValue: {
 *   value: "black"
 * }
 */
const getOptionValueFromInput = (attribute = {}) => {
  if (attribute.optionValue) {
    return attribute.optionValue;
  }

  if (typeof attribute.selectedValue === "string") {
    return attribute.selectedValue;
  }

  if (attribute.selectedValue?.value) {
    return attribute.selectedValue.value;
  }

  if (attribute.value?.selectedValue) {
    if (typeof attribute.value.selectedValue === "string") {
      return attribute.value.selectedValue;
    }

    return attribute.value.selectedValue.value;
  }

  return null;
};

/**
 * Find selected option from CategoryAttribute options
 *  selected value ko clean karke options array mein matching option find karta hai aur sirf value nahi, poora matched option object return karta hai.
 */

const findOptionByValue = (options = [], selectedValue) => {
  const normalizedValue = normalizeOptionValue(selectedValue);

  return options.find((option) => {
    return normalizeOptionValue(option.value) === normalizedValue;
  });
};

/**
 * Generate unique variant combination signature
 *
 * Example:
 * [
 *   { attributeSlug: "color", optionValue: "black" },
 *   { attributeSlug: "size", optionValue: "l" }
 * ]
 *
 * Output:
 * color:black|size:l
 */
const generateOptionSignature = (attributes = []) => {
  return attributes
    .map((attribute) => ({
      attributeSlug: normalizeOptionValue(attribute.attributeSlug),
      optionValue: normalizeOptionValue(attribute.optionValue),
    }))
    .sort((a, b) => a.attributeSlug.localeCompare(b.attributeSlug))
    .map((attribute) => {
      return `${attribute.attributeSlug}:${attribute.optionValue}`;
    })
    .join("|");
};

/**
 * Find product safely
 */
const getProductOrThrow = async (productId, session = null) => {
  if (!isValidObjectId(productId)) {
    throw new HandleError("Invalid product ID", 400);
  }

  const query = Product.findOne({
    _id: productId,
    isDeleted: false,
  });

  if (session) {
    query.session(session);
  }

  const product = await query;

  if (!product) {
    throw new HandleError("Product not found", 404);
  }

  return product;
};

/**
 * Validate categoryAttribute IDs and fetch CategoryAttributes
 */
const getCategoryAttributesMapOrThrow = async ({
  categoryAttributeIds,
  productCategoryId,
  session = null,
}) => {
  const invalidId = categoryAttributeIds.find((id) => !isValidObjectId(id));

  if (invalidId) {
    throw new HandleError("Invalid category attribute ID", 400);
  }

  const query = CategoryAttribute.find({
    _id: { $in: categoryAttributeIds },
    category: productCategoryId,
    isActive: true,
    isDeleted: false,
  });

  if (session) {
    query.session(session);
  }

  const categoryAttributes = await query;

  if (categoryAttributes.length !== categoryAttributeIds.length) {
    throw new HandleError(
      "One or more category attributes are invalid for this product category",
      400
    );
  }

  const categoryAttributeMap = new Map();

  categoryAttributes.forEach((categoryAttribute) => {
    categoryAttributeMap.set(String(categoryAttribute._id), categoryAttribute);
  });

  return categoryAttributeMap;
};

/**
 * Normalize and validate variant attributes
 */
const normalizeVariantAttributes = async ({
  attributes = [],
  product,
  session = null,
}) => {
  if (!Array.isArray(attributes) || attributes.length === 0) {
    throw new HandleError("At least one variant attribute is required", 400);
  }

  const categoryAttributeIds = attributes.map((attribute) => {
    return String(attribute.categoryAttribute || attribute.categoryAttributeId);
  });

  const uniqueCategoryAttributeIds = [...new Set(categoryAttributeIds)];

  if (categoryAttributeIds.length !== uniqueCategoryAttributeIds.length) {
    throw new HandleError("Duplicate variant attributes are not allowed", 400);
  }

  const categoryAttributeMap = await getCategoryAttributesMapOrThrow({
    categoryAttributeIds: uniqueCategoryAttributeIds,
    productCategoryId: product.category,
    session,
  });

  const normalizedAttributes = attributes.map((attribute) => {
    const categoryAttributeId = String(
      attribute.categoryAttribute || attribute.categoryAttributeId
    );

    const categoryAttribute = categoryAttributeMap.get(categoryAttributeId);

    if (!categoryAttribute) {
      throw new HandleError("Invalid category attribute", 400);
    }

    if (!ALLOWED_VARIANT_ATTRIBUTE_TYPES.includes(categoryAttribute.type)) {
      throw new HandleError(
        `${categoryAttribute.name} cannot be used as variant attribute. Use select or color type.`,
        400
      );
    }

    if (
      !Array.isArray(categoryAttribute.options) ||
      categoryAttribute.options.length === 0
    ) {
      throw new HandleError(
        `${categoryAttribute.name} must have options to be used as variant`,
        400
      );
    }

    const selectedValue = getOptionValueFromInput(attribute);

    if (!selectedValue) {
      throw new HandleError(
        `${categoryAttribute.name} selected option is required`,
        400
      );
    }

    const selectedOption = findOptionByValue(
      categoryAttribute.options,
      selectedValue
    );

    if (!selectedOption) {
      throw new HandleError(
        `${selectedValue} is not a valid option for ${categoryAttribute.name}`,
        400
      );
    }

    return {
      categoryAttribute: categoryAttribute._id,
      attributeName: categoryAttribute.name,
      attributeSlug: categoryAttribute.slug,
      attributeType: categoryAttribute.type,

      optionLabel: selectedOption.label,
      optionValue: selectedOption.value,

      colorCode: selectedOption.colorCode,
      unit: categoryAttribute.unit,
    };
  });

  return normalizedAttributes.sort((a, b) => {
    return a.attributeSlug.localeCompare(b.attributeSlug);
  });
};

/**
 * Check SKU duplicate
 */
const checkVariantSkuDuplicate = async (sku, session = null) => {
  const normalizedSku = normalizeSku(sku);

  if (!normalizedSku) {
    throw new HandleError("Variant SKU is required", 400);
  }

  const query = ProductVariant.findOne({
    sku: normalizedSku,
  });

  if (session) {
    query.session(session);
  }

  const existingVariant = await query;

  if (existingVariant) {
    throw new HandleError("Variant SKU already exists", 409);
  }

  return normalizedSku;
};

/**
 * Check duplicate color/size/storage combination
 */
const checkVariantCombinationDuplicate = async ({
  productId,
  optionSignature,
  session = null,
}) => {
  const query = ProductVariant.findOne({
    product: productId,
    optionSignature,
    isDeleted: false,
  });

  if (session) {
    query.session(session);
  }

  const existingVariant = await query;

  if (existingVariant) {
    throw new HandleError(
      `Variant combination already exists: ${optionSignature}`,
      409
    );
  }
};


/**
 * Build final variant payload
 */
const buildVariantPayload = ({
  product,
  variantData,
  normalizedSku,
  normalizedAttributes,
  optionSignature,
  shouldBeDefault,
  adminId,
}) => {
  const price =
    variantData.price !== undefined && variantData.price !== null
      ? variantData.price
      : product.price;

  const discountPrice =
    variantData.discountPrice !== undefined &&
    variantData.discountPrice !== null
      ? variantData.discountPrice
      : product.discountPrice;

  if (
    discountPrice !== undefined &&
    discountPrice !== null &&
    Number(discountPrice) >= Number(price)
  ) {
    throw new HandleError(
      "Variant discount price must be less than variant price",
      400
    );
  }

  return {
    product: product._id,

    title: variantData.title,
    sku: normalizedSku,
    barcode: variantData.barcode,

    attributes: normalizedAttributes,
    optionSignature,

    price,
    discountPrice,
    costPrice: variantData.costPrice,
    currency: variantData.currency || product.currency || "INR",

    stock: variantData.stock ?? 0,
    reservedStock: 0,
    lowStockThreshold: variantData.lowStockThreshold ?? 5,

    sold: 0,
    trackInventory: variantData.trackInventory ?? true,
    allowBackorder: variantData.allowBackorder ?? false,

    images: variantData.images || [],

    weight: variantData.weight,
    dimensions: variantData.dimensions,

    isDefault: shouldBeDefault,
    status: variantData.status || "active",

    createdBy: adminId,
  };
};


/**
 * Create single product variant
 */
const createProductVariantService = async (productId, variantData, adminId) => {
  const session = await mongoose.startSession();

  try {
    let createdVariant;

    await session.withTransaction(async () => {
      const product = await getProductOrThrow(productId, session);

      const normalizedSku = await checkVariantSkuDuplicate(
        variantData.sku,
        session
      );

      const normalizedAttributes = await normalizeVariantAttributes({
        attributes: variantData.attributes,
        product,
        session,
      });

      const optionSignature = generateOptionSignature(normalizedAttributes);

      await checkVariantCombinationDuplicate({
        productId: product._id,
        optionSignature,
        session,
      });

      const variantCount = await ProductVariant.countDocuments({
        product: product._id,
        isDeleted: false,
      }).session(session);

      const shouldBeDefault =
        variantData.isDefault === true || variantCount === 0;

      if (shouldBeDefault) {
        await ProductVariant.updateMany(
          {
            product: product._id,
            isDefault: true,
            isDeleted: false,
          },
          {
            $set: {
              isDefault: false,
              updatedBy: adminId,
            },
          },
          { session }
        );
      }

      const variantPayload = buildVariantPayload({
        product,
        variantData,
        normalizedSku,
        normalizedAttributes,
        optionSignature,
        shouldBeDefault,
        adminId,
      });

      const [variant] = await ProductVariant.create([variantPayload], {
        session,
      });

      createdVariant = variant;
    });

    return createdVariant;
  } catch (error) {
    if (error?.code === 11000) {
      throw new HandleError(
        "Variant SKU or variant combination already exists",
        409
      );
    }

    throw error;
  } finally {
    await session.endSession();
  }
};

/**
 * Create multiple variants safely
 */
const createManyProductVariantsService = async (
  productId,
  variants = [],
  adminId
) => {
  if (!Array.isArray(variants) || variants.length === 0) {
    throw new HandleError("Variants array is required", 400);
  }

  const session = await mongoose.startSession();

  try {
    let createdVariants = [];

    await session.withTransaction(async () => {
      const product = await getProductOrThrow(productId, session);

      const skus = variants.map((variant) => normalizeSku(variant.sku));

      if (skus.some((sku) => !sku)) {
        throw new HandleError("Every variant must have SKU", 400);
      }

      const uniqueSkus = [...new Set(skus)];

      if (skus.length !== uniqueSkus.length) {
        throw new HandleError("Duplicate SKUs are not allowed in request", 400);
      }

      const existingSkuVariants = await ProductVariant.find({
        sku: { $in: uniqueSkus },
      }).session(session);

      if (existingSkuVariants.length > 0) {
        throw new HandleError("One or more variant SKUs already exist", 409);
      }

      const defaultVariants = variants.filter(
        (variant) => variant.isDefault === true
      );

      if (defaultVariants.length > 1) {
        throw new HandleError("Only one variant can be default", 400);
      }

      const variantCount = await ProductVariant.countDocuments({
        product: product._id,
        isDeleted: false,
      }).session(session);

      const payloads = [];
      const signatures = [];

      for (let index = 0; index < variants.length; index += 1) {
        const variantData = variants[index];

        const normalizedAttributes = await normalizeVariantAttributes({
          attributes: variantData.attributes,
          product,
          session,
        });

        const optionSignature = generateOptionSignature(normalizedAttributes);

        signatures.push(optionSignature);

        const shouldBeDefault =
          variantData.isDefault === true ||
          (variantCount === 0 && defaultVariants.length === 0 && index === 0);

        const payload = buildVariantPayload({
          product,
          variantData,
          normalizedSku: skus[index],
          normalizedAttributes,
          optionSignature,
          shouldBeDefault,
          adminId,
        });

        payloads.push(payload);
      }

      const uniqueSignatures = [...new Set(signatures)];

      if (signatures.length !== uniqueSignatures.length) {
        throw new HandleError(
          "Duplicate variant combinations are not allowed in request",
          400
        );
      }

      const existingCombinations = await ProductVariant.find({
        product: product._id,
        optionSignature: { $in: uniqueSignatures },
        isDeleted: false,
      }).session(session);

      if (existingCombinations.length > 0) {
        throw new HandleError(
          "One or more variant combinations already exist",
          409
        );
      }

      const hasDefaultInPayload = payloads.some(
        (payload) => payload.isDefault === true
      );

      if (hasDefaultInPayload) {
        await ProductVariant.updateMany(
          {
            product: product._id,
            isDefault: true,
            isDeleted: false,
          },
          {
            $set: {
              isDefault: false,
              updatedBy: adminId,
            },
          },
          { session }
        );
      }

      createdVariants = await ProductVariant.insertMany(payloads, {
        session,
        ordered: true,
      });
    });

    return createdVariants;
  } catch (error) {
    if (error?.code === 11000) {
      throw new HandleError(
        "Variant SKU or variant combination already exists",
        409
      );
    }

    throw error;
  } finally {
    await session.endSession();
  }
};

/**
 * Get variants by product
 */
const getProductVariantsService = async (productId, options = {}) => {
  const { isAdmin = false } = options;

  await getProductOrThrow(productId);

  const query = {
    product: productId,
    isDeleted: false,
  };

  if (!isAdmin) {
    query.status = "active";
  }

  const variants = await ProductVariant.find(query)
    .sort({ isDefault: -1, createdAt: 1 })
    .lean();

  return variants;
};

export {
  createProductVariantService,
  createManyProductVariantsService,
  getProductVariantsService,
};

