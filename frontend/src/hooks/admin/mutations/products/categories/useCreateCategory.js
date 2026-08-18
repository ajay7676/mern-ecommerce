import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createCategory } from "../../../../../api/admin/categories.api";
import { categoryQueryKeys } from "../../../categoryQueryKeys";
import { getCategoryApiErrorMessage } from "../../../../../utils/admin/products/category/categoryApiError";

const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCategory,

    onSuccess: async (response) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: categoryQueryKeys.lists(),
        }),

        queryClient.invalidateQueries({
          queryKey: categoryQueryKeys.tree(),
        }),

        queryClient.invalidateQueries({
          queryKey: categoryQueryKeys.stats(),
        }),
      ]);

      toast.success(response?.message || "Category created successfully");
    },
    onError: (
      error,
    ) => {
      toast.error(
        getCategoryApiErrorMessage(
          error,
          "Failed to create category",
        ),
      );
    },
  });
};

export default useCreateCategory;
