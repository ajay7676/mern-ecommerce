import {useQuery} from '@tanstack/react-query'
import { brandQueryKeys } from '../../../brandQueryKeys'
import { getBrand } from '../../../../../api/admin/brands.api'

export const useBrand = (brandId , options={}) => {

    return useQuery({
        queryKey: brandQueryKeys.detail(brandId),

        queryFn: async() => getBrand(brandId),
        enabled: Boolean(brandId),
        staleTime: 30 * 1000,
        ...options

    })



}