import cloudinary, {
  verifyCloudinaryConfiguration,
} from "../config/cloudinary.js";

import HandleError from "../utils/handleError.js";

const TEMP_AVATAR_FOLDER = "valid-super-store/users/avatars/temp/";

export const deleteTemporaryUserAvatarService = async ({ publicId }) => {
    verifyCloudinaryConfiguration();
    const config = cloudinary.config();

  if (!publicId) {
    throw new HandleError("Avatar publicId is required", 400);
  }

  /*
   * Security:
   * Only allow deletion from temporary avatar folder.
   */
  if (!publicId.startsWith(TEMP_AVATAR_FOLDER)) {
    throw new HandleError("Only temporary user avatars can be deleted", 403);
  }

  const result = await cloudinary.uploader.destroy(publicId, {
    resource_type: "image",
    invalidate: true,
  });

  /*
   * Cloudinary can return:
   * "ok"
   * "not found"
   */

  if (result.result !== "ok" && result.result !== "not found") {
    throw new HandleError("Failed to delete temporary avatar", 500);
  }

  return {
    publicId,
    deleted: result.result === "ok",
  };
};
