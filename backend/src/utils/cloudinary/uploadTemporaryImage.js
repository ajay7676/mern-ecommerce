import { validateImageFile } from "../files/validateImageFile.js";
import { uploadBufferToCloudinary } from "./cloudinaryUpload.js";
import  {
  verifyCloudinaryConfiguration,
} from "../../config/cloudinary.js";

export const uploadTemporaryImage = async ({
  file,
  ownerId,
  config,
  ownerContextKey = "uploaded_by",
}) => {
  validateImageFile({
    file,
    maxSize: config.maxSize,
    allowedMimeTypes: config.allowedMimeTypes,
  });

  const context = {
    [ownerContextKey]: String(ownerId),
  };

  // Optional context for modules like product-image, brand-image, user-avatar
  if (config.moduleContextKey && config.moduleContextValue) {
    context[config.moduleContextKey] = config.moduleContextValue;
  }

  // Optional temporary/permanent state
  if (config.assetStateContextKey) {
    context[config.assetStateContextKey] = "temporary";
  }

  const result = await uploadBufferToCloudinary({
    buffer: file.buffer,
    folder: config.folder,
    tags: config.tags,
    transformation: config.transformation,
    context,
  });

  return {
    publicId: result.publicId,
    url: result.url,
  };
};
