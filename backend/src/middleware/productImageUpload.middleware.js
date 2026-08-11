import multer from "multer";
import HandleError from "../utils/handleError.js";
import {
  ALLOWED_PRODUCT_IMAGE_MIME_TYPES,
  MAX_PRODUCT_IMAGES,
  MAX_PRODUCT_IMAGE_SIZE,
} from "../modules/product/constants/productImage.constants.js";

const storage = multer.memoryStorage();

const fileFilter = (request, file, callback) => {
  if (!ALLOWED_PRODUCT_IMAGE_MIME_TYPES.has(file.mimetype)) {
    return callback(
      new HandleError("Only JPG, PNG and WebP images are allowed", 400),
      false,
    );
  }
  callback(null, true);
};

const productImageUpload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: MAX_PRODUCT_IMAGE_SIZE,
    files: MAX_PRODUCT_IMAGES,
  },
}).array("images", MAX_PRODUCT_IMAGES);

const getMulterError = (error) => {
  if (error.code === "LIMIT_FILE_SIZE") {
    return new HandleError("Each image must be 5 MB or smaller", 400);
  }

  if (error.code === "LIMIT_FILE_COUNT") {
    return new HandleError(
      `Maximum ${MAX_PRODUCT_IMAGES} images are allowed`,
      400,
    );
  }

  if (error.code === "LIMIT_UNEXPECTED_FILE") {
    return new HandleError(
      `Use the "images" field and upload a maximum of ${MAX_PRODUCT_IMAGES} images`,
      400,
    );
  }

  return new HandleError(error.message || "Invalid image upload", 400);
};

export const parseProductImages = (request, response, next) => {
  productImageUpload(request, response, (error) => {
    if (!error) {
      return next();
    }

    if (error instanceof multer.MulterError) {
      return next(getMulterError(error));
    }

    if (error instanceof HandleError) {
      return next(error);
    }

    return next(new HandleError("Unable to process uploaded images", 400));
  });
};
