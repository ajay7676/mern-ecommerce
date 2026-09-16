import HandleError from "../../../../utils/handleError.js";
import { safeDeleteCloudinaryAsset } from "../../../../utils/cloudinary/safeDeleteCloudinaryAsset.js";
import { deleteTemporaryProductImagesService, uploadTemporaryProductImagesService } from "../services/adminProduct.service.js";

export const uploadTemporaryProductImagesController = async (
  req,
  res,
  next,
) => {
  try {
    const files = req.files || [];
    if (!files.length) {
      throw new HandleError("Product image is required", 400, {
        images: "Please upload at least one product image",
      });
    }
    const uploadedImages = await uploadTemporaryProductImagesService({
      files: files,
      userId: req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: "Product images uploaded successfully",
      data: {
        images: uploadedImages,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTemporaryProductImagesController = async (req, res, next) => {

  try {

    const result = await deleteTemporaryProductImagesService({
      userId: req.user._id,
      publicIds: req.body.publicIds,
    });

    return res.status(200).json({
      success: true,
      message: "Temporary product images deleted successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

