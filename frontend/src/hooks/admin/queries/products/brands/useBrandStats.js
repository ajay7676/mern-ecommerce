import {useQuery} from '@tanstack/react-query';
import { brandQueryKeys } from '../../../brandQueryKeys';
import { getbrandsStats } from '../../../../../api/admin/brands.api';
const useBrandStats = () => {

    return useQuery({
        queryKey:  brandQueryKeys.stats(),

        queryFn: getbrandsStats,
        

    })
  
}

export default useBrandStats