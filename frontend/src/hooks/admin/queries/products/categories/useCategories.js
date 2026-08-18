import { useQuery } from "@tanstack/react-query";
import { categoryQueryKeys } from "../../../categoryQueryKeys";
import { getCategories } from "../../../../../api/admin/categories.api";

const useCategories = ({
  page,
  limit,
  search,
  status,
  parentCategory,
  sortBy = "sortOrder",
  sortOrder = "asc",
}) => {
  const filters = {
    page,
    limit,
    search,
    status,
    parentCategory,
    sortBy,
    sortOrder,
  };

  return useQuery({
    queryKey: categoryQueryKeys.list(filters),

    queryFn: () => getCategories(filters),
    staleTime: 30 * 1000,

    placeholderData: (previousData) => previousData,

    retry: (failureCount, error) => {
      const statusCode = error?.response?.status;
      if (
        statusCode === 400 ||
        statusCode === 401 ||
        statusCode === 403 ||
        statusCode === 404
      ) {
        return false;
      }
      return failureCount < 2;
    },
  });
};

export default useCategories;
