
import HandleError from '../../../../utils/handleError.js';
import { PRODUCT_IMAGE_CONFIG } from "../constants/productImage.constants.js";

import { getCloudinaryAsset } from '../../../../utils/cloudinary/cloudinaryAsset.js'
import { makeCloudinaryAssetPermanent } from '../../../../utils/cloudinary/makeAssetPermanent.js'
import { safeDeleteCloudinaryAsset } from '../../../../utils/cloudinary/safeDeleteCloudinaryAsset.js'
import { collectExistingImageItems, collectIncomingImageItems, isTemporaryImage, uniquePublicIds } from '../helpers/productImageUpdatePlan.helper.js';


const getAssetOwnerId = (asset) => {
  return (
    asset?.context?.custom?.[PRODUCT_IMAGE_CONFIG.ownerContextKey] ||
    asset?.context?.[PRODUCT_IMAGE_CONFIG.ownerContextKey]
  );
};

const getImagePublicId = (image) => {
  return image?.publicId || image?.imageId || null;
};


const getVariantImagePublicIds = (
  variant = {},
) => {
  const mainImagePublicId =
    getImagePublicId(
      variant.image,
    );

  const extraImagePublicIds =
    (
      variant.images || []
    )
      .map(getImagePublicId)
      .filter(Boolean);

  return [
    mainImagePublicId,
    ...extraImagePublicIds,
  ].filter(Boolean);
};

export const getUniquePublicIds = (publicIds = []) => {
  return [...new Set(publicIds.filter(Boolean))];
};

export const extractProductImagePublicIds = (payload) => {
  const productImagePublicIds = (payload.media?.images || [])
    .map((image) => image.publicId)
    .filter(Boolean);

  const variantImagePublicIds = (payload.attributesAndVariations?.variants || [])
    .flatMap((variant) => {
      const mainImagePublicId = variant.image?.publicId;

      const extraImagePublicIds = (variant.images || [])
        .map((image) => image.publicId)
        .filter(Boolean);

      return [mainImagePublicId, ...extraImagePublicIds].filter(Boolean);
    });

  return [...new Set([...productImagePublicIds, ...variantImagePublicIds])];
};

export const extractProductImagePublicIdsFromPayload = (payload) => {
  const productImagePublicIds = (payload.media?.images || [])
    .map(getImagePublicId)
    .filter(Boolean);

  const variantImagePublicIds = (payload.attributesAndVariations?.variants || [])
    .flatMap(getVariantImagePublicIds);

  return getUniquePublicIds([...productImagePublicIds, ...variantImagePublicIds]);
};

export const extractProductImageItemsFromPayload =
  (payload) => {
    const productImages =
      (
        payload.media?.images ||
        []
      ).map((image) => ({
        ...image,
        usage: "product",
      }));

    const variantImages =
      (
        payload
          .attributesAndVariations
          ?.variants || []
      ).flatMap((variant) => {
        const mainImage =
          variant.image?.publicId
            ? [
                {
                  ...variant.image,
                  usage:
                    "variant-main",
                },
              ]
            : [];

        const extraImages =
          (
            variant.images || []
          ).map((image) => ({
            ...image,
            usage:
              "variant-extra",
          }));

        return [
          ...mainImage,
          ...extraImages,
        ];
      });

    return [
      ...productImages,
      ...variantImages,
    ];
  };

export const extractExistingProductImagePublicIds =
  ({
    product,
    variants = [],
  }) => {
    const productImagePublicIds =
      (
        product.images || []
      )
        .map(getImagePublicId)
        .filter(Boolean);

    const variantImagePublicIds =
      variants.flatMap(
        getVariantImagePublicIds,
      );

    return getUniquePublicIds([
      ...productImagePublicIds,
      ...variantImagePublicIds,
    ]);
  };

export const verifyTemporaryProductImages = async ({
  publicIds,
  adminId,
  required = true,
}) => {
  if (!publicIds.length) {
    if (!required) return;

    throw new HandleError("Product image is required", 400, {
      images: "Please upload at least one product image",
    });
  }

  for (const publicId of publicIds) {
    const asset = await getCloudinaryAsset({
      publicId,
      resourceType: "image",
      tags: true,
      context: true,
    });

    const tags = asset?.tags || [];
    const uploadedBy = getAssetOwnerId(asset);

    if (!tags.includes(PRODUCT_IMAGE_CONFIG.moduleTag)) {
      throw new HandleError("Invalid product image", 400, {
        images: "Image does not belong to product module",
      });
    }

    if (!tags.includes(PRODUCT_IMAGE_CONFIG.temporaryTag)) {
      throw new HandleError("Invalid image state", 400, {
        images: "New image must be temporary before update",
      });
    }

    if (String(uploadedBy) !== String(adminId)) {
      throw new HandleError("Image ownership mismatch", 403, {
        images: "You are not allowed to use this image",
      });
    }
  }
};

export const makeProductImagesPermanent = async ({
  publicIds,
  adminId,
  productId,
}) => {
  const permanentPublicIds = [];

  for (const publicId of publicIds) {
    await makeCloudinaryAssetPermanent({
      publicId,
      resourceType: "image",

      addTags: [
        PRODUCT_IMAGE_CONFIG.moduleTag,
        PRODUCT_IMAGE_CONFIG.permanentTag,
      ],

      removeTags: [PRODUCT_IMAGE_CONFIG.temporaryTag],

      context: {
        [PRODUCT_IMAGE_CONFIG.ownerContextKey]: String(adminId),
        [PRODUCT_IMAGE_CONFIG.productContextKey]: String(productId),
        [PRODUCT_IMAGE_CONFIG.moduleContextKey]: "admin-product",
      },
    });

    permanentPublicIds.push(publicId);
  }

  return permanentPublicIds;
};

export const rollbackPermanentProductImages = async (publicIds = []) => {
  await Promise.allSettled(
    publicIds.map((publicId) =>
      safeDeleteCloudinaryAsset({
        publicId,
        resourceType: "image",
      })
    )
  );
};

export const deleteRemovedPermanentProductImages = async (publicIds = []) => {
  if (!publicIds.length) return;

  await Promise.allSettled(
    publicIds.map((publicId) =>
      safeDeleteCloudinaryAsset({
        publicId,
        resourceType: "image",
      })
    )
  );
};

export const buildProductImageUpdatePlan = ({
  existingProduct,
  existingVariants = [],
  payload,
}) => {
  /**
   * ================================================
   * 1. COLLECT TRUSTED OLD DB IMAGES
   * ================================================
   */

  const existingItems =
    collectExistingImageItems({
      existingProduct,
      existingVariants,
    });

  const oldPermanentPublicIds =
    uniquePublicIds(
      existingItems.map(
        (item) =>
          item.publicId,
      ),
    );

  /**
   * ================================================
   * 2. COLLECT INCOMING IMAGE REFERENCES
   * ================================================
   */

  const incomingItems =
    collectIncomingImageItems(
      payload,
    );

  const nextPublicIds =
    uniquePublicIds( 
      incomingItems.map(
        (item) =>
          item.publicId,
      ),
    );

  /**
   * Faster membership checks.
   */

  const oldPublicIdSet =
    new Set(
      oldPermanentPublicIds,
    );

  const nextPublicIdSet =
    new Set(
      nextPublicIds,
    );

  /**
   * ================================================
   * 3. NEW PUBLIC IDS
   * ================================================
   *
   * These are present in incoming payload
   * but do not exist in current product DB state.
   */

  const newPublicIds =
    nextPublicIds.filter(
      (publicId) =>
        !oldPublicIdSet.has(
          publicId,
        ),
    );

  /**
   * ================================================
   * 4. CLASSIFY NEW IMAGES
   * ================================================
   *
   * Same publicId may appear in multiple places.
   *
   * If ANY incoming reference marks it temporary,
   * treat it as a temporary candidate.
   */

  const newTemporaryPublicIds =
    [];

  const suspiciousNewPublicIds =
    [];

  for (
    const publicId of
    newPublicIds
  ) {
    const matchingItems =
      incomingItems.filter(
        (item) =>
          item.publicId ===
          publicId,
      );

    const hasTemporaryClaim =
      matchingItems.some(
        (item) =>
          isTemporaryImage(
            item.image,
          ),
      );

    if (
      hasTemporaryClaim
    ) {
      newTemporaryPublicIds.push(
        publicId,
      );

      continue;
    }

    /**
     * Unknown image + not marked temporary.
     *
     * Could be somebody trying to attach:
     *
     * another product's permanent image
     * arbitrary Cloudinary image
     * fake publicId
     */
    suspiciousNewPublicIds.push(
      publicId,
    );
  }

  /**
   * ================================================
   * 5. OLD IMAGES REMOVED FROM NEXT STATE
   * ================================================
   *
   * IMPORTANT:
   *
   * Because this comparison is against the complete
   * next product + variant image set, a shared image
   * will NOT be deleted if another reference still
   * uses it.
   */

  const removedPermanentPublicIds =
    oldPermanentPublicIds.filter(
      (publicId) =>
        !nextPublicIdSet.has(
          publicId,
        ),
    );

  /**
   * ================================================
   * 6. RETAINED IMAGES
   * ================================================
   *
   * Useful for debugging/tests.
   */

  const retainedPublicIds =
    oldPermanentPublicIds.filter(
      (publicId) =>
        nextPublicIdSet.has(
          publicId,
        ),
    );

  return {
    oldPermanentPublicIds,

    nextPublicIds,

    newTemporaryPublicIds:
      uniquePublicIds(
        newTemporaryPublicIds,
      ),

    removedPermanentPublicIds:
      uniquePublicIds(
        removedPermanentPublicIds,
      ),

    suspiciousNewPublicIds:
      uniquePublicIds(
        suspiciousNewPublicIds,
      ),

    retainedPublicIds:
      uniquePublicIds(
        retainedPublicIds,
      ),

    /**
     * Useful while developing/debugging.
     * You may remove these later.
     */
    existingItems,
    incomingItems,
  };
};




