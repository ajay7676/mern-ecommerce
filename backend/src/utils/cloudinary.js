import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImageToCloudinary = async (
  filePath,
  folder = "mern-ecommerce/products",
) => {
  const result = await cloudinary.uploader.upload(filePath, {
    folder,
    resource_type: "image",
  });

  return {
    url: result.secure_url,
    public_id: result.public_id,
  };
};

const deleteImageFromCloudinary = async (publicId) => {
  if (!publicId) return;
  const result = await cloudinary.uploader.destroy(publicId, {
    resource_type: "image",
    invalidate: true,
  });

  if (result.result !== "ok" && result.result !== "not found") {
    throw new Error(`Cloudinary deletion failed: ${result.result}`);
  }
  return result;
};

export { cloudinary, uploadImageToCloudinary, deleteImageFromCloudinary };
