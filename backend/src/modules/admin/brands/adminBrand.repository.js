import Brand from "../../catalog/models/brand.model.js";
import Product from "../../product/models/product.model.js";

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

export const findBrandDetailById = (brandId) => {
  return Brand.findById(brandId).lean();
};

export const countBrands = (filter) => {
  return Brand.countDocuments(filter);
};

export const findBrands = async ({ filter, skip, limit, sort }) => {
  return Brand.aggregate([
    {
      $match: filter,
    },

    {
      $lookup: {
        from: "products",

        let: {
          brandId: "$_id",
        },

        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$brand", "$$brandId"],
              },
            },
          },

          {
            $count: "count",
          },
        ],

        as: "productStats",
      },
    },

    {
      $addFields: {
        productCount: {
          $ifNull: [
            {
              $arrayElemAt: ["$productStats.count", 0],
            },
            0,
          ],
        },
      },
    },

    {
      $project: {
        name: 1,
        slug: 1,
        description: 1,
        logo: 1,
        banner: 1,
        status: 1,
        isFeatured: 1,
        sortOrder: 1,
        seo: 1,
        createdAt: 1,
        updatedAt: 1,
        productCount: 1,
      },
    },

    {
      $sort: sort,
    },

    {
      $skip: skip,
    },

    {
      $limit: limit,
    },
  ]);
};
export const productCounts = ({brandId}) => {

   return Product.countDocuments({brand:brandId})
}
export const deleteBrand = ({ brand }) => {
  return  Brand.deleteOne({ _id: brand});
};
