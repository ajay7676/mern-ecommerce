import api from "./axios";

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

  return response.data;
};

export const getCartApi = async () => {
    const response = await api.get(`/cart`);
    const payload = response.data?.data;

    return {
        cart: payload?.cart ?? null,
        meta: payload?.meta ?? {},
    }


}
