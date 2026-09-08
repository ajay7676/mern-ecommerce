import HandleError from "../handleError.js";

export const validateImageFile = ({
  file,
  maxSize,
  allowedMimeTypes,
  required = true,
}) => {
  if (!file) {
    if (required) {
      throw new HandleError("Image is required", 400);
    }

    return;
  }

  if (!allowedMimeTypes.includes(file.mimetype)) {
    throw new HandleError("Unsupported image type", 400);
  }

  if (file.size > maxSize) {
    throw new HandleError(
      `Image must be smaller than ${maxSize / (1024 * 1024)}MB`,
      400,
    );
  }
};
