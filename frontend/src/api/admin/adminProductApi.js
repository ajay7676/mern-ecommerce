import api from "../axios";

export const createAdminProductApi = async (payload) => {
  console.log("PAYLOAD ::", payload);
  const { data } = await api.post("/admin/products", payload);
  return data.data;
};

export const uploadProductImagesApi = async (files) => {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("images", file);
  });

  const { data } = await api.post("/admin/products/images/temp", formData);

  return data.data.images;
};

export const deleteTemporaryProductImagesApi = async ({ publicIds }) => {
  const { data } = await api.delete("/admin/products/images/temp", {
    data: {
      publicIds,
    },
  });

  return data.data;
};

export const getAdminProductsApi = async (params) => {
  const { data } = await api.get("/admin/products", {
    params,
  });

  return data.data;
};

export const getAdminProductDetailApi = async (productId) => {
  const { data } = await api.get(`/admin/products/${productId}`);

  return data.data;
};

export const updateAdminProductApi = async ({ productId, payload }) => {
  const { data } = await api.patch(
    `/admin/products/${productId}`,
    payload
  );

  return data.data;
};
