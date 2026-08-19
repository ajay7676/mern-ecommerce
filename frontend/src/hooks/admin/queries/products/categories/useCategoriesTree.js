import { useQuery } from "@tanstack/react-query";
import { getCategoriesTree } from "../../../../../api/admin/categories.api";
import { categoryQueryKeys } from "../../../categoryQueryKeys";
const useCategoriesTree = () => {
  return useQuery({
    queryKey: categoryQueryKeys.tree(),

    queryFn: getCategoriesTree,

    staleTime: 30 * 1000,
    retry: (failureCount, error) => {
      const statusCode = error?.response?.status;

      if (statusCode === 400 || statusCode === 401 || statusCode === 403) {
        return false;
      }

      return failureCount < 2;
    },
  });
};

export default useCategoriesTree;
