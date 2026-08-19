import Category from "../../catalog/models/category.model.js";
import Product from "../../product/models/product.model.js";

export const findCategoryById = (categoryId) => {
  return Category.findById(categoryId);
};

export const findCategoryDetailById = (categoryId) => {
  return Category.findById(categoryId)
    .populate("parentCategory", "name slug status")
    .lean();
};

export const findCategoryBySlug = (slug) => {
  return Category.findOne({
    slug,
  });
};

export const findCategoryBySlugExceptId = (slug, categoryId) => {
  return Category.findOne({
    slug,

    _id: {
      $ne: categoryId,
    },
  });
};

export const findCategoryByNameAndParent = (name, parentCategory) => {
  return Category.findOne({
    name: {
      $regex: `^${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`,
      $options: "i",
    },

    parentCategory: parentCategory || null,
  });
};

export const findCategoryByNameAndParentExceptId = (
  name,
  parentCategory,
  categoryId,
) => {
  return Category.findOne({
    _id: {
      $ne: categoryId,
    },

    name: {
      $regex: `^${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`,
      $options: "i",
    },

    parentCategory: parentCategory || null,
  });
};

export const createCategory = (payload) => {
  return Category.create(payload);
};

export const countCategories = (filter) => {
  return Category.countDocuments(filter);
};

export const findCategories = async ({
  filter,
  skip,
  limit,
  sort,
}) => {
  return Category.aggregate([
    {
      $match: filter,
    },

    {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "category",
        as: "products",
      },
    },

    {
      $addFields: {
        productCount: {
          $size: "$products",
        },
      },
    },

    {
      $lookup: {
        from: "categories",
        localField: "parentCategory",
        foreignField: "_id",
        as: "parentCategoryData",
      },
    },

    {
      $addFields: {
        parentCategory: {
          $cond: [
            {
              $gt: [
                {
                  $size: "$parentCategoryData",
                },
                0,
              ],
            },

            {
              $arrayElemAt: [
                "$parentCategoryData",
                0,
              ],
            },

            null,
          ],
        },
      },
    },

    {
      $project: {
        name: 1,
        slug: 1,
        description: 1,
        status: 1,
        sortOrder: 1,
        icon: 1,
        image: 1,
        seo: 1,
        createdAt: 1,
        updatedAt: 1,

        productCount: 1,

        "parentCategory._id": 1,
        "parentCategory.name": 1,
        "parentCategory.slug": 1,
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

export const findChildrenByParentId = (parentId) => {
  return Category.find({
    parentCategory: parentId,
  })
    .select("_id parentCategory")
    .lean();
};

//  For Delete Category

export const countChildCategories = (categoryId) => {
  return Category.countDocuments({
    parentCategory: categoryId,
  });
};

export const countProductsByCategory = (categoryId) => {
  return Product.countDocuments({
    category: categoryId,
  });
};

export const deleteCategoryById = (categoryId) => {
  return Category.findByIdAndDelete(categoryId);
};

export const findAllCategoriesForTree = () => {
  return Category.find({})
    .select("_id name slug parentCategory status sortOrder")
    .sort({
      sortOrder: 1,
      name: 1,
    })
    .lean();
};

export const findCategoryOptions = ({ status } = {}) => {
  const filter = {};

  if (status) {
    filter.status = status;
  }

  return Category.find(filter)
    .select("_id name parentCategory status sortOrder")
    .sort({
      sortOrder: 1,
      name: 1,
    })
    .lean();
};

export const countAllCategories = () => {
  return Category.countDocuments();
};

export const countCategoriesByStatus = (status) => {
  return Category.countDocuments({
    status,
  });
};


export const countProductsWithCategory = () => {
  return Product.countDocuments({
    category: {
      $ne: null,
    },
  });
};
