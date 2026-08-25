import { createAdminBrandService ,updateAdminBrandService} from "./adminBrand.service.js";
import {
  deleteTemporaryBrandUploadsService,
  uploadBrandBannerService,
  uploadBrandLogoService,
} from "./adminBrandUpload.service.js";

export const createAdminBrand = async (req, res, next) => {
  try {
    const adminId = req.user?._id;

    const brand = await createAdminBrandService(req.body, adminId);

    res.status(201).json({
      success: true,

      message: "Brand created successfully",

      data: {
        brand,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const uploadBrandLogo = async (req, res, next) => {
  try {
    const adminId = req.user?._id;

    const image = await uploadBrandLogoService({
      file: req.file,

      adminId,
    });

    res.status(201).json({
      success: true,

      message: "Brand logo uploaded successfully",

      data: {
        image,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const uploadBrandBanner = async (req, res, next) => {
  try {
    const adminId = req.user?._id;

    const image = await uploadBrandBannerService({
      file: req.file,

      adminId,
    });

    res.status(201).json({
      success: true,

      message: "Brand banner uploaded successfully",

      data: {
        image,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTemporaryBrandUploads = async (req, res, next) => {
  try {
    const result = await deleteTemporaryBrandUploadsService({
      payload: req.body,
    });

    const hasFailures = result.failed.length > 0;

    res.status(200).json({
      success: !hasFailures,

      message: hasFailures
        ? "Some brand images could not be deleted"
        : "Temporary brand images deleted successfully",

      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const updateAdminBrand = async (req, res, next) => {
  try {
    const brand = await updateAdminBrandService({
      brandId: req.params.brandId,

      payload: req.body,
    });

    res.status(200).json({
      success: true,

      message: "Brand updated successfully",

      data: {
        brand,
      },
    });
  } catch (error) {
    next(error);
  }
};
