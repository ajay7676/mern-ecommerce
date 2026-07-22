import mongoose from "mongoose";
import HandleError from "../../../utils/handleError";
import { MAX_CART_ITEM_QUANTITY } from "../constants/cart.constants";

export const isValidateObject = (id, fieldName) => {
  if (!mongoose.isValidObjectId(id)) {
    throw new HandleError(`Invalid ${fieldName}`, 400);
  }
};

export const normalizeQuantity = (quantity) => {
  const numericQuantity = Number(quantity);

  if (!Number.isInteger(numericQuantity) || numericQuantity < 1) {
    throw new HandleError("Quantity must be a positive integer", 400);
  }
  if (numericQuantity > MAX_CART_ITEM_QUANTITY) {
    throw new HandleError(
      `You can add a maximum of ${MAX_CART_ITEM_QUANTITY} units`,
      400,
    );
  }

  return numericQuantity;

};
