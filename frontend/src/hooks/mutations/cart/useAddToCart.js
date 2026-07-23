import {useMutation , useQueryClient} from '@tanstack/react-query';


import {addToCartApi} from '../../../api/cartApi';

const useAddToCart = () => {

    const queryClient = useQueryClient();

    return useMutation ({
        mutationFn: addToCartApi ,
        onSuccess: async () => {
           /*
            * Refresh:
            * - Cart page
            * - Navbar cart count
            */ 
           await queryClient.invalidateQueries({
            queryKey: ["cart"]
           }) 
        },
    })

  
}

export default useAddToCart 