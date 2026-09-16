import api from "../axios";


export const createAdminProductApi = async (payload) => {
  console.log("PAYLOAD ::", payload)
  const { data } = await api.post("/admin/products", payload);

  console.log("DATA :: ",data)

  return data.data;
};
