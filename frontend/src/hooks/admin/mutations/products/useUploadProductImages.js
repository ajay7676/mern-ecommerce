import {useMutation} from '@tanstack/react-query'
import { uploadProductImagesApi } from '../../../../api/admin/productApi'

export const useUploadProductImages = () => {
  return useMutation({
    mutationFn: uploadProductImagesApi,
  });
};