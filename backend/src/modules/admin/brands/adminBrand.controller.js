import { createAdminBrandService } from "./adminBrand.service.js";

export const createAdminBrand = async (req, res, next) => {
  try {
    
    const adminId = req.user?._id ;

    const brand = await createAdminBrandService(req.body , adminId);

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
