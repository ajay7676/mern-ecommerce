import mongoose from "mongoose";
import HandleError from "../../../utils/handleError";
import {
  DEFAULT_CART_QUANTITY,
  MAX_CART_ITEM_QUANTITY,
} from "../constants/cart.constants";

/**
 * Validate a required MongoDB ObjectId.
 */

export const validateObjectId = ({ id, fieldName = "ID" }) => {
  if (id === null || id === undefined || id === "") {
    throw new HandleError(`${fieldName} is required`, 400);
  }
  const normalizedId = typeof id === "string" ? id.trim() : id;

  const isObjectIdInstance = normalizedId instanceof mongoose.Types.ObjectId;

  const isValidObjectIdString =
    typeof normalizedId === "string" &&
    /^[a-f\d]{24}$/i.test(normalizedId) &&
    mongoose.isValidObjectId(normalizedId);

  if (!isObjectIdInstance && !isValidObjectIdString) {
    throw new HandleError(`Invalid ${fieldName}`, 400);
  }

  return normalizedId;
};

/**
 * Validate an optional MongoDB ObjectId.
 *
 * Variant ID is optional because some products
 * may not have variants.
 */
export const validateOptionalObjectId = ({ id, fieldName = "ID" }) => {
  if (
    id === null ||
    id === undefined ||
    (typeof id === "string" && id.trim() === "")
  ) {
    return null;
  }

  return validateObjectId({
    id,
    fieldName,
  });
};

/**
 * Convert and validate cart quantity.
 */
export const normalizeQuantity = (quantity = DEFAULT_CART_QUANTITY) => {
  if (
    quantity === null ||
    typeof quantity === "boolean" ||
    Array.isArray(quantity) ||
    typeof quantity === "object"
  ) {
    throw new HandleError("Quantity must be a positive integer", 400);
  }

  let normalizedQuantity = quantity;

  /*
   * HTML forms may send numbers as strings.
   *
   * Example:
   * "2" → 2
   */
  if (typeof quantity === "string") {
    const trimmedQuantity = quantity.trim();

    if (!trimmedQuantity || !/^\d+$/.test(trimmedQuantity)) {
      throw new HandleError("Quantity must be a positive integer", 400);
    }

    normalizedQuantity = Number(trimmedQuantity);
  }

  if (!Number.isSafeInteger(normalizedQuantity) || normalizedQuantity < 1) {
    throw new HandleError("Quantity must be a positive integer", 400);
  }

  if (normalizedQuantity > MAX_CART_ITEM_QUANTITY) {
    throw new HandleError(
      `You can add a maximum of ${MAX_CART_ITEM_QUANTITY} units at a time`,
      400,
    );
  }

  return normalizedQuantity;
};

/**
 * Validate the complete Add to Cart input.
 */
export const validateAddToCartInput = ({
  userId,
  productId,
  variantId,
  quantity,
}) => {
  const normalizedUserId = validateObjectId({
    id: userId,
    fieldName: "User ID",
  });

  const normalizedProductId = validateObjectId({
    id: productId,
    fieldName: "Product ID",
  });

  const normalizedVariantId = validateOptionalObjectId({
    id: variantId,
    fieldName: "Variant ID",
  });

  const normalizedQuantity = normalizeQuantity(quantity);

  return {
    userId: normalizedUserId,
    productId: normalizedProductId,
    variantId: normalizedVariantId,
    quantity: normalizedQuantity,
  };
};
