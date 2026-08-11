import { uploadProductImagesService } from "../services/productImageUpload.service.js";

export const uploadProductImages = async (req, res, next) => {
  try {
    const adminId = req.user?._id || req.user?.id;
    console.log({
  cloudNameExists: Boolean(process.env.CLOUDINARY_CLOUD_NAME),
  apiKeyExists: Boolean(process.env.CLOUDINARY_API_KEY),
  apiSecretExists: Boolean(process.env.CLOUDINARY_API_SECRET),
});
    const images = await uploadProductImagesService(req.files, { adminId });
    res.status(201).json({
      success: true,
      message: "Product images uploaded successfully",

      data: {
        images,

        meta: {
          count: images.length,
        },
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
