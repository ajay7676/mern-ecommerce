 import {useQuery} from '@tanstack/react-query'
import { getSingleProduct } from '../../api/productApi';
 const useProductDetails =  (productId) => {
    return  useQuery({
        queryKey: ["product" ,  productId],
        queryFn: () => getSingleProduct(productId),
        enabled: !!productId,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        retry: 1,
        refetchOnWindowFocus: false,
    });
};

export default useProductDetails;

