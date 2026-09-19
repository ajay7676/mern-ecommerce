
import HandleError from '../../../../utils/handleError.js';
import { PRODUCT_IMAGE_CONFIG } from "../constants/productImage.constants.js";

import { getCloudinaryAsset } from '../../../../utils/cloudinary/cloudinaryAsset.js'
import { makeCloudinaryAssetPermanent } from '../../../../utils/cloudinary/makeAssetPermanent.js'
import { safeDeleteCloudinaryAsset } from '../../../../utils/cloudinary/safeDeleteCloudinaryAsset.js'


const getAssetOwnerId = (asset) => {
  return (
    asset?.context?.custom?.[PRODUCT_IMAGE_CONFIG.ownerContextKey] ||
    asset?.context?.[PRODUCT_IMAGE_CONFIG.ownerContextKey]
  );
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

export const verifyTemporaryProductImages = async ({ publicIds, adminId }) => {
  if (!publicIds.length) {
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
        images: "Image is not temporary or already used",
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




