import mongoose from "mongoose";
import { Product } from "../models/product.model.js";
import { ProductVariant } from "../models/productVariant.model.js";

export const findProductBySlug = async ({ slug, session }) => {
  return Product.findOne({ slug })
    .select("_id slug")
    .session(session || null)
    .lean();
};

export const findProductByInventorySku = async ({ sku, session }) => {
  return Product.findOne({ "inventory.sku": sku })
    .select("_id inventory.sku")
    .session(session || null)
    .lean();
};

export const findProductVariantsBySkus = async ({ skus, session }) => {
  return ProductVariant.find({
    sku: { $in: skus },
  })
    .select("_id sku")
    .session(session || null)
    .lean();
};

export const createProduct = async ({ productData, session }) => {
  const [product] = await Product.create([productData], {
    session,
  });

  return product;
};

export const createProductVariants = async ({ variantsData, session }) => {
  if (!variantsData.length) return [];

  return ProductVariant.insertMany(variantsData, {
    session,
    ordered: true,
  });
};

export const deleteProductById = async ({ productId, session }) => {
  return Product.findByIdAndDelete(productId).session(session || null);
};

export const deleteProductVariantsByProductId = async ({
  productId,
  session,
}) => {
  return ProductVariant.deleteMany({ product: productId }).session(
    session || null,
  );
};

const buildProductListMatchStage = ({
  search = "",
  status = "all",
  productType = "all",
  category = "all",
  brand = "all",
  stockStatus = "all",
}) => {
  const match = {};

  if (status !== "all") {
    match.status = status;
  }

  if (productType !== "all") {
    match.productType = productType;
  }

  if (category !== "all") {
    match.category = new mongoose.Types.ObjectId(category);
  }

  if (brand !== "all") {
    match.brand = new mongoose.Types.ObjectId(brand);
  }

  if (search) {
    match.$or = [
      { name: { $regex: search, $options: "i" } },
      { slug: { $regex: search, $options: "i" } },
      { "inventory.sku": { $regex: search, $options: "i" } },
    ];
  }

  if (stockStatus === "outOfStock") {
    match["inventory.stockQuantity"] = { $lte: 0 };
  }

  if (stockStatus === "lowStock") {
    match.$expr = {
      $and: [
        { $gt: ["$inventory.stockQuantity", 0] },
        {
          $lte: ["$inventory.stockQuantity", "$inventory.lowStockThreshold"],
        },
      ],
    };
  }

  if (stockStatus === "inStock") {
    match.$expr = {
      $gt: ["$inventory.stockQuantity", "$inventory.lowStockThreshold"],
    };
  }

  return match;
};

const buildProductSortStage = ({
  sortBy = "createdAt",
  sortOrder = "desc",
}) => {
  const direction = sortOrder === "asc" ? 1 : -1;

  const sortMap = {
    createdAt: { createdAt: direction },
    name: { name: direction },
    price: { "pricing.finalPrice": direction },
    stock: { "inventory.stockQuantity": direction },
  };

  return sortMap[sortBy] || { createdAt: -1 };
};

export const findAdminProducts = async ({
  page = 1,
  limit = 10,
  search = "",
  status = "all",
  productType = "all",
  category = "all",
  brand = "all",
  stockStatus = "all",
  sortBy = "createdAt",
  sortOrder = "desc",
}) => {
  const skip = (page - 1) * limit;

  const matchStage = buildProductListMatchStage({
    search,
    status,
    productType,
    category,
    brand,
    stockStatus,
  });

  const sortStage = buildProductSortStage({
    sortBy,
    sortOrder,
  });

  const pipeline = [
    { $match: matchStage },

    {
      $lookup: {
        from: "categories",
        localField: "category",
        foreignField: "_id",
        as: "category",
      },
    },
    {
      $unwind: {
        path: "$category",
        preserveNullAndEmptyArrays: true,
      },
    },

    {
      $lookup: {
        from: "categories",
        localField: "subCategory",
        foreignField: "_id",
        as: "subCategory",
      },
    },
    {
      $unwind: {
        path: "$subCategory",
        preserveNullAndEmptyArrays: true,
      },
    },

    {
      $lookup: {
        from: "brands",
        localField: "brand",
        foreignField: "_id",
        as: "brand",
      },
    },
    {
      $unwind: {
        path: "$brand",
        preserveNullAndEmptyArrays: true,
      },
    },

    {
      $lookup: {
        from: "productvariants",
        localField: "_id",
        foreignField: "product",
        as: "variants",
      },
    },

    {
      $addFields: {
        variantCount: { $size: "$variants" },
        primaryImage: {
          $first: {
            $filter: {
              input: "$images",
              as: "image",
              cond: { $eq: ["$$image.isPrimary", true] },
            },
          },
        },
      },
    },

    {
      $project: {
        name: 1,
        slug: 1,
        productType: 1,
        shortDescription: 1,
        status: 1,
        createdAt: 1,
        updatedAt: 1,

        "pricing.sellingPrice": 1,
        "pricing.finalPrice": 1,
        "pricing.mrp": 1,
        "pricing.discountType": 1,
        "pricing.discountValue": 1,

        "inventory.sku": 1,
        "inventory.stockQuantity": 1,
        "inventory.lowStockThreshold": 1,

        primaryImage: 1,
        variantCount: 1,

        category: {
          _id: "$category._id",
          name: "$category.name",
          slug: "$category.slug",
        },

        subCategory: {
          _id: "$subCategory._id",
          name: "$subCategory.name",
          slug: "$subCategory.slug",
        },

        brand: {
          _id: "$brand._id",
          name: "$brand.name",
          slug: "$brand.slug",
          logo: "$brand.logo",
        },
      },
    },

    {
      $facet: {
        products: [{ $sort: sortStage }, { $skip: skip }, { $limit: limit }],
        totalCount: [{ $count: "count" }],
      },
    },
  ];

  const [result] = await Product.aggregate(pipeline);

  const products = result?.products || [];
  const totalProducts = result?.totalCount?.[0]?.count || 0;

  return {
    products,
    totalProducts,
  };
};
