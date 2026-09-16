import {
     ALLOWED_PRODUCT_IMAGE_TYPES, 
     MAX_PRODUCT_IMAGE_SIZE, 
     MAX_PRODUCT_IMAGES
} from "../../../../constants/admin/products/product.constants";

export const formatFileSize = (size = 0) => {
  if (size < 1024) return `${size} B`;

  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(1)} KB`;
  }

  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
};

export const validateProductImageFile = (file) => {
   if (!file) {
    return "Image file is required";
  }
  if (!ALLOWED_PRODUCT_IMAGE_TYPES.includes(file.type)) {
    return "Only JPG, PNG and WEBP images are allowed";
  }

  if (file.size > MAX_PRODUCT_IMAGE_SIZE) {
    return "Image size must be less than 2MB";
  }

  return null;
};


export const mapUploadedImageToFormImage = ({
  image,
  index,
  currentImageCount,
}) => {
  return {
    imageId: image.imageId ,
    publicId: image.publicId,
    url: image.url,
    previewUrl: image.url,
    altText: image.altText || "",
    isPrimary: currentImageCount === 0 && index === 0,
    sortOrder: currentImageCount + index + 1,
  };
};


export const normalizeImageSortOrder = (images = []) => {
  return images.map((image, index) => ({
    ...image,
    sortOrder: index + 1,
  }));
};

export const ensureOnePrimaryImage = (images = []) => {
  if (!images.length) return [];

  const hasPrimary = images.some((image) => image.isPrimary);

  if (hasPrimary) {
    return images.map((image, index) => ({
      ...image,
      isPrimary: image.isPrimary && images.findIndex((item) => item.isPrimary) === index,
      sortOrder: index + 1,
    }));
  }

  return images.map((image, index) => ({
    ...image,
    isPrimary: index === 0,
    sortOrder: index + 1,
  }));
};

export const validateProductImageFiles = ({ files, currentImageCount }) => {
  const fileList = Array.from(files || []);

  if (!fileList.length) {
    return {
      isValid: false,
      message: "Please select at least one image",
      files: [],
    };
  }

  if (currentImageCount + fileList.length > MAX_PRODUCT_IMAGES) {
    return {
      isValid: false,
      message: `You can upload maximum ${MAX_PRODUCT_IMAGES} images`,
      files: [],
    };
  }

  for (const file of fileList) {
    const error = validateProductImageFile(file);

    if (error) {
      return {
        isValid: false,
        message: error,
        files: [],
      };
    }
  }

  return {
    isValid: true,
    message: "",
    files: fileList,
  };
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