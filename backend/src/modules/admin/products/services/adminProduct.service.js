
import mongoose from "mongoose";
import HandleError  from '../../../../utils/handleError.js';


import {
  PRODUCT_MODE,
  PRODUCT_STATUS,
  PRODUCT_TYPE,
  PUBLISH_OPTION,
} from "../constants/product.constants.js";

import {
  assertValidObjectId,
  buildProductDocument,
  buildProductVariantDocuments,
} from "../helpers/productPayload.helper.js";

import {
  createProduct,
  createProductVariants,
  findProductByInventorySku,
  findProductBySlug,
  findProductVariantsBySkus,
} from "../repositories/adminProduct.repository.js";

import { mapAdminCreatedProductResponse } from "../mappers/adminProduct.mapper.js";



const assertUniqueVariantSkusInPayload = (variants = []) => {
  const skus = variants.map((variant) => variant.sku).filter(Boolean);
  const uniqueSkus = new Set(skus);

  if (uniqueSkus.size !== skus.length) {
    throw new HandleError("Duplicate variant SKU is not allowed", 409, {
      variants: "Each variant must have a unique SKU",
    });
  }
};

const assertUniqueVariantSignaturesInPayload = (variants = []) => {
  const signatures = variants
    .map((variant) => variant.optionSignature)
    .filter(Boolean);

  const uniqueSignatures = new Set(signatures);

  if (uniqueSignatures.size !== signatures.length) {
    throw new HandleError("Duplicate variant combination is not allowed", 409, {
      variants: "Each variant combination must be unique",
    });
  }
};

const assertPrimaryImageExists = (images = []) => {
  const primaryImages = images.filter((image) => image.isPrimary);

  if (images.length > 0 && primaryImages.length !== 1) {
    throw new HandleError("Exactly one primary image is required", 400, {
      images: "Please select exactly one primary image",
    });
  }
};


const assertPublishRules = (payload) => {
  if (
    payload.mode === PRODUCT_MODE.PUBLISH &&
    payload.publishing.publishOption === PUBLISH_OPTION.SCHEDULE_PUBLISH
  ) {
    if (!payload.publishing.scheduleDate || !payload.publishing.scheduleTime) {
      throw new HandleError("Schedule date and time are required", 400, {
        schedule: "Please select schedule date and time",
      });
    }
  }

  if (
    payload.mode === PRODUCT_MODE.PUBLISH &&
    payload.publishing.publishOption === PUBLISH_OPTION.PUBLISH_NOW &&
    payload.publishing.status !== PRODUCT_STATUS.ACTIVE
  ) {
    throw new HandleError("Published product must be active", 400, {
      status: "Set product status as active before publishing",
    });
  }
};

const assertVariableProductRules = (payload) => {
  if (payload.basicInformation.productType !== PRODUCT_TYPE.VARIABLE) {
    return;
  }

  const attributes = payload.attributesAndVariations?.attributes || [];
  const variants = payload.attributesAndVariations?.variants || [];

  if (!attributes.length) {
    throw new HandleError("Variable product must have attributes", 400, {
      attributes: "Please select at least one attribute",
    });
  }

  if (!variants.length) {
    throw new HandleError("Variable product must have variants", 400, {
      variants: "Please generate or add at least one variant",
    });
  }
};

const assertProductReferences = (payload) => {
  assertValidObjectId(
    payload.basicInformation.category,
    "category",
    "Invalid category id"
  );

  if (payload.basicInformation.subCategory) {
    assertValidObjectId(
      payload.basicInformation.subCategory,
      "subCategory",
      "Invalid sub category id"
    );
  }

  assertValidObjectId(
    payload.basicInformation.brand,
    "brand",
    "Invalid brand id"
  );
};

const assertNoExistingProductConflict = async ({ productData, session }) => {
  const existingSlug = await findProductBySlug({
    slug: productData.slug,
    session,
  });

  if (existingSlug) {
    throw new HandleError("Product slug already exists", 409, {
      name: "Product with this name already exists",
    });
  }

  const existingSku = await findProductByInventorySku({
    sku: productData.inventory.sku,
    session,
  });

  if (existingSku) {
    throw new HandleError("Product SKU already exists", 409, {
      sku: "This SKU is already used by another product",
    });
  }
};

const assertNoExistingVariantSkuConflict = async ({ variantsData, session }) => {
  const skus = variantsData.map((variant) => variant.sku).filter(Boolean);

  if (!skus.length) return;

  const existingVariants = await findProductVariantsBySkus({
    skus,
    session,
  });

  if (existingVariants.length > 0) {
    throw new HandleError("Variant SKU already exists", 409, {
      variants: `These variant SKUs already exist: ${existingVariants
        .map((variant) => variant.sku)
        .join(", ")}`,
    });
  }
};

const handleDuplicateKeyError = (error) => {
  if (error?.code !== 11000) {
    return null;
  }

  const keyPattern = error.keyPattern || {};

  if (keyPattern.slug) {
    return new HandleError("Product slug already exists", 409, {
      name: "Product with this name already exists",
    });
  }

  if (keyPattern["inventory.sku"]) {
    return new HandleError("Product SKU already exists", 409, {
      sku: "This SKU is already used by another product",
    });
  }

  if (keyPattern.sku) {
    return new HandleError("Variant SKU already exists", 409, {
      variants: "One or more variant SKUs already exist",
    });
  }

  if (keyPattern.product && keyPattern.optionSignature) {
    return new HandleError("Duplicate variant combination", 409, {
      variants: "Duplicate variant combination is not allowed",
    });
  }

  return new HandleError("Duplicate value found", 409, {
    duplicate: "Duplicate value found",
  });
};

export const createAdminProductService = async ({ payload, adminId }) => {
  const session = await mongoose.startSession();

  try {
    let createdProduct;
    let createdVariants = [];

    await session.withTransaction(async () => {
      assertProductReferences(payload);
      assertPrimaryImageExists(payload.media.images);
      assertPublishRules(payload);
      assertVariableProductRules(payload);

      const productData = buildProductDocument({
        payload,
        adminId,
      });

      await assertNoExistingProductConflict({
        productData,
        session,
      });

      createdProduct = await createProduct({
        productData,
        session,
      });

      const variantsData = buildProductVariantDocuments({
        payload,
        product: productData,
        productId: createdProduct._id,
        adminId,
      });

      assertUniqueVariantSkusInPayload(variantsData);
      assertUniqueVariantSignaturesInPayload(variantsData);

      await assertNoExistingVariantSkuConflict({
        variantsData,
        session,
      });

      createdVariants = await createProductVariants({
        variantsData,
        session,
      });
    });

    return mapAdminCreatedProductResponse({
      product: createdProduct,
      variants: createdVariants,
    });
  } catch (error) {
    const duplicateError = handleDuplicateKeyError(error);

    if (duplicateError) {
      throw duplicateError;
    }

    throw error;
  } finally {
    session.endSession();
  }
};