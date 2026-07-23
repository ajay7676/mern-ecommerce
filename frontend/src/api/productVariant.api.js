import api from "./axios"

export const getProductVariants  = async (productId) => {
    const response = await api.get(`/products/${productId}/variants`);

    const payload =   response.data?.data ?? response.data; 


    return {
        variants: payload?.variants ?? [] ,
        options: payload?.options ?? {} ,
    }

}