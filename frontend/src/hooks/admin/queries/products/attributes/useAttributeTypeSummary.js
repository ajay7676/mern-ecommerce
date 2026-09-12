import { useQuery } from "@tanstack/react-query";
import { attributeQueryKeys } from "../../../queryKeys/attributeQueryKeys";
import { getAttributeTypeSummaryApi } from "../../../../../api/admin/attributeApi";


export const useAttributeTypeSummary = () => {
  return useQuery({
    queryKey: attributeQueryKeys.typeSummary(),

    queryFn: getAttributeTypeSummaryApi,

    staleTime: 1000 * 60,

    retry: (failureCount, error) => {
      const status = error?.response?.status;

      if (status === 401 || status === 403) {
        return false;
      }

      return failureCount < 2;
    },

    select: (data) => {
      const defaultTypes = [
        {
          type: "dropdown",
          label: "Dropdown",
          count: 0,
        },
        {
          type: "switch",
          label: "Switch",
          count: 0,
        },
        {
          type: "text",
          label: "Text",
          count: 0,
        },
        {
          type: "number",
          label: "Number",
          count: 0,
        },
        {
          type: "boolean",
          label: "Boolean",
          count: 0,
        },
      ];

      return defaultTypes.map((item) => {
        const found = data?.find(
          (summary) => summary.type === item.type
        );

        return {
          ...item,
          count: found?.count ?? 0,
        };
      });
    },
  });
};