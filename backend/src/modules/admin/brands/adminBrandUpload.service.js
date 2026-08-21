import cloudinary, { verifyCloudinaryConfiguration } from "../../../config/cloudinary.js";

import HandleError from "../../../utils/handleError.js";
import { BRAND_BANNER_FOLDER, BRAND_LOGO_FOLDER } from "./adminBrand.constants.js";

const uploadBufferToCloudinary = ({
  buffer,
  folder,
  publicIdPrefix,
  transformation,
}) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,

        resource_type: "image",

        public_id: `${publicIdPrefix}-${Date.now()}`,

        unique_filename: false,

        overwrite: false,

        transformation,
      },

      (error, result) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(result);
      },
    );

    uploadStream.end(buffer);
  });
};

export const uploadBrandLogoService = async ({ file, adminId }) => {
     verifyCloudinaryConfiguration();
  if (!file) {
    throw new HandleError("Brand logo is required", 400, {
      logo: "Please select a brand logo",
    });
  }

  try {
    const result = await uploadBufferToCloudinary({
      buffer: file.buffer,

      folder: BRAND_LOGO_FOLDER,

      publicIdPrefix: "brand-logo",

      transformation: [
        {
          width: 500,
          height: 500,

          crop: "fit",

          quality: "auto:good",

          fetch_format: "auto",
        },
      ],
    });

    return {
      publicId: result.public_id,

      url: result.secure_url,

      width: result.width,

      height: result.height,

      format: result.format,

      bytes: result.bytes,
    };
  } catch (error) {
    console.error("Brand logo upload failed:", error);

    throw new HandleError("Failed to upload brand logo", 500);
  }
};

export const uploadBrandBannerService = async ({ file, adminId }) => {
     verifyCloudinaryConfiguration();
  if (!file) {
    throw new HandleError("Brand banner is required", 400, {
      banner: "Please select a brand banner",
    });
  }

  try {
    const result = await uploadBufferToCloudinary({
      buffer: file.buffer,

      folder: BRAND_BANNER_FOLDER,

      publicIdPrefix: "brand-banner",

      transformation: [
        {
          width: 1200,
          height: 400,

          crop: "fill",

          gravity: "auto",

          quality: "auto:good",

          fetch_format: "auto",
        },
      ],
    });

    return {
      publicId: result.public_id,

      url: result.secure_url,

      width: result.width,

      height: result.height,

      format: result.format,

      bytes: result.bytes,
    };
  } catch (error) {
    console.error("Brand banner upload failed:", error);

    throw new HandleError("Failed to upload brand banner", 500);
  }
};
