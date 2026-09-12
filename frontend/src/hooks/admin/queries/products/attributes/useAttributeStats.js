import { useQuery } from "@tanstack/react-query";
import { attributeQueryKeys } from "../../../queryKeys/attributeQueryKeys";
import { getAttributeStatsApi } from "../../../../../api/admin/attributeApi";

export const useAttributeStats = () => {
  return useQuery({
    queryKey: attributeQueryKeys.stats(),

    queryFn: getAttributeStatsApi,

    staleTime: 1000 * 60,

    retry: (failureCount, error) => {
      const status = error?.response?.status;

      if (status === 401 || status === 403) {
        return false;
      }

      return failureCount < 2;
    },

    select: (data) => {
      return {
        totalAttributes: data?.totalAttributes ?? 0,
        activeAttributes: data?.activeAttributes ?? 0,
        inactiveAttributes: data?.inactiveAttributes ?? 0,
        productsUsing: data?.productsUsing ?? 0,
        activePercentage: data?.activePercentage ?? 0,
        inactivePercentage: data?.inactivePercentage ?? 0,
      };
    },
  });
};