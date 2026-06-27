 import {useQuery} from '@tanstack/react-query'
import { getSingleProduct } from '../../api/productApi';
 const useProduct =  (productId) => {
    return  useQuery({
        queryKey: ["product"],
        queryFn: () => getSingleProduct(productId),
        enabled: !!productId,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        retry: 1,
        refetchOnWindowFocus: false,
    });
};

export default useProduct;

