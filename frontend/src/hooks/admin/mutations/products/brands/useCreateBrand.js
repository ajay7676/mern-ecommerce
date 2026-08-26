import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBrand } from "../../../../../api/admin/brands.api";
import {brandQueryKeys} from '../../../brandQueryKeys'

export const useCreateBrand = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBrand,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: brandQueryKeys.lists(),
      });
    },

    retry: false,
  });
};
