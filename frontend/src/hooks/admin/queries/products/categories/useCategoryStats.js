import { useQuery } from "@tanstack/react-query";
import { categoryQueryKeys } from "../../../categoryQueryKeys";
import { getCategoryStats } from "../../../../../api/admin/categories.api";

const useCategoryStats = () => {
  return useQuery({
    queryKey:
      categoryQueryKeys.stats(),

    queryFn:
      getCategoryStats,

    staleTime:
      30 * 1000,

    retry: (
      failureCount,
      error,
    ) => {
      const statusCode =
        error?.response?.status;

      if (
        statusCode === 400 ||
        statusCode === 401 ||
        statusCode === 403
      ) {
        return false;
      }

      return failureCount < 2;
    },
  });
};

export default useCategoryStats;