import cloudinary  from '../../config/cloudinary.js';

export const uploadBufferToCloudinary = ({
  buffer,
  folder,
  publicId,
  tags = [],
  context = {},
  transformation,
  resourceType = "image",
  overwrite = false,
}) => {
  if (!buffer) {
    throw new Error("Cloudinary upload buffer is required");
  }

  if (!folder) {
    throw new Error("Cloudinary upload folder is required");
  }

  return new Promise((resolve, reject) => {
    const uploadOptions = {
      folder,
      resource_type: resourceType,
      tags,
      context,
      overwrite,
    };

    if (publicId) {
      uploadOptions.public_id = publicId;
    }

    if (transformation) {
      uploadOptions.transformation = transformation;
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      uploadOptions,
      (error, result) => {
        if (error) {
          return reject(error);
        }

        resolve({
          publicId: result.public_id,
          url: result.secure_url,
          width: result.width,
          height: result.height,
          format: result.format,
          bytes: result.bytes,
          resourceType: result.resource_type,
        });
      },
    );

    uploadStream.end(buffer);
  });
};