import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAdminProductApi } from "../../../../api/admin/adminProductApi";
import { adminProductQueryKeys } from "../../queryKeys/adminProductQueryKeys";

export const useUpdateAdminProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAdminProductApi,

    onSuccess: (updatedProduct) => {
      queryClient.invalidateQueries({
        queryKey: adminProductQueryKeys.lists(),
      });

      queryClient.invalidateQueries({
        queryKey: adminProductQueryKeys.stats(),
      });

      if (updatedProduct?.id) {
        queryClient.invalidateQueries({
          queryKey: adminProductQueryKeys.detail(updatedProduct.id),
        });

        queryClient.setQueryData(
          adminProductQueryKeys.detail(updatedProduct.id),
          (oldData) => {
            if (!oldData) return oldData;

            return {
              ...oldData,
              ...updatedProduct,
            };
          }
        );
      }
    },
  });
};