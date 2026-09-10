import api from '../axios';




export const createAttributeApi = async (payload) => {
  const response = await api.post("/admin/attributes", payload);
  return response.data.data;
};