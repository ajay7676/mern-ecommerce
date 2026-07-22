import Cart from "../models/cart.model";
import Product from "../../product/models/product.model";
import ProductVariant from "../../catalog/models/productVariant.model";
import HandleError from "../../../utils/handleError";

/**
 * Database queries can be kept here:
 */

export const getPurchasableProduct = async (productId, session) => {
  const product = await Product.findOne({
    _id: productId,
    isDeleted: false,
    status: "published",
    visibility: "public",
  }).session(session);

  if (!product) {
    throw new HandleError("Product is unavailable or does not exist", 404);
  }

  return product;
};

export const getPurchasableVariant = async ({
  product,
  variantId,
  session,
}) => {
  if (!variantId) {
    const hasVariants = await ProductVariant.exists({
      product: product._id,
      isDeleted: false,
    }).session(session);

    if (hasVariants) {
      throw new HandleError("Please select product options", 400);
    }

    return null;
  }

  const variant = await ProductVariant.findOne({
    _id: variantId,
    product: product._id,
    status: "active",
    isDeleted: false,
  })
    .select("+reservedStock")
    .session(session);

  if (!variant) {
    throw new HandleError("Selected variant is unavailable", 404);
  }

  return variant;
};

export const findCartByUser = (userId, session) => {
  return Cart.findOne({
    user: userId,
  }).session(session);
};

export const getPopulatedCart = (userId) => {
  return Cart.findOne({ user: userId })
    .populate({
      path: "items.product",
      select: "name slug status visibility isDeleted",
    })
    .populate({
      path: "items.variant",
      select: "sku status attributes images stock trackInventory isDeleted",
    });
};
