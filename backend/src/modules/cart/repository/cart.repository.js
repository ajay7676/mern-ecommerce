import Cart from "../models/cart.model.js";
import Product from "../../product/models/product.model.js";
import ProductVariant from "../../catalog/models/productVariant.model.js";

/**
 * Attach a MongoDB session when one is provided.
 */

const applySession = (query, session = null) => {
  if (session) {
    query.session(session);
  }

  return query;
};

/**
 * Find a customer-purchasable product.
 */
export const findPurchasableProduct = async ({ productId, session = null }) => {
  const query = Product.findOne({
    _id: productId,
    isDeleted: false,
    status: "published",
    visibility: "public",
  }).select(
    [
      "name",
      "slug",
      "sku",
      "price",
      "discountPrice",
      "currency",
      "stock",
      "trackInventory",
      "allowBackorder",
      "images",
      "status",
      "visibility",
      "isDeleted",
      "+reservedStock",
    ].join(" "),
  );

  applySession(query, session);

  return query.exec();
};

/**
 * Check whether a product has variants.
 *
 * It also checks inactive variants because a product
 * containing variants should not be purchased as a
 * non-variant product.
 */
export const productHasVariants = async ({ productId, session = null }) => {
  const query = ProductVariant.exists({
    product: productId,
    isDeleted: false,
  });

  applySession(query, session);

  const result = await query.exec();

  return Boolean(result);
};

/**
 * Find a purchasable variant that belongs
 * to the given product.
 */
export const findPurchasableVariant = async ({
  productId,
  variantId,
  session = null,
}) => {
  const query = ProductVariant.findOne({
    _id: variantId,
    product: productId,
    status: "active",
    isDeleted: false,
  }).select(
    [
      "product",
      "title",
      "sku",
      "attributes",
      "price",
      "discountPrice",
      "currency",
      "stock",
      "trackInventory",
      "allowBackorder",
      "images",
      "status",
      "isDeleted",
      "+reservedStock",
    ].join(" "),
  );

  applySession(query, session);

  return query.exec();
};

/**
 * Find a cart belonging to a user.
 */
export const findCartByUser = async ({ userId, session = null }) => {
  const query = Cart.findOne({
    user: userId,
  });

  applySession(query, session);

  return query.exec();
};

/**
 * Create a new unsaved cart document.
 *
 * Calling this function does not immediately save
 * anything to MongoDB.
 */
export const createCartDocument = ({ userId }) => {
  return new Cart({
    user: userId,
    items: [],
    totalItems: 0,
    totalAmount: 0,
  });
};

/**
 * Save a cart document.
 */
export const saveCart = async ({ cart, session = null }) => {
  const saveOptions = {};

  if (session) {
    saveOptions.session = session;
  }

  return cart.save(saveOptions);
};

/**
 * Find the cart and populate current product
 * and variant information.
 *
 * Cart snapshot fields such as name, price and image
 * remain available even if a referenced document is
 * later unavailable.
 */
export const findPopulatedCartByUser = async ({ userId, session = null }) => {
  const query = Cart.findOne({
    user: userId,
  })
    .populate({
      path: "items.product",
      select: [
        "name",
        "slug",
        "sku",
        "images",
        "status",
        "visibility",
        "isDeleted",
      ].join(" "),
    })
    .populate({
      path: "items.variant",

      select: [
        "title",
        "sku",
        "attributes",
        "images",
        "stock",
        "trackInventory",
        "allowBackorder",
        "status",
        "isDeleted",
      ].join(" "),
    });

  applySession(query, session);

  return query.exec();
};


/**
 * Find a cart with the latest product
 * and variant information.
 */
export const findCartForDisplay = async ({
  userId,
}) => {
  return Cart.findOne({
    user: userId,
  })
    .populate({
      path: "items.product",

      select: [
        "name",
        "slug",
        "sku",
        "price",
        "discountPrice",
        "currency",
        "images",
        "stock",
        "trackInventory",
        "allowBackorder",
        "status",
        "visibility",
        "isDeleted",
        "+reservedStock",
      ].join(" "),
    })
    .populate({
      path: "items.variant",

      select: [
        "title",
        "sku",
        "price",
        "discountPrice",
        "currency",
        "attributes",
        "images",
        "stock",
        "trackInventory",
        "allowBackorder",
        "status",
        "isDeleted",
        "+reservedStock",
      ].join(" "),
    })
    .exec();
};