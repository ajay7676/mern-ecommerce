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
    verifyCloudinaryConfiguration();
  validateImageFile({
    file,
    maxSize: config.maxSize,
    allowedMimeTypes: config.allowedMimeTypes,
  });
  const result = await uploadBufferToCloudinary({
    buffer: file.buffer,

    folder: config.folder,

    tags: config.tags,

    transformation: config.transformation,

    context: {
      [ownerContextKey]: String(ownerId),
    },
  });

  return {
    publicId: result.publicId,
    url: result.url,
  };
};
