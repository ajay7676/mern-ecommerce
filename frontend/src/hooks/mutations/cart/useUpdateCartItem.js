import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCartItemApi } from "../../../api/cartApi";
import { cartQueryKeys } from "../../../constants/cartQueryKeys";

const useUpdateCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: cartQueryKeys.updateItem(),
    mutationFn: updateCartItemApi,

    retry: false,
    onMutate: async () => {
      // Running cart request ko stop karta hai,
      // taaki old data new data ko overwrite na kare.
      await queryClient.cancelQueries({
        queryKey: cartQueryKeys.current(),
      });
    },

  
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: cartQueryKeys.current(),
      });
    },

    onSettled: async () => {
      // Backend se fresh and confirmed cart data fetch karo.
      await queryClient.invalidateQueries({
        queryKey: cartQueryKeys.current(),
      });
    },


  });
};

export default useUpdateCartItem;
