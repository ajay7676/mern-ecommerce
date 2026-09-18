import { useQuery } from "@tanstack/react-query";
import { getProductAttributeOptionsApi } from "../../../../../api/admin/adminProductMetaApi";
import { adminProductMetaQueryKeys } from "../../../queryKeys/adminProductMetaQueryKeys";

export const useProductAttributeOptions = ({ enabled = true } = {}) => {
  return useQuery({
    queryKey: adminProductMetaQueryKeys.attributes(),
    queryFn: getProductAttributeOptionsApi,
    enabled,
    staleTime: 5 * 60 * 1000,
    retry: (failureCount, error) => {
      const statusCode = error?.response?.status;

      if ([401, 403].includes(statusCode)) {
        return false;
      }

      return failureCount < 2;
    },
  });
};