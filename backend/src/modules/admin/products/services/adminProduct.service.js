import mongoose from "mongoose";
import HandleError from "../../../../utils/handleError.js";

import {
  extractProductImagePublicIds,
  buildProductImageUpdatePlan,
  deleteRemovedPermanentProductImages,
  makeProductImagesPermanent,
  rollbackPermanentProductImages,
  verifyTemporaryProductImages,
} from "./productCloudinaryAsset.service.js";

import {
  PRODUCT_MODE,
  PRODUCT_STATUS,
  PRODUCT_TYPE,
  PUBLISH_OPTION,
} from "../constants/product.constants.js";

import {} from "../constants/productImage.constants.js";

import {
  assertValidObjectId,
  buildProductDocument,
  buildProductVariantDocuments,
  buildProductUpdateDocument,
  buildProductVariantUpdateDocuments,
} from "../helpers/productPayload.helper.js";

import {
  createProduct,
  createProductVariants,
  findAdminProducts,
  findProductByInventorySku,
  findProductBySlug,
  findProductVariantsBySkus,
  findAdminProductById,
  findAdminProductVariantsByProductId,
  findProductById,
  findProductBySlugExceptId,
  findProductByInventorySkuExceptId,
  findVariantSkusExceptProduct,
  updateProductById,
  replaceProductVariants,
} from "../repositories/adminProduct.repository.js";

import {
  mapAdminCreatedProductResponse,
   mapAdminProductListResponse ,
   mapAdminProductDetailResponse,
   mapAdminUpdatedProductResponse,
   
  } from "../mappers/adminProduct.mapper.js";
import { uploadTemporaryImage } from "../../../../utils/cloudinary/uploadTemporaryImage.js";
import { PRODUCT_IMAGE_CONFIG } from "../constants/productImage.constants.js";
import { verifyTemporaryCloudinaryAsset } from "../../../../utils/cloudinary/cloudinaryTemporaryAsset.js";
import { isCloudinaryResourceNotFound } from "../../../../utils/cloudinary/cloudinaryError.js";
import { deleteCloudinaryAssets } from "../../../../utils/cloudinary/cloudinaryDelete.js";

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
    "Invalid Category",
  );

  if (payload.basicInformation.subCategory) {
    assertValidObjectId(
      payload.basicInformation.subCategory,
      "subCategory",
      "Invalid sub category",
    );
  }

  assertValidObjectId(payload.basicInformation.brand, "brand", "Invalid Brand");
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

const assertNoExistingVariantSkuConflict = async ({
  variantsData,
  session,
}) => {
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
    return new HandleError("Variant SKU already exists @@@", 409, {
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

  const productId = new mongoose.Types.ObjectId();
  let madePermanentPublicIds = [];

  try {
    assertProductReferences(payload);
    assertPrimaryImageExists(payload.media.images);
    assertPublishRules(payload);
    assertVariableProductRules(payload);

    const productData = buildProductDocument({
      payload,
      adminId,
      productId,
    });

    await assertNoExistingProductConflict({
      productData,
      session: null,
    });

    const variantsData = buildProductVariantDocuments({
      payload,
      product: productData,
      productId,
      adminId,
    });

    assertUniqueVariantSkusInPayload(variantsData);
    assertUniqueVariantSignaturesInPayload(variantsData);

    await assertNoExistingVariantSkuConflict({
      variantsData,
      session: null,
    });

    const imagePublicIds = extractProductImagePublicIds(payload);

    await verifyTemporaryProductImages({
      publicIds: imagePublicIds,
      adminId,
    });

    madePermanentPublicIds = await makeProductImagesPermanent({
      publicIds: imagePublicIds,
      adminId,
      productId,
    });

    let createdProduct;
    let createdVariants = [];

    await session.withTransaction(async () => {
      createdProduct = await createProduct({
        productData,
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

    if (madePermanentPublicIds.length > 0) {
      await rollbackPermanentProductImages(madePermanentPublicIds);
    }

    if (duplicateError) {
      throw duplicateError;
    }

    throw error;
  } finally {
    session.endSession();
  }
};

const normalizeUploadedImageResponse = ({ uploadedImage, index }) => {
  return {
    imageId: uploadedImage.publicId,
    publicId: uploadedImage.publicId,
    url: uploadedImage.url,
    altText: "",
    isPrimary: index === 0,
    sortOrder: index + 1,
  };
};

export const uploadTemporaryProductImagesService = async ({
  files,
  userId,
}) => {
  const uploadedImages = await Promise.all(
    files.map(async (file, index) => {
      const uploadedImage = await uploadTemporaryImage({
        file,
        ownerId: userId,
        config: PRODUCT_IMAGE_CONFIG,
      });

      return normalizeUploadedImageResponse({
        uploadedImage,
        index,
      });
    }),
  );

  return uploadedImages;
};

export const deleteTemporaryProductImagesService = async ({
  userId,
  publicIds,
}) => {
  if (!Array.isArray(publicIds) || publicIds.length === 0) {
    throw new HandleError("publicIds must be an array", 400, {
      publicIds: "Please provide an array of image publicIds",
    });
  }
  const uniquePublicIds = [...new Set(publicIds)];

  const verifiedPublicIds = [];
  const notFoundPublicIds = [];

  for (const publicId of uniquePublicIds) {
    try {
      await verifyTemporaryCloudinaryAsset({
        publicId,
        ownerId: userId,
        requiredTags: ["product-image"],
        temporaryTag: "temporary",
        resourceType: "image",
      });

      verifiedPublicIds.push(publicId);
    } catch (error) {
      if (isCloudinaryResourceNotFound(error)) {
        notFoundPublicIds.push(publicId);
        continue;
      }

      throw error;
    }
  }

  let cloudinaryResult = null;

  if (verifiedPublicIds.length > 0) {
    cloudinaryResult = await deleteCloudinaryAssets({
      publicIds: verifiedPublicIds,
      resourceType: "image",
    });
  }

  return {
    requestedCount: uniquePublicIds.length,
    deletedCount: verifiedPublicIds.length,
    deletedPublicIds: verifiedPublicIds,
    notFoundPublicIds,
    cloudinaryResult,
  };
};


export const getAdminProductsService = async (query) => {
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 10);

  const { products, totalProducts } = await findAdminProducts({
    ...query,
    page,
    limit,
  });

  return mapAdminProductListResponse({
    products,
    totalProducts,
    page,
    limit,
  });
};

/**
 * Single Product View  & ProductVariants by ProductId Service
 */

export const getAdminProductDetailService = async (productId) => {
  const product = await findAdminProductById(productId);

  if (!product) {
    throw new HandleError("Product not found", 404, {
      productId: "Product does not exist",
    });
  }

  const variants = await findAdminProductVariantsByProductId(productId);

  return mapAdminProductDetailResponse({
    product,
    variants,
  });
};

export const updateAdminProductService = async ({
  productId,
  payload,
  adminId,
}) => {
  const session = await mongoose.startSession();

  let madePermanentPublicIds = [];
  let removedPermanentPublicIds = [];

  try {
    const existingProduct = await findProductById(productId);


    if (!existingProduct) {
      throw new HandleError("Product not found", 404, {
        productId: "Product does not exist",
      });
    }

    const existingVariants = await findAdminProductVariantsByProductId(productId);

    const imageUpdatePlan = buildProductImageUpdatePlan({
      existingProduct,
      existingVariants,
      payload,
    });

    if (imageUpdatePlan.suspiciousNewPublicIds.length > 0) {
      throw new HandleError("Invalid image update", 400, {
        images:
          "New images must be uploaded as temporary images before updating product",
      });
    }

    await verifyTemporaryProductImages({
      publicIds: imageUpdatePlan.newTemporaryPublicIds,
      adminId,
      required: false,
    });

    madePermanentPublicIds = await makeProductImagesPermanent({
      publicIds: imageUpdatePlan.newTemporaryPublicIds,
      adminId,
      productId,
    });

    removedPermanentPublicIds = imageUpdatePlan.removedPermanentPublicIds;

    const productUpdateData = buildProductUpdateDocument({
      payload,
      adminId,
      productId,
    });

    const existingSlug = await findProductBySlugExceptId({
      slug: productUpdateData.slug,
      productId,
    });

    if (existingSlug) {
      throw new HandleError("Product slug already exists", 409, {
        productName: "A product with this name already exists",
      });
    }

    const existingSku = await findProductByInventorySkuExceptId({
      sku: productUpdateData.inventory?.sku,
      productId,
    });

    if (existingSku) {
      throw new HandleError("Product SKU already exists", 409, {
        sku: "This product SKU is already used",
      });
    }

    const variantsData = buildProductVariantDocuments({
      payload,
      product: productUpdateData,
      productId,
      adminId,
    });

    const variantSkus = variantsData
      .map((variant) => variant.sku)
      .filter(Boolean);

    const uniqueVariantSkus = new Set(variantSkus);

    if (variantSkus.length !== uniqueVariantSkus.size) {
      throw new HandleError("Duplicate variant SKU", 400, {
        variants: "Variant SKUs must be unique",
      });
    }

    const externalVariantSkuConflicts = await findVariantSkusExceptProduct({
      skus: variantSkus,
      productId,
    });

    if (externalVariantSkuConflicts.length > 0) {
      throw new HandleError("Variant SKU already exists", 409, {
        variants: `Variant SKU already exists: ${externalVariantSkuConflicts[0].sku}`,
      });
    }

    let updatedProduct;
    let updatedVariants = [];

    await session.withTransaction(async () => {
      updatedProduct = await updateProductById({
        productId,
        update: productUpdateData,
        session,
      });

      updatedVariants = await replaceProductVariants({
        productId,
        variantsData,
        session,
      });
    });

    await deleteRemovedPermanentProductImages(removedPermanentPublicIds);

    return mapAdminUpdatedProductResponse({
      product: updatedProduct,
      variants: updatedVariants,
    });
  } catch (error) {
    if (madePermanentPublicIds.length > 0) {
      await rollbackPermanentProductImages(madePermanentPublicIds);
    }

    if (error?.code === 11000) {
      throw new HandleError("Duplicate product data", 409, {
        product: "Product with same unique field already exists",
      });
    }

    throw error;
  } finally {
    session.endSession();
  }
};
