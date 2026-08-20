
import Brand from '../../catalog/models/brand.model.js'

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

export const createBrand = (payload) => {
  return Brand.create(payload);
};
