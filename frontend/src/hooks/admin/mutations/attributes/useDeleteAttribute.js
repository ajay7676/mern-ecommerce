import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAttributeApi } from "../../../../api/admin/attributeApi";
import { attributeQueryKeys } from "../../queryKeys/attributeQueryKeys";
import toast from "react-hot-toast";

export const useDeleteAttribute = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAttributeApi,

    onSuccess: (result) => {
      queryClient.invalidateQueries({
        queryKey: attributeQueryKeys.lists(),
      });

      queryClient.invalidateQueries({
        queryKey: attributeQueryKeys.stats(),
      });

      queryClient.invalidateQueries({
        queryKey: attributeQueryKeys.typeSummary(),
      });

      if (result?.deletedId) {
        queryClient.removeQueries({
          queryKey: attributeQueryKeys.detail(result.deletedId),
        });
      }

      toast.success("Attribute deleted successfully");
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to delete attribute"
      );
    },
  });
};