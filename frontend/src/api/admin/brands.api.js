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
