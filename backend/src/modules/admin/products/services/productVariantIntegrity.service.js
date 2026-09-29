import HandleError from "../../../../utils/handleError.js";

import { validateProductVariantIntegrity } from "../helpers/productVariantIntegrity.helper.js";

import { getCloudinaryAsset } from "../../../../utils/cloudinary/cloudinaryAsset.js";

const verifyTemporaryImageOwnership = async ({ publicId, adminId }) => {
  let resource;

  try {
    resource = await getCloudinaryAsset(publicId);
  } catch (error) {
    throw new HandleError("Invalid temporary product image", 400, {
      images: `Image "${publicId}" could not be verified`,
    });
  }

  if (!resource) {
    throw new HandleError("Temporary image not found", 400, {
      images: `Image "${publicId}" does not exist`,
    });
  }

  const tags = resource.tags || [];

  /**
   * Cloudinary commonly returns:
   *
   * context: {
   *   custom: {
   *     uploaded_by: "...",
   *     module: "...",
   *     asset_state: "temporary"
   *   }
   * }
   */
  const context = resource.context?.custom || resource.context || {};

  const uploadedBy = String(context.uploaded_by || "");

  /**
   * Must be a product image.
   */
  if (!tags.includes("product-image")) {
    throw new HandleError("Invalid product image", 400, {
      images: "Image is not a product image",
    });
  }

  /**
   * Must currently be temporary.
   */
  if (!tags.includes("temporary")) {
    throw new HandleError("Invalid temporary image", 400, {
      images: "Image is not a temporary upload",
    });
  }

  /**
   * Extra context protection.
   */
  if (context.asset_state && context.asset_state !== "temporary") {
    throw new HandleError("Invalid temporary image state", 400, {
      images: "Image has an invalid asset state",
    });
  }

  /**
   * Current admin must own the temporary upload.
   */
  if (uploadedBy !== String(adminId)) {
    throw new HandleError("Temporary image ownership failed", 403, {
      images: "Temporary image does not belong to the current admin",
    });
  }

  return true;
};
