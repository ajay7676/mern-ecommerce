import api from "./axios";

export const uploadUserAvatar = async (file) => {
  const formData = new FormData();

  formData.append("avatar", file);

  const response = await api.post("/uploads/user-avatar", formData);

  return response.data;
};
