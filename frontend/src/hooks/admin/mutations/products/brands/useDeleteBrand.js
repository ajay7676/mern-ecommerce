import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBrand } from "../../../../../api/admin/brands.api";
import { brandQueryKeys } from "../../../brandQueryKeys";
import toast from "react-hot-toast";
import { getbrandApiErrorMessage } from "../../../../../utils/admin/products/brand/brandApiError";

const useDeleteBrand = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBrand,
    onSuccess: async (response) => {
      queryClient.invalidateQueries({
        queryKey: brandQueryKeys.lists(),
      });
      queryClient.invalidateQueries({
        queryKey: brandQueryKeys.stats(),
      });
      toast.success(response?.message || "Brand deleted successfully");
    },
    onError: (error) => {
      toast.error(getbrandApiErrorMessage(error, "Failed to delete Brand"));
    },
  });
};

export default useDeleteBrand;
