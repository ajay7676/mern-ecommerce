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
  buildProductVariantPersistencePlan,
  preserveSimpleDefaultVariantId,
} from "../helpers/productVariantPersistence.helper.js";

import {
  findProductVariantsByProductId,
  persistProductVariantPlan,
  deleteProductById,
  deleteProductVariantsByProductId,
} from "../repositories/adminProduct.repository.js";

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
  mapAdminProductListResponse,
  mapAdminProductDetailResponse,
  mapAdminUpdatedProductResponse,
} from "../mappers/adminProduct.mapper.js";
import { uploadTemporaryImage } from "../../../../utils/cloudinary/uploadTemporaryImage.js";
import { PRODUCT_IMAGE_CONFIG } from "../constants/productImage.constants.js";
import { verifyTemporaryCloudinaryAsset } from "../../../../utils/cloudinary/cloudinaryTemporaryAsset.js";
import { isCloudinaryResourceNotFound } from "../../../../utils/cloudinary/cloudinaryError.js";
import { deleteCloudinaryAssets } from "../../../../utils/cloudinary/cloudinaryDelete.js";
import { validateProductVariantUpdateIntegrity } from "./productVariantIntegrity.service.js";
import { collectProductAssetPublicIds } from "../helpers/productImageAsset.helper.js";

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
  /**
   * Newly promoted Cloudinary images.
   *
   * If DB transaction fails,
   * these need rollback.
   */
  let madePermanentPublicIds = [];

  /**
   * Old permanent images removed from
   * the new product payload.
   *
   * Delete only AFTER DB commit.
   */
  let removedPermanentPublicIds = [];

  /**
   * Very important.
   *
   * Once MongoDB transaction commits,
   * we must NEVER rollback the newly
   * permanent images.
   */
  let transactionCommitted = false;

  let session = null;

  try {
    /**
     * =================================================
     * 1. LOAD EXISTING PRODUCT
     * =================================================
     */

    const existingProduct = await findProductById(productId);

    if (!existingProduct) {
      throw new HandleError("Product not found", 404, {
        productId: "Product does not exist",
      });
    }

    /**
     * =================================================
     * 2. LOAD EXISTING VARIANTS
     * =================================================
     *
     * These variants are trusted DB data.
     *
     * We need them for:
     *
     * variantId ownership
     * permanent image ownership
     * differential update
     */

    const existingVariants = await findProductVariantsByProductId({
      productId,
    });

    /**
     * =================================================
     * 3. GET INCOMING ATTRIBUTE + VARIANT DATA
     * =================================================
     */

    const incomingAttributes =
      payload.attributesAndVariations?.attributes || [];

    const incomingVariants = payload.attributesAndVariations?.variants || [];

    /**
     * Product type can come from update payload.
     *
     * If missing, fall back to current DB product.
     */
    const productType = payload.productType || existingProduct.productType;

    /**
     * =================================================
     * 4. VALIDATE VARIANT INTEGRITY
     * =================================================
     *
     * Checks:
     *
     * variantId belongs to product
     * duplicate variantId
     * attribute exists
     * option exists
     * complete combination
     * duplicate SKU
     * duplicate combination
     * blob/data URL
     *
     * Also creates trusted canonical optionSignature.
     */

    const variantIntegrity = await validateProductVariantUpdateIntegrity({
      variants: incomingVariants,

      attributes: incomingAttributes,

      existingVariants,

      product: existingProduct,

      productType,
    });

    /**
     * =================================================
     * 5. BUILD TRUSTED PAYLOAD
     * =================================================
     *
     * Replace raw frontend variants with
     * backend-validated variants.
     *
     * Particularly important for:
     *
     * optionSignature
     */

    const validatedPayload = {
      ...payload,

      attributesAndVariations: {
        ...payload.attributesAndVariations,

        variants: variantIntegrity.variants,
      },
    };

    /**
     * =================================================
     * 6. BUILD IMAGE UPDATE PLAN
     * =================================================
     *
     * This MUST use validated payload.
     *
     * Image plan should include:
     *
     * product images
     * variant.image
     * variant.images
     */

    const imageUpdatePlan = buildProductImageUpdatePlan({
      existingProduct,
      existingVariants,

      payload: validatedPayload,
    });

    /**
     * An unknown publicId that is neither:
     *
     * existing permanent image
     * nor new temporary image
     *
     * is suspicious.
     */

    if (imageUpdatePlan.suspiciousNewPublicIds.length > 0) {
      throw new HandleError("Invalid image update", 400, {
        images:
          "New images must be uploaded as temporary images before updating product",
      });
    }

    /**
     * =================================================
     * 7. VERIFY NEW TEMP IMAGES
     * =================================================
     *
     * Reuse YOUR existing function.
     *
     * No getCloudinaryImageResource() needed here.
     *
     * This function should validate:
     *
     * resource exists
     * product-image tag
     * temporary tag
     * uploaded_by === adminId
     * asset_state === temporary
     */

    await verifyTemporaryProductImages({
      publicIds: imageUpdatePlan.newTemporaryPublicIds,

      adminId,

      required: false,
    });

    /**
     * Remember old images that will become unused.
     *
     * DO NOT delete them yet.
     */
    removedPermanentPublicIds = imageUpdatePlan.removedPermanentPublicIds;

    /**
     * =================================================
     * 8. BUILD PRODUCT UPDATE DATA
     * =================================================
     */

    const productUpdateData = buildProductUpdateDocument({
      payload: validatedPayload,

      adminId,
      productId,
    });

    /**
     * =================================================
     * 9. PRODUCT SLUG VALIDATION
     * =================================================
     */

    const existingSlug = await findProductBySlugExceptId({
      slug: productUpdateData.slug,

      productId,
    });

    if (existingSlug) {
      throw new HandleError("Product slug already exists", 409, {
        productName: "A product with this name already exists",
      });
    }

    /**
     * =================================================
     * 10. BASE PRODUCT SKU VALIDATION
     * =================================================
     */

    const inventorySku = productUpdateData.inventory?.sku;

    if (inventorySku) {
      const existingSku = await findProductByInventorySkuExceptId({
        sku: inventorySku,

        productId,
      });

      if (existingSku) {
        throw new HandleError("Product SKU already exists", 409, {
          sku: "This product SKU is already used",
        });
      }
    }

    /**
     * =================================================
     * 11. BUILD VARIANT UPDATE DOCUMENTS
     * =================================================
     *
     * IMPORTANT:
     *
     * Use buildProductVariantUpdateDocuments,
     * NOT buildProductVariantDocuments.
     */

    const variantsData = buildProductVariantUpdateDocuments({
      payload: validatedPayload,

      product: productUpdateData,

      productId,

      adminId,
    });

    /**
     * =================================================
     * 12. VARIANT SKU CONFLICT WITH OTHER PRODUCTS
     * =================================================
     *
     * Duplicate SKU inside this payload has already
     * been checked by integrity validation.
     *
     * Now check against OTHER products.
     */

    const variantSkus = variantsData
      .map((variant) => variant.sku)
      .filter(Boolean);

    if (variantSkus.length > 0) {
      const externalVariantSkuConflicts = await findVariantSkusExceptProduct({
        skus: variantSkus,

        productId,
      });

      if (externalVariantSkuConflicts.length > 0) {
        throw new HandleError("Variant SKU already exists", 409, {
          variants: `Variant SKU already exists: ${externalVariantSkuConflicts[0].sku}`,
        });
      }
    }

    /**
     * =================================================
     * 13. PROMOTE NEW TEMP IMAGES
     * =================================================
     *
     * Do this AFTER all normal validation.
     *
     * Why?
     *
     * If slug/SKU/variant validation fails,
     * we don't unnecessarily change Cloudinary.
     *
     * If DB fails AFTER promotion,
     * catch() rolls them back.
     */

    if (imageUpdatePlan.newTemporaryPublicIds.length > 0) {
      madePermanentPublicIds = await makeProductImagesPermanent({
        publicIds: imageUpdatePlan.newTemporaryPublicIds,

        adminId,
        productId,
      });
    }

    /**
     * =================================================
     * 14. START SESSION ONLY WHEN READY TO WRITE
     * =================================================
     */

    session = await mongoose.startSession();

    let updatedProduct = null;
    let updatedVariants = [];

    /**
     * =================================================
     * 15. DATABASE TRANSACTION
     * =================================================
     */

    await session.withTransaction(async () => {
      /**
       * Re-read variants inside transaction.
       *
       * Important because validation happened
       * before transaction and DB could theoretically
       * change meanwhile.
       */

      const currentDbVariants = await findProductVariantsByProductId({
        productId,
        session,
      });

      /**
       * ---------------------------------------------
       * SIMPLE PRODUCT
       * ---------------------------------------------
       *
       * If simple products use an internal default
       * ProductVariant, preserve its MongoDB ID.
       */

      const normalizedVariantsData = preserveSimpleDefaultVariantId({
        productType: productUpdateData.productType,

        existingVariants: currentDbVariants,

        incomingVariants: variantsData,
      });

      /**
       * ---------------------------------------------
       * CREATE DIFFERENTIAL VARIANT PLAN
       * ---------------------------------------------
       *
       * Existing _id:
       * → UPDATE
       *
       * No _id:
       * → CREATE
       *
       * DB variant absent from incoming:
       * → DELETE
       */

      const variantPlan = buildProductVariantPersistencePlan({
        productId,

        existingVariants: currentDbVariants,

        incomingVariants: normalizedVariantsData,
      });

      console.log("Variant persistence plan:", variantPlan.report);

      /**
       * ---------------------------------------------
       * UPDATE MAIN PRODUCT
       * ---------------------------------------------
       */

      updatedProduct = await updateProductById({
        productId,

        update: productUpdateData,

        session,
      });

      if (!updatedProduct) {
        throw new HandleError("Product update failed", 500);
      }

      /**
       * ---------------------------------------------
       * UPDATE / CREATE / DELETE VARIANTS
       * ---------------------------------------------
       */

      updatedVariants = await persistProductVariantPlan({
        productId,

        ...variantPlan,

        session,
      });
    });

    /**
     * MongoDB has successfully committed.
     *
     * This changes catch() behavior.
     */
    transactionCommitted = true;

    /**
     * =================================================
     * 16. DELETE REMOVED OLD PERMANENT IMAGES
     * =================================================
     *
     * IMPORTANT:
     *
     * Only after DB transaction succeeds.
     *
     * If cleanup fails now, DO NOT rollback
     * the newly permanent images because DB
     * already references them.
     */

    if (removedPermanentPublicIds.length > 0) {
      try {
        await deleteRemovedPermanentProductImages(removedPermanentPublicIds);
      } catch (cleanupError) {
        /**
         * Product update already succeeded.
         *
         * Therefore don't fail/rollback database state.
         *
         * Later you can add:
         *
         * cleanup queue
         * cron cleanup
         * retry job
         */

        console.error("Old product image cleanup failed:", cleanupError);
      }
    }

    /**
     * =================================================
     * 17. RETURN UPDATED PRODUCT
     * =================================================
     */

    return mapAdminUpdatedProductResponse({
      product: updatedProduct,

      variants: updatedVariants,
    });
  } catch (error) {
    /**
     * =================================================
     * CLOUDINARY ROLLBACK
     * =================================================
     *
     * Rollback newly promoted images ONLY when
     * MongoDB transaction has NOT committed.
     *
     * This condition is very important.
     */

    if (!transactionCommitted && madePermanentPublicIds.length > 0) {
      try {
        await rollbackPermanentProductImages(madePermanentPublicIds);
      } catch (rollbackError) {
        console.error("Product image rollback failed:", rollbackError);
      }
    }

    /**
     * Mongo duplicate key fallback.
     */
    if (error?.code === 11000) {
      const duplicateField = Object.keys(error.keyPattern || {})[0];

      if (duplicateField === "sku") {
        throw new HandleError("Duplicate SKU", 409, {
          sku: "This SKU is already in use",
        });
      }

      if (duplicateField === "optionSignature") {
        throw new HandleError("Duplicate variant combination", 409, {
          variants: "This variant combination already exists",
        });
      }

      if (duplicateField === "slug") {
        throw new HandleError("Product slug already exists", 409, {
          productName: "A product with this name already exists",
        });
      }

      throw new HandleError("Duplicate product data", 409, {
        product: "Product with the same unique field already exists",
      });
    }

    throw error;
  } finally {
    /**
     * Session only exists after all validation
     * and Cloudinary promotion succeed.
     */

    if (session) {
      await session.endSession();
    }
  }
};

export const deleteAdminProductService =
  async ({
    productId,
    adminId,
  }) => {
    let session = null;

    /**
     * Cloudinary assets to delete only
     * AFTER DB transaction succeeds.
     */
    let assetPublicIds = [];

    try {
      /**
       * --------------------------------------
       * 1. FIND PRODUCT
       * --------------------------------------
       */

      const product =
        await findProductById(
          productId,
        );

      if (!product) {
        throw new HandleError(
          "Product not found",
          404,
          {
            productId:
              "Product does not exist",
          },
        );
      }

      /**
       * --------------------------------------
       * 2. FIND VARIANTS
       * --------------------------------------
       */

      const variants =
        await findProductVariantsByProductId({
          productId,
        });

      /**
       * --------------------------------------
       * 3. COLLECT CLOUDINARY ASSETS
       * --------------------------------------
       *
       * Don't delete them yet.
       */

      assetPublicIds =
        collectProductAssetPublicIds({
          product,
          variants,
        });

      /**
       * --------------------------------------
       * 4. START TRANSACTION
       * --------------------------------------
       */

      session =
        await mongoose.startSession();

      await session.withTransaction(
        async () => {
          /**
           * Delete variants first.
           */
          await deleteProductVariantsByProductId({
            productId,
            session,
          });

          /**
           * Delete main product.
           */
          const deletedProduct =
            await deleteProductById({
              productId,
              session,
            });

          if (!deletedProduct) {
            throw new HandleError(
              "Product deletion failed",
              500,
            );
          }
        },
      );

      /**
       * --------------------------------------
       * 5. DB COMMITTED
       * --------------------------------------
       *
       * Now it is safe to delete external assets.
       */

      if (
        assetPublicIds.length >
        0
      ) {
        try {
          await deleteRemovedPermanentProductImages(
            assetPublicIds,
          );
        } catch (cleanupError) {
          /**
           * Do not rollback DB deletion now.
           *
           * DB already committed.
           *
           * Log / retry orphan asset cleanup later.
           */
          console.error(
            "Deleted product Cloudinary cleanup failed:",
            cleanupError,
          );
        }
      }

      return {
        id:
          String(productId),

        deletedVariantCount:
          variants.length,

        deletedAssetCount:
          assetPublicIds.length,
      };
    } finally {
      if (session) {
        await session.endSession();
      }
    }
  };
