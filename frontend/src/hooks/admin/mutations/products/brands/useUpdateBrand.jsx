import {useMutation, useQueryClient} from '@tanstack/react-query';
import { updateBrand } from '../../../../../api/admin/brands.api';
import { brandQueryKeys } from '../../../brandQueryKeys';


export const useUpdateBrand = () => {
    const queryClient = useQueryClient();
  return useMutation(
    {
       mutationFn: ({brandId, payload}) =>  updateBrand(brandId, payload) ,

       onSuccess: (_,variables) => {

        queryClient.invalidateQueries({
            queryKey: brandQueryKeys.list()
        });

        queryClient.invalidateQueries({
            queryKey: brandQueryKeys.detail(variables.brandId)
        });
       }
    }
  )
}

