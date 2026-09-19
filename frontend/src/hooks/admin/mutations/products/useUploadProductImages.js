import {useMutation} from '@tanstack/react-query'
import { uploadProductImagesApi } from '../../../../api/admin/adminProductApi'

export const useUploadProductImages = () => {
  return useMutation({
    mutationFn: uploadProductImagesApi,
  });
};