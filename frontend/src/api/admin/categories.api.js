import api from "../axios";

export const getCategories = async ({
  page = 1,
  limit = 10,
  search = "",
  status = "",
  parentCategory = "",
  sortBy = "sortOrder",
  sortOrder = "asc",
}) => {
  const response = await api.get("/admin/categories", {
    params: {
      page,
      limit,

      search: search || undefined,

      status: status || undefined,

      parentCategory: parentCategory || undefined,

      sortBy,
      sortOrder,
    },
  });

  return response.data;
};

export const getCategoryById = async (
  categoryId,
) => {
  const response = await api.get(
    `/admin/categories/${categoryId}`,
  );

  return response.data;
};

export const createCategory = async (
  payload,
) => {
  const response = await api.post(
    "/admin/categories",
    payload,
  );

  return response.data;
};


export const updateCategory = async ({
  categoryId,
  payload,
}) => {
  const response = await api.patch(
    `/admin/categories/${categoryId}`,
    payload,
  );

  return response.data;
};


export const getCategoryStats = async () => {
  const response = await api.get(
    "/admin/categories/stats",
  );

  return response.data;
};


export const getCategoriesTree = async() => {
    const response = await api.get("/admin/categories/tree");

    return response.data;
}