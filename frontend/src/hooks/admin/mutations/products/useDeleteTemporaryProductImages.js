import { useMutation } from "@tanstack/react-query";
import { deleteTemporaryProductImagesApi } from "../../../../api/admin/adminProductApi";


export const useDeleteTemporaryProductImages = () => {
  return useMutation({
    mutationFn: deleteTemporaryProductImagesApi,
  });
}; 