import { useMutation } from "@tanstack/react-query";
import { deleteTemporaryBrandAsset } from "../../../../../api/admin/brands.api";



export const useDeleteTemporaryBrandAsset =
  () => {
    return useMutation({
      mutationFn:
        deleteTemporaryBrandAsset,

      retry: false,
    });
  };