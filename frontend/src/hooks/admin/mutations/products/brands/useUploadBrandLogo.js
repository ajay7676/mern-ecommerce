import { useMutation } from "@tanstack/react-query";
import { uploadBrandLogo } from "../../../../../api/admin/brands.api";


export const useUploadBrandLogo = () => {
  return useMutation({
    mutationFn: uploadBrandLogo,

    retry: false,
  });
};