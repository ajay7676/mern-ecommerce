import { useQuery } from "@tanstack/react-query";
import { searchProducts } from "../../api/productApi";


const useSearchProducts = (keyword) => {
    return useQuery({
        queryKey: ["search-products" , keyword],
        queryFn: () => searchProducts(keyword),
        enabled: keyword.trim().length > 1,
        staleTime: 2 * 60 * 1000,
        gcTime: 5 * 60 * 1000,
        retry: 1,
        refetchOnWindowFocus: false,
    })

}

export default useSearchProducts;