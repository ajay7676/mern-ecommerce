import { createAdminBrandService } from "./adminBrand.service.js";
import {
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
