import mongoose from "mongoose";

import HandleError from "../../../utils/handleError.js";
import {
  CART_ACTIONS,
  MAX_CART_DISTINCT_ITEMS,
  MAX_CART_ITEM_QUANTITY,
} from "../constants/cart.constants.js";

import { validateAddToCartInput } from "../validation/cart.validators.js";

import {
  buildCartItemSnapshot,
  findExistingCartItem,
  getAvailableStock,
  getPriceSnapshot,
} from "../helpers/cart.helpers.js";

import {
  createCartDocument,
  findCartByUser,
  findPopulatedCartByUser,
  findPurchasableProduct,
  findPurchasableVariant,
  productHasVariants,
  saveCart,
} from "../repository/cart.repository.js";

/**
 * Validate the existing cart-item quantity.
 *
 * This protects the application if old or manually
 * inserted cart data is invalid.
 */
const getCurrentItemQuantity = (existingItem) => {
  if (!existingItem) {
    return 0;
  }

  const currentQuantity = Number(existingItem.quantity);

  if (!Number.isSafeInteger(currentQuantity) || currentQuantity < 1) {
    throw new HandleError("Existing cart item quantity is invalid", 500);
  }

  return currentQuantity;
};

/**
 * Calculate and validate the new cart quantity.
 */
const calculateFinalQuantity = ({
  currentQuantity,
  requestedQuantity,
  availableStock,
}) => {
  const finalQuantity = currentQuantity + requestedQuantity;

  if (!Number.isSafeInteger(finalQuantity)) {
    throw new HandleError("Cart item quantity is invalid", 400);
  }

  if (finalQuantity > MAX_CART_ITEM_QUANTITY) {
    throw new HandleError(
      `Cart quantity cannot exceed ${MAX_CART_ITEM_QUANTITY} units for one item`,
      400,
    );
  }

  /*
   * Infinity means:
   *
   * - Inventory tracking is disabled, or
   * - Backorders are allowed.
   */
  if (Number.isFinite(availableStock) && finalQuantity > availableStock) {
    if (currentQuantity > 0) {
      throw new HandleError(
        `You already have ${currentQuantity} unit(s) in your cart. Only ${availableStock} unit(s) are available.`,
        409,
      );
    }

    throw new HandleError(`Only ${availableStock} unit(s) are available`, 409);
  }

  return finalQuantity;
};

/**
 * Refresh an existing cart item using current,
 * trusted product and variant information.
 */
const updateExistingCartItem = ({
  existingItem,
  finalQuantity,
  itemSnapshot,
}) => {
  existingItem.quantity = finalQuantity;

  existingItem.name = itemSnapshot.name;

  existingItem.slug = itemSnapshot.slug;

  existingItem.sku = itemSnapshot.sku;

  existingItem.image = itemSnapshot.image;

  existingItem.selectedAttributes = itemSnapshot.selectedAttributes;

  existingItem.price = itemSnapshot.price;

  existingItem.discountPrice = itemSnapshot.discountPrice;

  existingItem.finalPrice = itemSnapshot.finalPrice;

  existingItem.currency = itemSnapshot.currency;
};

/**
 * Add a new cart item.
 */
const createNewCartItem = ({
  cart,
  product,
  variant,
  quantity,
  itemSnapshot,
}) => {
  if (cart.items.length >= MAX_CART_DISTINCT_ITEMS) {
    throw new HandleError(
      `A cart can contain a maximum of ${MAX_CART_DISTINCT_ITEMS} different items`,
      400,
    );
  }

  cart.items.push({
    product: product._id,
    variant: variant?._id ?? null,

    ...itemSnapshot,

    quantity,

    /*
     * The Cart model pre-save hook will
     * recalculate this value again.
     */
    itemTotal: itemSnapshot.finalPrice * quantity,
  });
};


/**
 * Add a product or product variant to a cart.
 */
export const addToCartService = async ({
  userId,
  productId,
  variantId = null,
  quantity,
}) => {
  /*
   * Validate and normalize all request data
   * before starting the database transaction.
   */
  const {
    userId: validUserId,
    productId: validProductId,
    variantId: validVariantId,
    quantity: requestedQuantity,
  } = validateAddToCartInput({
    userId,
    productId,
    variantId,
    quantity,
  });

  const session =
    await mongoose.startSession();

  let action = CART_ACTIONS.ADDED;

  try {
    await session.withTransaction(
      async () => {
        /*
         * Only published, public and non-deleted
         * products will be returned.
         */
        const product =
          await findPurchasableProduct({
            productId:
              validProductId,
            session,
          });

        if (!product) {
          throw new HandleError(
            "Product is unavailable or does not exist",
            404
          );
        }

        let variant = null;

        if (validVariantId) {
          /*
           * The repository also verifies that
           * the variant belongs to this product.
           */
          variant =
            await findPurchasableVariant({
              productId:
                product._id,
              variantId:
                validVariantId,
              session,
            });

          if (!variant) {
            throw new HandleError(
              "Selected product variant is unavailable",
              404
            );
          }
        } else {
          const hasVariants =
            await productHasVariants({
              productId:
                product._id,
              session,
            });

          if (hasVariants) {
            throw new HandleError(
              "Please select product options before adding this product to the cart",
              400
            );
          }
        }

        /*
         * If a variant exists, its inventory
         * controls availability.
         *
         * Otherwise, product inventory is used.
         */
        const inventorySource =
          variant ?? product;

        const availableStock =
          getAvailableStock(
            inventorySource
          );

        if (
          Number.isFinite(
            availableStock
          ) &&
          availableStock <= 0
        ) {
          throw new HandleError(
            "This item is out of stock",
            409
          );
        }

        /*
         * Price always comes from MongoDB,
         * never from req.body.
         */
        const priceSnapshot =
          getPriceSnapshot(
            product,
            variant
          );

        let cart =
          await findCartByUser({
            userId: validUserId,
            session,
          });

        if (!cart) {
          cart = createCartDocument({
            userId: validUserId,
          });
        }

        const existingItem =
          findExistingCartItem({
            cart,
            productId:
              product._id,
            variantId:
              variant?._id ?? null,
          });

        const currentQuantity =
          getCurrentItemQuantity(
            existingItem
          );

        const finalQuantity =
          calculateFinalQuantity({
            currentQuantity,
            requestedQuantity,
            availableStock,
          });

        const itemSnapshot =
          buildCartItemSnapshot({
            product,
            variant,
            priceSnapshot,
          });

        if (existingItem) {
          updateExistingCartItem({
            existingItem,
            finalQuantity,
            itemSnapshot,
          });

          action =
            CART_ACTIONS.UPDATED;
        } else {
          createNewCartItem({
            cart,
            product,
            variant,
            quantity:
              finalQuantity,
            itemSnapshot,
          });

          action =
            CART_ACTIONS.ADDED;
        }

        /*
         * The Cart pre-save middleware will
         * calculate:
         *
         * - itemTotal
         * - totalItems
         * - totalAmount
         */
        await saveCart({
          cart,
          session,
        });
      },
      {
        readPreference: "primary",

        readConcern: {
          level: "snapshot",
        },

        writeConcern: {
          w: "majority",
        },
      }
    );
  } catch (error) {
    /*
     * A unique-index error may happen if two
     * simultaneous requests try to create a cart
     * for the same user.
     */
    if (error?.code === 11000) {
      throw new HandleError(
        "Your cart was changed by another request. Please try again.",
        409
      );
    }

    /*
     * optimisticConcurrency may produce this
     * error if another request updates the cart.
     */
    if (
      error?.name === "VersionError"
    ) {
      throw new HandleError(
        "Your cart was updated by another request. Please try again.",
        409
      );
    }

    /*
     * MongoDB write-conflict error.
     */
    if (error?.code === 112) {
      throw new HandleError(
        "Your cart could not be updated because of another request. Please try again.",
        409
      );
    }

    throw error;
  } finally {
    /*
     * Always close the session, whether the
     * operation succeeds or fails.
     */
    await session.endSession();
  }

  /*
   * Load the committed cart after the
   * transaction is complete.
   */
  const cart =
    await findPopulatedCartByUser({
      userId: validUserId,
    });

  if (!cart) {
    throw new HandleError(
      "Unable to load the updated cart",
      500
    );
  }

  return {
    cart,
    action,
  };
};
