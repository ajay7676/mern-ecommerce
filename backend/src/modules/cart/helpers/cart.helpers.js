import HandleError from "../../../utils/handleError";

/**
 * These functions mainly calculate or transform data. They do not directly fetch
 *  documents from MongoDB.
 */
 
export const getAvailableStock = (inventorySource) => {
  if (!inventorySource.trackInventory) {
    return Infinity;
  }

  const stock = Number(inventorySource.stock);
  const reservedStock = Number(inventorySource.reservedStock ?? 0);

  if (!Number.isFinite(stock) || !Number.isFinite(reservedStock)) {
    throw new HandleError("Product inventory is not configured correctly", 500);
  }

  return Math.max(stock - reservedStock, 0);
};

export const getPriceSnapshot = (product, variant) => {
  let price;
  let discountPrice;

  if (variant && variant.price != null) {
    price = variant.price;
    discountPrice = variant.discountPrice;
  } else {
    price = product.price;
    discountPrice = product.discountPrice;
  }

  const numericPrice = Number(price);

  if (!Number.isFinite(numericPrice) || numericPrice < 0) {
    throw new HandleError("Product price is not configured correctly", 500);
  }

  let numericDiscountPrice;

  if (discountPrice != null) {
    numericDiscountPrice = Number(discountPrice);

    if (
      !Number.isFinite(numericDiscountPrice) ||
      numericDiscountPrice < 0 ||
      numericDiscountPrice >= numericPrice
    ) {
      throw new HandleError(
        "Product discount price is not configured correctly",
        500,
      );
    }
  }

  return {
    price: numericPrice,
    discountPrice: numericDiscountPrice,
    finalPrice: numericDiscountPrice ?? numericPrice,
    currency: variant?.currency ?? product.currency ?? "INR",
  };
};

export const getPrimaryImage = (images = []) => {
  if (!Array.isArray(images) || images.length === 0) {
    return {};
  }

  const image = images.find((item) => item.isPrimary) ?? images[0];

  return {
    public_id: image.public_id,
    url: image.url,
    alt: image.alt,
  };
};

export const getCartItemImage = (product, variant) => {
  if (Array.isArray(variant?.images) && variant.images.length > 0) {
    return getPrimaryImage(variant.images);
  }

  return getPrimaryImage(product.images);
};

export const getSelectedAttributes = (variant) => {
  if (!variant?.attributes) {
    return [];
  }

  return variant.attributes.map((attribute) => ({
    attributeName: attribute.attributeName,
    attributeSlug: attribute.attributeSlug,
    attributeType: attribute.attributeType,
    optionLabel: attribute.optionLabel,
    optionValue: attribute.optionValue,
    colorCode: attribute.colorCode,
  }));
};

export const findExistingCartItem = (cart, productId, variantId) => {
  return cart.items.find((item) => {
    const sameProduct = item.product.toString() === productId.toString();

    const existingVariantId = item.variant?.toString() ?? null;

    const requestedVariantId = variantId?.toString() ?? null;

    return sameProduct && existingVariantId === requestedVariantId;
  });
};
