import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAttributeStatusApi } from "../../../../api/admin/attributeApi";
import { attributeQueryKeys } from "../../queryKeys/attributeQueryKeys";
import toast from "react-hot-toast";

export const useUpdateAttributeStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAttributeStatusApi,

    onMutate: async ({ attributeId, status }) => {
      await queryClient.cancelQueries({
        queryKey: attributeQueryKeys.lists(),
      });

      const previousLists = queryClient.getQueriesData({
        queryKey: attributeQueryKeys.lists(),
      });

      queryClient.setQueriesData(
        {
          queryKey: attributeQueryKeys.lists(),
        },
        (oldData) => {
          if (!oldData?.items) {
            return oldData;
          }

          return {
            ...oldData,
            items: oldData.items.map((attribute) =>
              attribute.id === attributeId
                ? {
                    ...attribute,
                    status,
                  }
                : attribute
            ),
          };
        }
      );

      return {
        previousLists,
      };
    },

    onError: (error, _variables, context) => {
      context?.previousLists?.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });

      toast.error(
        error?.response?.data?.message ||
          "Failed to update attribute status"
      );
    },

    onSuccess: (updatedAttribute) => {
      queryClient.setQueryData(
        attributeQueryKeys.detail(updatedAttribute.id),
        updatedAttribute
      );

      toast.success("Attribute status updated successfully");
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: attributeQueryKeys.lists(),
      });

      queryClient.invalidateQueries({
        queryKey: attributeQueryKeys.stats(),
      });
    },
  });
};