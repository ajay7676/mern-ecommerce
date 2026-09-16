import api from "../axios";


export const createAdminProductApi = async (payload) => {
  console.log("PAYLOAD ::", payload)
  const { data } = await api.post("/admin/products", payload);

  console.log("DATA :: ",data)

  return data.data;
};


export const uploadProductImagesApi = async (files) => {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("images", file);
  });

  const { data } = await api.post(
    "/admin/products/images/temp",
    formData
  );

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