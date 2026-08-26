import cloudinary, {
  verifyCloudinaryConfiguration,
} from "../../../config/cloudinary.js";

import HandleError from "../../../utils/handleError.js";
import {
  BRAND_BANNER_FOLDER,
  BRAND_LOGO_FOLDER,
} from "./adminBrand.constants.js";
import { validateDeleteBrandUploadsPayload } from "./adminBrandUpload.validators.js";

const uploadBufferToCloudinary = ({
  buffer,
  folder,
  publicIdPrefix,
  transformation,
  adminId,
  tags = [],
}) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,

        resource_type: "image",

        public_id: `${publicIdPrefix}-${Date.now()}`,

        unique_filename: false,

        overwrite: false,

        // 👇 ADD HERE
        tags,

        // 👇 ADD HERE
        context: {
          uploaded_by: adminId?.toString() || "",
        },

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

const assertTemporaryCloudinaryImage = async (publicId) => {
  try {
    const resource = await cloudinary.api.resource(publicId, {
      resource_type: "image",
    });

    const tags = resource?.tags ?? [];

    if (!tags.includes("temporary")) {
      throw new HandleError("Image is no longer temporary", 409);
    }
  } catch (error) {
    if (error?.http_code === 404) {
      return false;
    }

    throw error;
  }

  return true;
};

const destroyCloudinaryImage = (publicId) => {
  return cloudinary.uploader.destroy(publicId, {
    resource_type: "image",
    invalidate: true,
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
      adminId,
      tags: ["brand-image", "brand-logo", "temporary"],

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

      adminId,

      tags: ["brand-image", "brand-banner", "temporary"],

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

export const deleteTemporaryBrandUploadsService = async ({ payload }) => {
  const publicIds = validateDeleteBrandUploadsPayload(payload);
  const results = await Promise.allSettled(
    publicIds.map(async (publicId) => {
      const existsAndTemporary = await assertTemporaryCloudinaryImage(publicId);

      if (!existsAndTemporary) {
        return {
          publicId,
          result: "not found",
        };
      }
      const result = await destroyCloudinaryImage(publicId);

      return {
        publicId,
        result: result?.result,
      };
    }),
  );

  const deleted = [];
  const notFound = [];
  const failed = [];

  results.forEach((result, index) => {
    const publicId = publicIds[index];

    if (result.status === "rejected") {
      failed.push({
        publicId,
        message: result.reason?.message || "Failed to delete image",
      });

      return;
    }

    const cloudinaryResult = result.value?.result;

    if (cloudinaryResult === "ok") {
      deleted.push(publicId);

      return;
    }

    if (cloudinaryResult === "not found") {
      notFound.push(publicId);

      return;
    }

    failed.push({
      publicId,
      message: `Unexpected Cloudinary response: ${cloudinaryResult}`,
    });
  });

  return {
    deleted,
    notFound,
    failed,
  };
};

export const markBrandAssetsPermanent = async (publicIds = []) => {
    verifyCloudinaryConfiguration();

  const normalizedPublicIds = [
    ...new Set(
      publicIds
        .filter(Boolean)
        .map((id) => String(id).trim())
        .filter(Boolean),
    ),
  ];

  if (!normalizedPublicIds.length) {
    return {
      success: true,
    };
  }

  try {
    await cloudinary.uploader.remove_tag("temporary", normalizedPublicIds, {
      resource_type: "image",
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error("Failed to mark brand assets permanent:", error);
     throw new HandleError("Failed to mark brand assets permanent:", 500);

    return {
      success: false,
      error,
    };
  }
};
