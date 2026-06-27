import api from "./axios"


export const getProducts = async() => {
     const response = await api.get("/products");
      return response.data;

}

export const searchProducts = async(keyword) => {
      const response = await api.get("/products" , {
            params: {
                  keyword
            }
      })
      return response.data;

}

export const getSingleProduct = async(productId) => {
      const reseponse = await api.get(`/product/${productId}`);

      return reseponse.data;
}