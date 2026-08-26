import { useMutation } from "@tanstack/react-query";
import { uploadBrandBanner } from "../../../../../api/admin/brands.api";



export const useUploadBrandBanner = () => {
  return useMutation({
    mutationFn: uploadBrandBanner,

    retry: false,
  });
};