import HandleError from "../../../utils/handleError.js";

import {
  BRAND_UPLOAD_ALLOWED_FOLDERS,
  MAX_BRAND_UPLOAD_DELETE_COUNT,
} from "./adminBrand.constants.js";

const isAllowedBrandPublicId = (publicId) => {
  return BRAND_UPLOAD_ALLOWED_FOLDERS.some((folder) =>
    publicId.startsWith(folder),
  );
};

export const validateDeleteBrandUploadsPayload = (payload = {}) => {
  const { publicIds } = payload;

  if (!Array.isArray(publicIds)) {
    throw new HandleError("publicIds must be an array", 400, {
      publicIds: "Please provide an array of uploaded image IDs",
    });
  }

  const normalizedPublicIds =   [ ...new Set(
      publicIds.filter(
        (publicId) => typeof publicId === "string",
      )
      .map((publicId) => 
    publicId.trim(),
    )
    .filter(Boolean),
  )];
   if (!normalizedPublicIds.length) {
    throw new HandleError(
      "At least one image is required",
      400,
      {
        publicIds:
          "Please provide at least one image to delete",
      },
    );
  }

  if (
    normalizedPublicIds.length >
    MAX_BRAND_UPLOAD_DELETE_COUNT
  ) {
    throw new HandleError(
      "Too many images requested for deletion",
      400,
      {
        publicIds:
          `You can delete a maximum of ${MAX_BRAND_UPLOAD_DELETE_COUNT} images at once`,
      },
    );
  }

  const invalidPublicIds =
    normalizedPublicIds.filter(
      (publicId) =>
        !isAllowedBrandPublicId(
          publicId,
        ),
    );

  if (invalidPublicIds.length) {
    throw new HandleError(
      "Invalid brand image reference",
      400,
      {
        publicIds:
          "One or more image references are not allowed",
      },
    );
  }

  return normalizedPublicIds;
};
