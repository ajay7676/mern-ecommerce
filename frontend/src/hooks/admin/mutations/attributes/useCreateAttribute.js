import toast from 'react-hot-toast'
import {useMutation,useQueryClient} from '@tanstack/react-query'
import { createAttributeApi } from '../../../../api/admin/attributeApi';
import { attributeQueryKeys } from '../../queryKeys/attributeQueryKeys';

export const useCreateAttribute = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAttributeApi,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: attributeQueryKeys.lists(),
      });

      queryClient.invalidateQueries({
        queryKey: attributeQueryKeys.stats(),
      });

      toast.success("Attribute created successfully");
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to create attribute"
      );
    },
  });
};