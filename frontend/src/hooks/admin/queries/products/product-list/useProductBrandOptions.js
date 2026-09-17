
import { useQuery } from "@tanstack/react-query";
import { adminProductMetaQueryKeys } from "../../../queryKeys/adminProductMetaQueryKeys";
import { getProductBrandOptionsApi } from "../../../../../api/admin/adminProductMetaApi";


export const useProductBrandOptions = ({ enabled = true } = {}) => {
  return useQuery({
    queryKey: adminProductMetaQueryKeys.brands(),
    queryFn: getProductBrandOptionsApi,
    enabled,
    staleTime: 5 * 60 * 1000,
  });
};