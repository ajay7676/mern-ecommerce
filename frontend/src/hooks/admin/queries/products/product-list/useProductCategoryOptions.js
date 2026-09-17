import {useQuery} from '@tanstack/react-query';
import { getProductCategoryOptionsApi } from "../../../../../api/admin/adminProductMetaApi";
import { adminProductMetaQueryKeys } from "../../../queryKeys/adminProductMetaQueryKeys";


export const useProductCategoryOptions = ({ enabled = true } = {}) => {
  return useQuery({
    queryKey: adminProductMetaQueryKeys.categories(),
    queryFn: getProductCategoryOptionsApi,
    enabled,
    staleTime: 5 * 60 * 1000,
  });
};