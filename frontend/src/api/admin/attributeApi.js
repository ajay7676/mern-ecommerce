import api from "../axios";



export const getAttributesApi = async (params) => {
  const { data } = await api.get("/admin/attributes", {
    params,
  });

  return data.data;
};

export const createAttributeApi = async (payload) => {
  const response = await api.post("/admin/attributes", payload);
  return response.data.data;
};
