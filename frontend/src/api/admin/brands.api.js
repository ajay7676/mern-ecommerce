import api from "../axios";

export const getBrands = async ({
  page = 1,
  limit = 10,
  search = "",
  status = "",
  sortBy = "sortOrder",
  sortOrder = "asc",
}) => {
  const response = await api.get("/admin/brands", {
    params: {
      page,
      limit,

      search: search || undefined,

      status: status || undefined,

      sortBy,
      sortOrder,
    },
  });

  return response.data;
};

export const getBrand = async (brandId) => {
  const response = await api.get(`/admin/brands/${brandId}`);
  return response.data;
};

export const uploadBrandLogo = async (file) => {
  const formData = new FormData();
  formData.append("logo", file);

  const response = await api.post("/admin/brands/upload-logo", formData);

  return response.data;
};

export const uploadBrandBanner = async (file) => {
  const formData = new FormData();

  formData.append("banner", file);

  const response = await api.post("/admin/brands/upload-banner", formData);

  return response.data;
};

export const createBrand = async (payload) => {
  const response = await api.post("/admin/brands", payload);

  return response.data;
};

export const deleteTemporaryBrandAsset = async (publicId) => {
  const response = await api.delete("/admin/brands/uploads", {
    data: {
      publicIds: publicId,
    },
  });

  return response.data;
};

export const updateBrand = async (brandId, payload) => {
  
  const response = await api.patch(`/admin/brands/${brandId}`, payload);
  return response.data.data;
};

export const deleteBrand = async (brandId) => {
  const response = await api.delete(`/admin/brands/${brandId}`);

  return response.data;
};
