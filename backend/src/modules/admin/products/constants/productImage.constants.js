import { env } from "../../../../config/env.js";

export const PRODUCT_IMAGE_CONFIG = {
  folder: env.cloudinary.productTempFolder,

  tags: ["product-image", "temporary"],

  permanentTag: "permanent",
  temporaryTag: "temporary",
  moduleTag: "product-image",

  ownerContextKey: "uploaded_by",
  productContextKey: "product_id",
  moduleContextKey: "module",
  assetStateContextKey: "asset_state",

  maxSize: 2 * 1024 * 1024, // 2MB

  allowedMimeTypes: ["image/jpeg", "image/png", "image/webp"],

  transformation: [
    {
      width: 2000,
      height: 2000,
      crop: "limit",
    },
    {
      quality: "auto:good",
      fetch_format: "auto",
    },
  ],
};
