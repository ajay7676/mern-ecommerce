import cloudinary from "../../config/cloudinary.js";

export const deleteCloudinaryAsset = async ({
  publicId,
  resourceType = "image",
  invalidate = true,
}) => {
  if (!publicId) {
    return null;
  }

  const result = await cloudinary.uploader.destroy(
    publicId,
    {
      resource_type: resourceType,
      invalidate,
    },
  );

  return result;
};

// For multiple assets:

export const deleteCloudinaryAssets = async ({
  publicIds,
  resourceType = "image",
}) => {
  if (
    !Array.isArray(publicIds) ||
    publicIds.length === 0
  ) {
    return null;
  }

  return cloudinary.api.delete_resources(
    publicIds,
    {
      resource_type: resourceType,
      invalidate: true,
    },
  );
};