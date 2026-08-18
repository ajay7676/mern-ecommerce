import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCategory } from "../../../../../api/admin/categories.api";
import { categoryQueryKeys } from "../../../categoryQueryKeys";
import { getCategoryApiErrorMessage } from "../../../../../utils/admin/products/category/categoryApiError";

const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCategory,
    onSuccess: async (response, variables) => {
      const updateCategory = response?.data?.category;

      if (updateCategory) {
        queryClient.setQueryData(
          categoryQueryKeys.detail(variables.categoryId),
          (oldData) => ({
            ...(oldData ?? {}),
            data: {
              ...(oldData?.data ?? {}),
              category: updateCategory,
            },
          }),
        );
      }
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

      toast.success(response?.message || "Category updated successfully");
    },
    onError: (error) => {
      toast.error(
        getCategoryApiErrorMessage(error, "Failed to Update Category"),
      );
    },
  });
};

export default useUpdateCategory;
