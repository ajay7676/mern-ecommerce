import { useQuery } from "@tanstack/react-query";
import { attributeQueryKeys } from "../../../queryKeys/attributeQueryKeys";
import { getAttributeByIdApi } from "../../../../../api/admin/attributeApi";

export const useAttribute = (attributeId) => {
  return useQuery({
    queryKey: attributeQueryKeys.detail(attributeId),
    queryFn: () => getAttributeByIdApi(attributeId),

    enabled: Boolean(attributeId),

    staleTime: 1000 * 60,

    retry: (failureCount, error) => {
      const status = error?.response?.status;

      if (status === 401 || status === 403 || status === 404) {
        return false;
      }

      return failureCount < 2;
    },
  });
};