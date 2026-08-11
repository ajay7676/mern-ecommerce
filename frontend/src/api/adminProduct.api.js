import api from 'axios';

const PRODUCT_ENDPOINT = "/admin/products";

const extractProduct = (response) => {
  return (
    response.data?.data?.product ||
    response.data?.product ||
    response.data?.data ||
    response.data
  );
};

export const createProduct = async(payload , {signal} = {}) => {

    const response = await api.post(PRODUCT_ENDPOINT , payload , {signal})

    return extractProduct(response)

}