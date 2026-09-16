import { useMutation } from "@tanstack/react-query";
import { deleteTemporaryProductImagesApi } from "../../../../api/admin/productApi";


export const useDeleteTemporaryProductImages = () => {
  return useMutation({
    mutationFn: deleteTemporaryProductImagesApi,
  });
}; 