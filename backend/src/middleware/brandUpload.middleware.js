import multer from "multer";

import HandleError from "../utils/handleError.js";

import { BRAND_BANNER_MAX_SIZE, BRAND_IMAGE_TYPES, BRAND_LOGO_MAX_SIZE } from "../modules/admin/brands/adminBrand.constants.js";

const storage =
  multer.memoryStorage();

const fileFilter = (
  req,
  file,
  callback,
) => {
  if (
    !BRAND_IMAGE_TYPES.includes(
      file.mimetype,
    )
  ) {
    return callback(
      new HandleError(
        "Invalid image type",
        400,
        {
          image:
            "Only JPG, PNG and WEBP images are allowed",
        },
      ),
    );
  }

  callback(null, true);
};

const logoUpload =
  multer({
    storage,
    fileFilter,
    limits: {
      fileSize:
        BRAND_LOGO_MAX_SIZE,
      files: 1,
    },
  }).single("logo");

const bannerUpload =
  multer({
    storage,
    fileFilter,
    limits: {
      fileSize:
        BRAND_BANNER_MAX_SIZE,
      files: 1,
    },
  }).single("banner");

export {
  logoUpload,
  bannerUpload,
};