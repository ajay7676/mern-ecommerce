import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAdminProductApi } from "../../../../api/admin/productAPi";
import { adminProductQueryKeys } from "../../queryKeys/adminProductQueryKeys";

export const useCreateAdminProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createAdminProductApi,
    onSuccess: async (createdProduct) => {
      const productId = createdProduct?.id;

      // Created product ko detail cache mein store karo
      if (productId) {
        queryClient.setQueryData(
          adminProductQueryKeys.detail(productId),
          createdProduct,
        );
      }

      // Product lists aur statistics invalidate karo
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: adminProductQueryKeys.lists(),
        }),

        queryClient.invalidateQueries({
          queryKey: adminProductQueryKeys.stats(),
        }),
      ]);
    },
  });
};
