import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cartQueryKeys } from "../../../constants/cartQueryKeys";
import { removeCartItemApi } from "../../../api/cartApi";

const useRemoveCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: cartQueryKeys.removeItem(),
    mutationFn: removeCartItemApi,

    retry: false,
     onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: cartQueryKeys.current(),
      });
    },
     onSuccess: (updatedCartData) => {
      queryClient.setQueryData(
        cartQueryKeys.current(),
        updatedCartData
      );
    },
     onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: cartQueryKeys.current(),
      });
    },

  });
};

export default useRemoveCartItem;
