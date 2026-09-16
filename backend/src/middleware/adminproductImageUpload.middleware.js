import multer  from 'multer';

import { PRODUCT_IMAGE_CONFIG }  from '../modules/admin/products/constants/productImage.constants.js';
import HandleError from '../utils/handleError.js';

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (!PRODUCT_IMAGE_CONFIG.allowedMimeTypes.includes(file.mimetype)) {
    return cb(
      new HandleError("Invalid product image type", 400, {
        images: "Only JPEG, PNG and WEBP images are allowed",
      })
    );
  }

  cb(null, true);
};

export const uploadProductImagesMiddleware = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: PRODUCT_IMAGE_CONFIG.maxSize,
    files: 8,
  },
}).array("images", PRODUCT_IMAGE_CONFIG.MAX_IMAGES);
