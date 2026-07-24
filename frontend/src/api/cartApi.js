import api from "./axios";

const normalizeCartResponse = (response) => {
  const payload = response.data?.data ?? response.data;
  if (!payload) {
    throw new Error("Invalid cart API response");
  }
  // Expected: { cart, meta }
  if (Object.hasOwn(payload, "cart")) {
    return {
      cart: payload.cart,
      meta: payload.meta ?? {},
    };
  }

  // Also supports direct cart response
  if (Array.isArray(payload.items)) {
    return {
      cart: payload,
      meta: {},
    };
  }
  throw new Error("Cart data is missing from API response");
};

export const addToCartApi = async ({
  productId,
  variantId = null,
  quantity = 1,
}) => {
  const response = await api.post(`/cart/items`, {
    productId,
    variantId,
    quantity,
  });

  return normalizeCartResponse(response);
};

export const getCartApi = async () => {
  const response = await api.get(`/cart`);

  return normalizeCartResponse(response);
};

export const updateCartItemApi = async ({ cartItemId, quantity }) => {
  if (typeof cartItemId !== "string" || !cartItemId.trim()) {
    throw new Error("Cart item ID is required");
  }

  if(!Number.isInteger(quantity) || quantity < 1){
    throw new Error(
      "Quantity must be a positive integer"
    );
  }

  const response = await api.patch(`/cart/items/${cartItemId}` , {quantity});

  return normalizeCartResponse(response);

};

export const removeCartItemApi = async ({
  cartItemId,
}) => {
  if (
    typeof cartItemId !== "string" ||
    !cartItemId.trim()
  ) {
    throw new Error("Cart item ID is required");
  }

  const response = await api.delete(
    `/cart/items/${cartItemId}`
  );

  return normalizeCartResponse(response);
};