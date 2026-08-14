import cloudinary, {
  verifyCloudinaryConfiguration,
} from "../config/cloudinary.js";

import HandleError from "../utils/handleError.js";

const uploadBufferToCloudinary = ({ buffer, adminId }) => {
  verifyCloudinaryConfiguration();
  return new Promise((resolve, reject) => {
    const config = cloudinary.config();
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "valid-super-store/users/avatars/temp",

        resource_type: "image",

        tags: ["user-avatar", "temporary-user-avatar"],

        context: {
          uploaded_by: adminId?.toString() || "unknown",
        },

        transformation: [
          {
            width: 800,
            height: 800,
            crop: "limit",
          },
          {
            quality: "auto",
            fetch_format: "auto",
          },
        ],
      },

      (error, result) => {
        if (error) {
          return reject(error);
        }

        resolve(result);
      },
    );

    uploadStream.end(buffer);
  });
};

export const uploadUserAvatarService = async ({ file, adminId }) => {
  if (!file?.buffer) {
    throw new HandleError("Profile image is required", 400);
  }

  try {
    const result = await uploadBufferToCloudinary({
      buffer: file.buffer,
      adminId,
    });
    return {
      url: result.secure_url,

      publicId: result.public_id,

      width: result.width,

      height: result.height,

      format: result.format,
    };
  } catch (error) {
    console.error("Cloudinary avatar upload failed:", error);

    throw new HandleError("Failed to upload profile image", 500);
  }
};
