import {
     ALLOWED_PRODUCT_IMAGE_TYPES, 
     MAX_PRODUCT_IMAGE_SIZE 
} from "../../../../constants/admin/products/product.constants";

export const formatFileSize = (size = 0) => {
  if (size < 1024) return `${size} B`;

  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(1)} KB`;
  }

  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
};

export const validateProductImageFile = (file) => {
  if (!ALLOWED_PRODUCT_IMAGE_TYPES.includes(file.type)) {
    return "Only JPG, PNG and WEBP images are allowed";
  }

  if (file.size > MAX_PRODUCT_IMAGE_SIZE) {
    return "Image size must be less than 2MB";
  }

  return "";
};


export const createProductImagePreview = ({
  file,
  index,
  isPrimary,
}) => {
  return {
    imageId: crypto.randomUUID(),
    name: file.name,
    size: file.size,
    type: file.type,
    previewUrl: URL.createObjectURL(file),
    altText: "",
    isPrimary,
    sortOrder: index + 1,
    file,
  };
};

export const revokeImagePreviewUrl = (previewUrl) => {
  if (previewUrl?.startsWith("blob:")) {
    URL.revokeObjectURL(previewUrl);
  }
};