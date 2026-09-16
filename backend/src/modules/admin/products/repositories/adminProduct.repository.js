import { Product } from '../models/product.model.js';
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

export const deleteProductVariantsByProductId = async ({ productId, session }) => {
  return ProductVariant.deleteMany({ product: productId }).session(session || null);
};