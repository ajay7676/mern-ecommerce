import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { adminProductQueryKeys } from "../../queryKeys/adminProductQueryKeys";
import { deleteAdminProductApi } from "../../../../api/admin/adminProductApi";



export const useDeleteAdminProduct = () => {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn:
      deleteAdminProductApi,

    onSuccess: (
      deletedProduct,
    ) => {
      /**
       * Refresh listing.
       */
      queryClient.invalidateQueries({
        queryKey:
          adminProductQueryKeys.lists(),
      });

      /**
       * Refresh stats.
       */
      queryClient.invalidateQueries({
        queryKey:
          adminProductQueryKeys.stats(),
      });

      if (
        deletedProduct?.id
      ) {
        queryClient.removeQueries({
          queryKey:
            adminProductQueryKeys.detail(
              deletedProduct.id,
            ),
        });
      }
    },
  });
};