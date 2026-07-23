import { useQuery } from "@tanstack/react-query";
import { getProductVariants } from "../../../api/productVariant.api";

const useProductVariants = (productId) => {
  return useQuery({
    queryKey: ["product-variants", productId],
    queryFn: () => getProductVariants(productId),
    enabled: Boolean(productId),
    staleTime: 30 * 1000,

    retry: (failureCount, error) => {
      const status = error?.response?.status;
      if (status === 400 || status === 404) {
        return false;
      }

      return failureCount < 2;
    },
  });
};

export default useProductVariants;
