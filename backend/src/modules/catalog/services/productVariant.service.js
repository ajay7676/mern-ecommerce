import mongoose from 'mongoose';
import Product from '../../product/models/product.model.js';
import ProductVariant from '../models/productVariant.model.js';
import CategoryAttribute  from '../models/categoryAttribute.model.js';
import HandleError from '../../../utils/handleError.js';

const ALLOWED_VARIANT_ATTRIBUTE_TYPES = ["select", "color"];
const VARIANT_STATUSES = ["active", "inactive", "archived"];


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
 * Build frontend-friendly variant options.
 * Example output:
 * {
 *   color: [
 *     { label: "Black", value: "black", colorCode: "#000000", isAvailable: true }
 *   ],
 *   size: [
 *     { label: "M", value: "m", isAvailable: true }
 *   ]
 * }
 */

const buildVariantOptions = (variants = []) => {
  const optionsMap = new Map();

  variants.forEach((variant) => {
    const isVariantAvailable = variant.isInStock;

    variant.attributes.forEach((attribute) => {
      const attributeSlug = attribute.attributeSlug;
      const optionValue = attribute.optionValue;

      if (!optionsMap.has(attributeSlug)) {
        optionsMap.set(attributeSlug, new Map());
      }

      const attributeOptionsMap = optionsMap.get(attributeSlug);

      if (!attributeOptionsMap.has(optionValue)) {
        attributeOptionsMap.set(optionValue, {
          attributeName: attribute.attributeName,
          attributeSlug: attribute.attributeSlug,
          attributeType: attribute.attributeType,
          label: attribute.optionLabel,
          value: attribute.optionValue,
          colorCode: attribute.colorCode,
          isAvailable: false,
        });
      }

      if (isVariantAvailable) {
        attributeOptionsMap.get(optionValue).isAvailable = true;
      }
    });
  });

  const finalOptions = {};

  optionsMap.forEach((optionMap, attributeSlug) => {
    finalOptions[attributeSlug] = Array.from(optionMap.values());
  });

  return finalOptions;
};



/**
 * Format variant for public & admin  response.
 */

const formatVariantForResponse = (variant, options = {}) => {
  const { isAdmin = false } = options;

  const stock = Number(variant.stock || 0);
  const reservedStock = Number(variant.reservedStock || 0);
  const lowStockThreshold = Number(variant.lowStockThreshold || 0);

  const availableStock = variant.trackInventory
    ? Math.max(stock - reservedStock, 0)
    : null;

  const isInStock = variant.trackInventory
    ? availableStock > 0 || variant.allowBackorder
    : true;

  const isLowStock = variant.trackInventory
    ? availableStock > 0 && availableStock <= lowStockThreshold
    : false;

  const finalPrice = variant.discountPrice || variant.price;

  const discountPercentage =
    variant.discountPrice && variant.price
      ? Math.round(
          ((variant.price - variant.discountPrice) / variant.price) * 100
        )
      : 0;

  const formattedVariant = {
    ...variant,
    availableStock,
    isInStock,
    isLowStock,
    finalPrice,
    discountPercentage,
  };

  /**
   * Public users should not see internal stock reservation and cost price.
   */
  if (!isAdmin) {
    delete formattedVariant.reservedStock;
    delete formattedVariant.costPrice;
  }

  return formattedVariant;
};

/**
 * Get product variants
 * Public: only active variants of published/public product
 * Admin: active/inactive/archived variants of any non-deleted product
 */
const getProductVariantsService = async (productId, options = {}) => {
  const { isAdmin = false, queryParams = {} } = options;

  const {
    status,
    isDefault,
    includeDeleted = "false",
  } = queryParams;

  if (!isValidObjectId(productId)) {
    throw new HandleError("Invalid product ID", 400);
  }

  const productQuery = {
    _id: productId,
    isDeleted: false,
  };

  /**
   * Public users should only access published + public products.
   */
  if (!isAdmin) {
    productQuery.status = "published";
    productQuery.visibility = "public";
  }

  const product = await Product.findOne(productQuery)
    .select("_id name slug status visibility price discountPrice currency stock")
    .lean();

  if (!product) {
    throw new HandleError("Product not found", 404);
  }

  const variantQuery = {
    product: productId,
  };

  /**
   * Public users should not see deleted variants.
   * Admin can include deleted variants only if includeDeleted=true.
   */
  if (!isAdmin || includeDeleted !== "true") {
    variantQuery.isDeleted = false;
  }

  /**
   * Public users should only see active variants.
   */
  if (!isAdmin) {
    variantQuery.status = "active";
  }

  /**
   * Admin filters
   */
  if (isAdmin && status) {
    variantQuery.status = status;
  }

  if (isAdmin && isDefault !== undefined) {
    variantQuery.isDefault = isDefault === "true";
  }

  const variants = await ProductVariant.find(variantQuery)
    .select(isAdmin ? "+reservedStock +costPrice" : "+reservedStock")
    .populate("createdBy", "name email")
    .populate("updatedBy", "name email")
    .populate("deletedBy", "name email")
    .sort({ isDefault: -1, status: 1, createdAt: 1 })
    .lean();

  const formattedVariants = variants.map((variant) =>
    formatVariantForResponse(variant, { isAdmin })
  );

  const variantOptions = buildVariantOptions(formattedVariants);

  const defaultVariant =
    formattedVariants.find((variant) => variant.isDefault) ||
    formattedVariants[0] ||
    null;

  return {
    product,
    variants: formattedVariants,
    options: variantOptions,
    defaultVariant,
    count: formattedVariants.length,
  };
};


const getVariantOrThrow = async ({
  productId,
  variantId,
  includeDeleted = false,
  session = null,
}) => {
  if (!isValidObjectId(productId)) {
    throw new HandleError("Invalid product ID", 400);
  }

  if (!isValidObjectId(variantId)) {
    throw new HandleError("Invalid variant ID", 400);
  }

  const query = {
    _id: variantId,
    product: productId,
  };

  if (!includeDeleted) {
    query.isDeleted = false;
  }

  const variantQuery = ProductVariant.findOne(query);

  if (session) {
    variantQuery.session(session);
  }

  const variant = await variantQuery;

  if (!variant) {
    throw new HandleError("Product variant not found", 404);
  }

  return variant;
};

const checkVariantSkuDuplicateForUpdate = async ({
  sku,
  variantId,
  session = null,
}) => {
  const normalizedSku = normalizeSku(sku);

  if (!normalizedSku) {
    throw new HandleError("Variant SKU is required", 400);
  }

  const query = ProductVariant.findOne({
    sku: normalizedSku,
    _id: { $ne: variantId },
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

const checkVariantCombinationDuplicateForUpdate = async ({
  productId,
  variantId,
  optionSignature,
  session = null,
}) => {
  const query = ProductVariant.findOne({
    product: productId,
    optionSignature,
    isDeleted: false,
    _id: { $ne: variantId },
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

const findNextDefaultVariant = async ({ productId, excludeVariantId, session }) => {
  return ProductVariant.findOne({
    product: productId,
    _id: { $ne: excludeVariantId },
    status: "active",
    isDeleted: false,
  })
    .sort({ createdAt: 1 })
    .session(session);
};

const updateProductVariantService = async (
  productId,
  variantId,
  updateData = {},
  adminId
) => {
  const session = await mongoose.startSession();

  try {
    let updatedVariant;

    await session.withTransaction(async () => {
      const product = await getProductOrThrow(productId, session);

      const variant = await getVariantOrThrow({
        productId,
        variantId,
        session,
      });

      /**
       * Update SKU
       */
      if (updateData.sku && updateData.sku !== variant.sku) {
        variant.sku = await checkVariantSkuDuplicateForUpdate({
          sku: updateData.sku,
          variantId: variant._id,
          session,
        });
      }

      /**
       * Update attributes and regenerate optionSignature
       */
      if (Array.isArray(updateData.attributes)) {
        const normalizedAttributes = await normalizeVariantAttributes({
          attributes: updateData.attributes,
          product,
          session,
        });

        const optionSignature = generateOptionSignature(normalizedAttributes);

        await checkVariantCombinationDuplicateForUpdate({
          productId: product._id,
          variantId: variant._id,
          optionSignature,
          session,
        });

        variant.attributes = normalizedAttributes;
        variant.optionSignature = optionSignature;

        /**
         * If title is not manually sent, regenerate title from attributes.
         */
        if (!Object.prototype.hasOwnProperty.call(updateData, "title")) {
          variant.title = normalizedAttributes
            .map((attribute) => attribute.optionLabel)
            .join(" / ");
        }
      }

      /**
       * Update normal fields
       */
      const allowedFields = [
        "title",
        "barcode",
        "price",
        "discountPrice",
        "costPrice",
        "stock",
        "lowStockThreshold",
        "trackInventory",
        "allowBackorder",
        "images",
        "weight",
        "dimensions",
      ];

      allowedFields.forEach((field) => {
        if (Object.prototype.hasOwnProperty.call(updateData, field)) {
          variant[field] = updateData[field];
        }
      });

      /**
       * Validate price and discountPrice after update
       */
      const finalPrice =
        variant.price !== undefined && variant.price !== null
          ? variant.price
          : product.price;

      if (
        variant.discountPrice !== undefined &&
        variant.discountPrice !== null &&
        Number(variant.discountPrice) >= Number(finalPrice)
      ) {
        throw new HandleError(
          "Variant discount price must be less than variant price",
          400
        );
      }

      /**
       * If admin sends isDefault true, make this variant default.
       */
      if (updateData.isDefault === true) {
        if (variant.status !== "active") {
          throw new HandleError("Only active variant can be set as default", 400);
        }

        await ProductVariant.updateMany(
          {
            product: product._id,
            isDefault: true,
            isDeleted: false,
            _id: { $ne: variant._id },
          },
          {
            $set: {
              isDefault: false,
              updatedBy: adminId,
            },
          },
          { session }
        );

        variant.isDefault = true;
      }

      variant.updatedBy = adminId;

      await variant.save({ session });

      updatedVariant = variant;
    });

    return updatedVariant;
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

const softDeleteProductVariantService = async (
  productId,
  variantId,
  adminId
) => {
  const session = await mongoose.startSession();

  try {
    let deletedVariant;

    await session.withTransaction(async () => {
      await getProductOrThrow(productId, session);

      const variant = await getVariantOrThrow({
        productId,
        variantId,
        session,
      });

      const wasDefaultVariant = variant.isDefault;

      /**
       * First remove default and soft delete current variant.
       */
      variant.isDefault = false;
      variant.isDeleted = true;
      variant.deletedAt = new Date();
      variant.deletedBy = adminId;
      variant.updatedBy = adminId;

      await variant.save({ session });

      /**
       * Then assign another active variant as default.
       */
      if (wasDefaultVariant) {
        const nextDefaultVariant = await findNextDefaultVariant({
          productId,
          excludeVariantId: variant._id,
          session,
        });

        if (nextDefaultVariant) {
          nextDefaultVariant.isDefault = true;
          nextDefaultVariant.updatedBy = adminId;
          await nextDefaultVariant.save({ session });
        }
      }

      deletedVariant = variant;
    });

    return deletedVariant;
  } finally {
    await session.endSession();
  }
};

const setDefaultProductVariantService = async (
  productId,
  variantId,
  adminId
) => {
  const session = await mongoose.startSession();

  try {
    let defaultVariant;

    await session.withTransaction(async () => {
      await getProductOrThrow(productId, session);

      const variant = await getVariantOrThrow({
        productId,
        variantId,
        session,
      });

      if (variant.status !== "active") {
        throw new HandleError("Only active variant can be set as default", 400);
      }

      await ProductVariant.updateMany(
        {
          product: productId,
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

      variant.isDefault = true;
      variant.updatedBy = adminId;

      await variant.save({ session });

      defaultVariant = variant;
    });

    return defaultVariant;
  } finally {
    await session.endSession();
  }
};

const updateProductVariantStatusService = async (
  productId,
  variantId,
  status,
  adminId
) => {
  if (!VARIANT_STATUSES.includes(status)) {
    throw new HandleError("Invalid variant status", 400);
  }

  const session = await mongoose.startSession();

  try {
    let updatedVariant;

    await session.withTransaction(async () => {
      await getProductOrThrow(productId, session);

      const variant = await getVariantOrThrow({
        productId,
        variantId,
        session,
      });

      const wasDefaultVariant = variant.isDefault;

      /**
       * First update current variant.
       * This avoids duplicate default variant issue.
       */
      variant.status = status;
      variant.updatedBy = adminId;

      if (wasDefaultVariant && status !== "active") {
        variant.isDefault = false;
      }

      await variant.save({ session });

      /**
       * After current default is removed,
       * assign another active variant as default.
       */
      if (wasDefaultVariant && status !== "active") {
        const nextDefaultVariant = await findNextDefaultVariant({
          productId,
          excludeVariantId: variant._id,
          session,
        });

        if (nextDefaultVariant) {
          nextDefaultVariant.isDefault = true;
          nextDefaultVariant.updatedBy = adminId;
          await nextDefaultVariant.save({ session });
        }
      }

      updatedVariant = await ProductVariant.findById(variant._id)
        .select("+reservedStock +costPrice")
        .session(session);
    });

    return updatedVariant;
  } finally {
    await session.endSession();
  }
};

export {
  createProductVariantService,
  createManyProductVariantsService,
  getProductVariantsService,
  updateProductVariantService,
  softDeleteProductVariantService,
  setDefaultProductVariantService,
  updateProductVariantStatusService,
};

