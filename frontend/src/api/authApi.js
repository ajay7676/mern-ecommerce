import api from "./axios";

export const registerUser = async (userData) => {
  const response = await api.post("/register", userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await api.post("/login", credentials);
  return response.data;
};

export const getProfile = async () => {
  const response = await api.get("/profile");
  return response.data;
};

export const logoutUser = async () => {
  const response = await api.post("/logout");
  return response.data;
};

export const getUserProfile = async () => {
  const response = await api.get("/user/profile");

  return response.data.data;
};

export const uploadProfileAvatarApi = async (file) => {
  const formData = new FormData();

  formData.append("avatar", file);

  const { data } = await api.post("/user/profile/avatar", formData);

  return data.data;
};

export const updateProfile = async (payload) => {
  const response = await api.patch("/user/profile", payload);
  return response.data.data;
};


export const deleteTemporaryProfileAvatarApi = async ({ publicIds }) => {
  const { data } = await api.delete(
    "/user/profile/avatar/temp",
    {
      data: {
        publicIds,
      },
    }
  );

  return data.data;
};
