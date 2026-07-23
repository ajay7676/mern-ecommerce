import api from "./axios";

export const addToCartApi = async ({
  productId,
  variantId = null,
  quantity = 1,
}) => {

    const response  = await api.post(`/cart/items` ,  { productId,variantId,quantity});

    return response.data;
};
