import api from "../axios";

export const getProductCategoryOptionsApi = async () => {
  const { data } = await api.get("/admin/categories/options", {
    params: {
      status: "active",
    },
  });

  return data.data;
};

export const getProductBrandOptionsApi = async () => {
  const { data } = await api.get("/admin/brands/options", {
    params: {
      status: "active",
    },
  });

  return data.data;
};

export const getProductAttributeOptionsApi = async () => {
  const { data } = await api.get("/admin/attributes/options", {
    params: {
      status: "active",
      usage: "variant",
      limit: 100,
    },
  });

  return data.data;
};