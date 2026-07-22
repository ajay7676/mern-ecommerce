import HandleError from "../../../utils/handleError.js";
import { CART_ACTIONS } from "../constants/cart.constants.js";

import {
  addToCartService,
  clearCartService,
  removeCartItemService,
  updateCartItemQuantityService,
} from "../services/cart.service.js";

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

/**
 * Remove one item from the authenticated
 * user's cart.
 *
 * DELETE /api/v1/cart/items/:cartItemId
 */

export const removeCartItem = async (req, res, next) => {
  try {
    const userId = req.user?._id || req.user?.id;
    if (!userId) {
      throw new HandleError("Authentication is required", 401);
    }

    const { cartItemId } = req.params;
    const { cart, removedItem } = await removeCartItemService({
      userId,
      cartItemId,
    });

    res.setHeader("Cache-Control", "no-store");
    return res.status(200).json({
      success: true,
      message: "Cart item removed successfully",

      data: {
        removedItem,
        cart,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update cart-item quantity.
 *
 * PATCH /api/v1/cart/items/:cartItemId
 */
export const updateCartItemQuantity = async (req, res, next) => {
  try {
    const userId = req.user?._id || req.user?.id;

    if (!userId) {
      throw new HandleError("Authentication is required", 401);
    }

    if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
      throw new HandleError("A valid request body is required", 400);
    }

    const { cartItemId } = req.params;

    const { quantity } = req.body;

    const { cart, updatedItem } = await updateCartItemQuantityService({
      userId,
      cartItemId,
      quantity,
    });

    res.setHeader("Cache-Control", "no-store");

    return res.status(200).json({
      success: true,

      message: "Cart item quantity updated successfully",

      data: {
        updatedItem,
        cart,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Remove all items from the authenticated
 * user's cart.
 *
 * DELETE /api/v1/cart
 */
export const clearCart = async (req, res, next) => {
  try {
    const userId = req.user?._id || req.user?.id;

    if (!userId) {
      throw new HandleError("Authentication is required", 401);
    }

    const { cart, clearedItemsCount, wasAlreadyEmpty } = await clearCartService(
      { userId },
    );

    const message = wasAlreadyEmpty
      ? "Cart is already empty"
      : "Cart cleared successfully";

    res.setHeader("Cache-Control", "no-store");

    return res.status(200).json({
      success: true,
      message,

      data: {
        clearedItemsCount,
        wasAlreadyEmpty,
        cart,
      },
    });
  } catch (error) {
    next(error);
  }
};
