import cloudinary, {
  verifyCloudinaryConfiguration,
} from "../../../config/cloudinary.js";

import HandleError from "../../../utils/handleError.js";

import { PRODUCT_IMAGE_FOLDER } from "../constants/productImage.constants.js";

const normalizeDeclaredMimeType = (mimeType) => {
  if (mimeType === "image/jpg") {
    return "image/jpeg";
  }

  return mimeType;
};

const startsWithBytes = (buffer, signature, offset = 0) => {
  if (!Buffer.isBuffer(buffer) || buffer.length < offset + signature.length) {
    return false;
  }

  return signature.every((byte, index) => buffer[offset + index] === byte);
};

const detectImageType = (buffer) => {
  // JPEG: FF D8 FF
  if (startsWithBytes(buffer, [0xff, 0xd8, 0xff])) {
    return {
      mimeType: "image/jpeg",
      format: "jpg",
    };
  }

  // PNG signature
  if (
    startsWithBytes(buffer, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])
  ) {
    return {
      mimeType: "image/png",
      format: "png",
    };
  }

  // WebP: RIFF....WEBP
  const isWebP =
    buffer?.subarray(0, 4).toString() === "RIFF" &&
    buffer?.subarray(8, 12).toString() === "WEBP";

  if (isWebP) {
    return {
      mimeType: "image/webp",
      format: "webp",
    };
  }

  return null;
};

const getImageAltText = (originalName = "") => {
  return originalName
    .replace(/\.[^/.]+$/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 180);
};

const validateImageContent = (file) => {
  if (!file?.buffer?.length) {
    throw new HandleError("Uploaded image is empty", 400);
  }

  const detectedType = detectImageType(file.buffer);

  if (!detectedType) {
    throw new HandleError(
      `${file.originalname} is not a valid JPG, PNG or WebP image`,
      400,
    );
  }

  const declaredMimeType = normalizeDeclaredMimeType(file.mimetype);

  if (declaredMimeType !== detectedType.mimeType) {
    throw new HandleError(
      `${file.originalname} file type does not match its content`,
      400,
    );
  }

  return detectedType;
};

const uploadImageBuffer =  (file, { adminId } = {}) => {
  return new Promise((resolve, reject) => {
    try {
      validateImageContent(file);

      const uploadStream =  cloudinary.uploader.upload_stream(
        {
          folder: PRODUCT_IMAGE_FOLDER,
          resource_type: "image",

          unique_filename: true,
          overwrite: false,

          tags: ["product-image", "temporary"],

          context: {
            uploaded_by: String(adminId || "unknown"),
            original_name: file.originalname,
          },

          transformation: [
            {
              width: 2000,
              height: 2000,
              crop: "limit",
              quality: "auto:good",
            },
          ],
        },
        (error, result) => {
          if (error) {
            return reject(error);
          }

          resolve({
            public_id: result.public_id,
            url: result.secure_url,

            width: result.width,
            height: result.height,
            format: result.format,
            bytes: result.bytes,

            alt: getImageAltText(file.originalname),
          });
        },
      );
      uploadStream.end(file.buffer);
    } catch (error) {
      reject(error);
    }
  });
};

const deleteUploadedImages = async (uploadedImages) => {
  const cleanupResults = await Promise.allSettled(
    uploadedImages.map((image) =>
      cloudinary.uploader.destroy(image.public_id, {
        resource_type: "image",
        invalidate: true,
      }),
    ),
  );

  const cleanupFailed = cleanupResults.some(
    (result) => result.status === "rejected",
  );

  if (cleanupFailed) {
    console.error("Some temporary images could not be cleaned up");
  }
};

export const uploadProductImagesService = async (files, { adminId } = {}) => {
  verifyCloudinaryConfiguration();
  if (!Array.isArray(files) || files.length === 0) {
    throw new HandleError("At least one product image is required", 400);
  }

  /*
   * allSettled lets us know which images succeeded,
   * even when another image fails.
   */
  const uploadResults = await Promise.allSettled(
    files.map((file) =>
      uploadImageBuffer(file, {
        adminId,
      }),
    ),
  );
   console.log("uploadResults");
    console.log(uploadResults)
  const successfulImages = uploadResults
    .filter((result) => result.status === "fulfilled")
    .map((result) => result.value);

    console.log("successfulImages")
    console.log(successfulImages)

  const failedUpload = uploadResults.find(
    (result) => result.status === "rejected",
  );

  if (failedUpload) {
    await deleteUploadedImages(successfulImages);

    if (failedUpload.reason instanceof HandleError) {
      throw failedUpload.reason;
    }

    console.error("Cloudinary upload failed:", failedUpload.reason);

    throw new HandleError("One or more images could not be uploaded", 502);
  }

  return successfulImages.map((image, index) => ({
    ...image,
    isPrimary: index === 0,
  }));
};
