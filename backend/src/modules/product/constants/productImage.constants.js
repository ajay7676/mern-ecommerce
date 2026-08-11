export const MAX_PRODUCT_IMAGES = 8;

export const MAX_PRODUCT_IMAGE_SIZE =
  5 * 1024 * 1024; // 5 MB

export const ALLOWED_PRODUCT_IMAGE_MIME_TYPES =
  new Set([
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ]);

export const PRODUCT_IMAGE_FOLDER =
  process.env.CLOUDINARY_PRODUCT_FOLDER ||
  "ecommerce/products/temp";