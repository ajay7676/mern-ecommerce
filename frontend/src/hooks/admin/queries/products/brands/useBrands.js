import { useQuery } from "@tanstack/react-query";
import { getBrands } from "../../../../../api/admin/brands.api";
import { brandQueryKeys } from "../../../brandQueryKeys.js";

const useBrands = ({
  page,
  limit,
  search,
  status,
  sortBy = "sortOrder",
  sortOrder = "asc",
}) => {
  const filters = {
    page,
    limit,
    search,
    status,
    sortBy,
    sortOrder,
  };
  return useQuery({
    queryKey: brandQueryKeys.list(filters),

    queryFn: () => getBrands(filters),

    placeholderData: (previousData) => previousData,

    staleTime: 30 * 1000,

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

export default useBrands;
