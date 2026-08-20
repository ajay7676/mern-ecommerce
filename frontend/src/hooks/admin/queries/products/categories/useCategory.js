import { useQuery } from "@tanstack/react-query";
import { categoryQueryKeys } from "../../../categoryQueryKeys";
import { getCategoryById } from "../../../../../api/admin/categories.api";

const useCategory = (categoryId, { enabled = true }) => {
  return useQuery({
    queryKey: categoryQueryKeys.detail(categoryId),

    queryFn: () => getCategoryById(categoryId),
    
    enabled: enabled && Boolean(categoryId),
    staleTime: 30 * 1000,
    retry: (failureCount, error) => {
      const statusCode = error?.response?.status;
      if (statusCode === 400 || statusCode === 403 || statusCode === 404) {
        return false;
      }

      return failureCount < 2;
    },
  });
};

export default useCategory;
