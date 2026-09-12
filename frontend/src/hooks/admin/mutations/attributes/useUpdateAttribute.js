
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateAttributeApi } from "../../../../api/admin/attributeApi";
import { attributeQueryKeys } from '../../queryKeys/attributeQueryKeys';


export const useUpdateAttribute = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAttributeApi,

    onSuccess: (updatedAttribute) => {
      queryClient.invalidateQueries({
        queryKey: attributeQueryKeys.lists(),
      });

      queryClient.invalidateQueries({
        queryKey: attributeQueryKeys.stats(),
      });

      queryClient.invalidateQueries({
        queryKey: attributeQueryKeys.typeSummary(),
      });

      const attributeId =
        updatedAttribute?.id ;

      if (attributeId) {
        queryClient.setQueryData(
          attributeQueryKeys.detail(attributeId),
          updatedAttribute
        );
      }

      toast.success("Attribute updated successfully");
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to update attribute"
      );
    },
  });
};