import cloudinary, {
  verifyCloudinaryConfiguration,
} from "../../../config/cloudinary.js";
import { deleteImageFromCloudinary } from "../../../utils/cloudinary.js";
import HandleError from "../../../utils/handleError.js";
import { escapeRegex } from "./adminBrand.helpers.js";
import Product from '../../product/models/product.model.js'
import {
  createBrand,
  findBrandById,
  findBrandByName,
  findBrandByNameExceptId,
  findBrandBySlug,
  findBrandBySlugExceptId,
  countBrands,
  findBrandDetailById,
  findBrands,
  deleteBrand,
  productCounts,
  getBrandStatsRepository
} from "./adminBrand.repository.js";

import {
  validateBrandId,
  validateCreateBrandPayload,
  validateUpdateBrandPayload,
  normalizeBrandQuery,
} from "./adminBrand.validators.js";
import { markBrandAssetsPermanent } from "./adminBrandUpload.service.js";

export const createAdminBrandService = async (payload, adminId) => {
  const normalized = validateCreateBrandPayload(payload);

  const [existingSlug, existingName] = await Promise.all([
    findBrandBySlug(normalized.slug),

    findBrandByName(normalized.name),
  ]);

  if (existingSlug) {
    throw new HandleError("Brand slug already exists", 409, {
      slug: "This slug is already in use",
    });
  }

  if (existingName) {
    throw new HandleError("Brand already exists", 409, {
      name: "A brand with this name already exists",
    });
  }

  try {
    const brand = await createBrand({ ...normalized, createdBy: adminId });
    await markBrandAssetsPermanent([
      brand.logo?.publicId,
      brand.banner?.publicId,
    ]);

    return brand;
  } catch (error) {
    /*
     * Database unique index is
     * the final protection against
     * concurrent requests.
     */
    if (error?.code === 11000 && error?.keyPattern?.slug) {
      throw new HandleError("Brand slug already exists", 409, {
        slug: "This slug is already in use",
      });
    }

    throw error;
  }
};

export const updateAdminBrandService = async ({ brandId, payload }) => {
  validateBrandId(brandId);
  const update = validateUpdateBrandPayload(payload);

  const brand = await findBrandById(brandId);
  if (!brand) {
    throw new HandleError("Brand not found", 404, {
      brand: "Brand not found",
    });
  }

  if (update.slug && update.slug !== brand.slug) {
    const duplicateSlug = await findBrandBySlugExceptId(update.slug, brandId);

    if (duplicateSlug) {
      throw new HandleError("Brand slug already exists", 409, {
        slug: "This slug is already in use",
      });
    }
  }

  if (update.name && update.name.toLowerCase() !== brand.name.toLowerCase()) {
    const duplicateName = await findBrandByNameExceptId(update.name, brandId);

    if (duplicateName) {
      throw new HandleError("Brand already exists", 409, {
        name: "A brand with this name already exists",
      });
    }
  }

  const oldLogoPublicId = brand.logo?.publicId || null;

  const oldBannerPublicId = brand.banner?.publicId || null;

  const newLogoPublicId = update.logo?.publicId || null;

  const newBannerPublicId = update.banner?.publicId || null;

  Object.entries(update).forEach(([field, value]) => {
    brand[field] = value;
  });

  try {
    await brand.save();
  } catch (error) {
    if (error?.code === 11000 && error?.keyPattern?.slug) {
      throw new HandleError("Brand slug already exists", 409, {
        slug: "This slug is already in use",
      });
    }

    throw error;
  }
  /*
   * Mark newly uploaded images permanent
   * only after MongoDB update succeeds.
   */

  const newAssetPublicIds = [
    newLogoPublicId && newLogoPublicId !== oldLogoPublicId
      ? newLogoPublicId
      : null,

    newBannerPublicId && newBannerPublicId !== oldBannerPublicId
      ? newBannerPublicId
      : null,
  ].filter(Boolean);

  if (newAssetPublicIds.length) {
    const permanenceResult = await markBrandAssetsPermanent(newAssetPublicIds);

    console.log("permanenceResult");
    console.log(permanenceResult);

    if (!permanenceResult.success) {
      console.error("Brand updated but new asset finalization failed", {
        brandId,
        publicIds: newAssetPublicIds,
      });
    }
  }

  /*
   * Delete old images only after:
   * 1. MongoDB save succeeds
   * 2. new image reference is safely stored.
   */
  const assetsToDelete = [];

  if (
    newLogoPublicId &&
    oldLogoPublicId &&
    newLogoPublicId !== oldLogoPublicId
  ) {
    assetsToDelete.push(oldLogoPublicId);
  }

  if (
    Object.prototype.hasOwnProperty.call(update, "banner") &&
    oldBannerPublicId &&
    oldBannerPublicId !== newBannerPublicId
  ) {
    assetsToDelete.push(oldBannerPublicId);
  }

  const deleteResults = await Promise.allSettled(
    assetsToDelete.map((publicId) => deleteImageFromCloudinary(publicId)),
  );

  deleteResults.forEach((result, index) => {
    if (result.status === "rejected") {
      console.error("Failed to delete old brand asset", {
        brandId,
        publicId: assetsToDelete[index],
        error: result.reason,
      });
    }
  });

  return brand;
};

export const getAdminBrandsService = async (query) => {
  const { page, limit, search, status, sortBy, sortOrder } =
    normalizeBrandQuery(query);

  const filter = {};

  if (search) {
    const regex = new RegExp(escapeRegex(search), "i");

    filter.$or = [
      {
        name: regex,
      },
      {
        slug: regex,
      },
    ];
  }

  if (status) {
    filter.status = status;
  }

  const skip = (page - 1) * limit;

  const sort = {
    [sortBy]: sortOrder === "desc" ? -1 : 1,

    _id: 1,
  };

  const [brands, totalBrands] = await Promise.all([
    findBrands({
      filter,
      skip,
      limit,
      sort,
    }),

    countBrands(filter),
  ]);

  const totalPages = Math.ceil(totalBrands / limit);

  return {
    brands,

    pagination: {
      currentPage: page,
      limit,
      totalBrands,
      totalPages,

      hasNextPage: page < totalPages,

      hasPreviousPage: page > 1,
    },
  };
};

export const getAdminBrandService = async (brandId) => {
  validateBrandId(brandId);

  const brand = await findBrandDetailById(brandId);

  if (!brand) {
    throw new HandleError("Brand not found", 404);
  }

  return brand;
};


export const deleteAdminBrandService = async({brandId , adminId}) => {
    verifyCloudinaryConfiguration();

  validateBrandId(brandId);
  const brand = await findBrandById(brandId);
  if (!brand) {
    throw new HandleError("Brand not found", 404, {
      brand: "Brand not found",
    });
  };

  const productCount = await productCounts({brandId});
  if(productCount > 0 ) {
    throw new HandleError(
      "Brand cannot be deleted",
      409,
      {
        brand: `This brand is being used by ${productCount} ${productCount === 1 ? "Product" :"Products" } `
      }

    )
  }

  const logoPublicId = brand.logo?.publicId;
  const bannerPublicId = brand.banner?.publicId;    
  
  await deleteBrand({brand: brandId});

  // Cloudinary cleanup should not undo a successful DB deletion.
  const cleanupErrors = [];

   if (logoPublicId) {
    try {
      await deleteImageFromCloudinary(logoPublicId);
    } catch (error) {
      console.error(
        `Failed to delete brand logo from Cloudinary: ${logoPublicId}`,
        error
      );

      cleanupErrors.push({
        type: "logo",
        publicId: logoPublicId,
      });
    }
  }

  if (bannerPublicId) {
    try {
      await deleteImageFromCloudinary(bannerPublicId);
    } catch (error) {
      console.error(
        `Failed to delete brand banner from Cloudinary: ${bannerPublicId}`,
        error
      );

      cleanupErrors.push({
        type: "banner",
        publicId: bannerPublicId,
      });
    }
  }
  return {
    deletedBrandId: brand._id,
    cleanupErrors
  }

}

export const getBrandStatsService = async () => {
  return await getBrandStatsRepository();
};