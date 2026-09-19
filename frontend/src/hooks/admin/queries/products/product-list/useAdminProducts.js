import { keepPreviousData,useQuery } from "@tanstack/react-query";
import { adminProductQueryKeys } from "../../../queryKeys/adminProductQueryKeys";
import { getAdminProductsApi } from "../../../../../api/admin/adminProductApi";


export const useAdminProducts = (params) => {
  return useQuery({
    queryKey: adminProductQueryKeys.list(params),
    queryFn: () => getAdminProductsApi(params),
    placeholderData: keepPreviousData,
    staleTime: 60 * 1000,
  });
};