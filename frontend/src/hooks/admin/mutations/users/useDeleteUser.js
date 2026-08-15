import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { deleteUser } from "../../../../api/users.api";

const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: async (response) => {
      toast.success(response?.message || "User deleted successfully");

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["admin-users"],
        }),

        queryClient.invalidateQueries({
          queryKey: ["admin-user-stats"],
        }),
      ]);
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to delete user");
    },
  });
};

export default useDeleteUser;
