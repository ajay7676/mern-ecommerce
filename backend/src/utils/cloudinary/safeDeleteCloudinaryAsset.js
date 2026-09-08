import { deleteCloudinaryAsset } from "./cloudinaryDelete.js";

export const safeDeleteCloudinaryAsset =
  async ({
    publicId,
    resourceType = "image",
    logger = console,
  }) => {
    if (!publicId) return;

    try {
      await deleteCloudinaryAsset({
        publicId,
        resourceType,
      });
    } catch (error) {
      logger.error(
        `Cloudinary cleanup failed for ${publicId}`,
        error,
      );
    }
  };