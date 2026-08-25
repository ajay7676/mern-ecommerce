import Brand from "../../catalog/models/brand.model.js";

export const findBrandBySlug = (slug) => {
  return Brand.findOne({
    slug,
  });
};

export const findBrandByName = (name) => {
  return Brand.findOne({
    name: {
      $regex: `^${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`,

      $options: "i",
    },
  });
};
export const findBrandUsingPublicId = (publicId) => {
  return Brand.findOne({
    $or: [
      {
        "logo.publicId": publicId,
      },
      {
        "banner.publicId": publicId,
      },
    ],
  })
    .select("_id")
    .lean();
};

export const createBrand = (payload) => {
  return Brand.create(payload);
};

export const findBrandById = (brandId) => {
  return Brand.findById(brandId);
};

export const findBrandBySlugExceptId = (slug, brandId) => {
  return Brand.findOne({
    slug,

    _id: {
      $ne: brandId,
    },
  });
};

export const findBrandByNameExceptId = (name, brandId) => {
  return Brand.findOne({
    _id: {
      $ne: brandId,
    },

    name: {
      $regex: `^${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`,

      $options: "i",
    },
  });
};
