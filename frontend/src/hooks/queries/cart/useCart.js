import { useQuery } from "@tanstack/react-query";
import { getCartApi } from "../../../api/cartApi";

const useCart = (options = {}) => {
  const { enabled = true } = options;

  return useQuery({
    queryKey: ["cart"],
    queryFn: getCartApi,
    enabled,
    staleTime: 30 * 1000,
    retry: (failureCount, error) => {
      const status = error?.response?.status;

      if (status === 401 || status === 403) {
        return false;
      }

      return failureCount < 2;
    },
  });
};

export default useCart;

