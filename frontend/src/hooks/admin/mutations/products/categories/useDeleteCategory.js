import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCategory } from "../../../../../api/admin/categories.api";
import { categoryQueryKeys } from "../../../categoryQueryKeys";
import { getCategoryApiErrorMessage } from "../../../../../utils/admin/products/category/categoryApiError";

const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCategory,
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

        queryClient.invalidateQueries({
          queryKey: categoryQueryKeys.options(),
        }),
      ]);

      toast.success(
        response?.message ||
          "Category deleted successfully",
      );
    },
     onError: (error) => {
      toast.error(
        getCategoryApiErrorMessage(
          error,
          "Failed to delete category",
        ),
      );
    },
  });
};

export default useDeleteCategory;
