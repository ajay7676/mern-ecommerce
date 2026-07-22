import HandleError from "../../../utils/handleError.js";
import { CART_ACTIONS } from "../constants/cart.constants.js";

import { addToCartService } from "../services/cart.service.js";

export const addToCart = async (req, res, next) => {
  try {
    const userId = req.user?._id || req.user?.id;
    if (!userId) {
      return new HandleError("Authentication is required", 401);
    }
    if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
      throw new HandleError("A valid request body is required", 400);
    }

    const { productId, variantId = null, quantity } = req.body;
    const { cart, action } = await addToCartService({
      userId,
      productId,
      variantId,
      quantity,
    });

    const isNewItem = action === CART_ACTIONS.ADDED;

    const statusCode = isNewItem ? 201 : 200;

    const message = isNewItem
      ? "Item added to cart successfully"
      : "Cart item quantity updated successfully";

    /*
     * Cart contains private, user-specific data.
     * It should not be cached by browsers or proxies.
     */
    res.setHeader("Cache-Control", "no-store");

    res.status(statusCode).json({
      success: true,
      message,
      data: {
        action,
        cart,
      },
    });
  } catch (error) {
    next(error);
  }
};
