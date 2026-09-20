import {useQuery} from '@tanstack/react-query';
import {adminProductQueryKeys} from '../../../queryKeys/adminProductQueryKeys'
import { getAdminProductDetailApi } from '../../../../../api/admin/adminProductApi';
export const useAdminProductDetail = (productId, options = {}) => {
  return useQuery({
    queryKey: adminProductQueryKeys.detail(productId),
    queryFn: () => getAdminProductDetailApi(productId),

    enabled: Boolean(productId) && (options.enabled ?? true),

    staleTime: 60 * 1000,

    retry: (failureCount, error) => {
      const statusCode = error?.response?.status;

      if ([400, 401, 403, 404].includes(statusCode)) {
        return false;
      }

      return failureCount < 2;
    },
  });
};