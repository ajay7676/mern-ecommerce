import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { attributeQueryKeys } from "../../../queryKeys/attributeQueryKeys";
import { getAttributesApi } from "../../../../../api/admin/attributeApi";

export const useAttributes = (params) => {
  return useQuery({
    queryKey: attributeQueryKeys.list(params),
    queryFn: () => getAttributesApi(params),
    placeholderData: keepPreviousData,

    keepPreviousData: true,

    staleTime: 1000 * 60,
    retry: (failureCount, error) => {
      const status = error?.response?.status;

      if (status === 401 || status === 403) {
        return false;
      }

      return failureCount < 2;
    },
  });
}; 