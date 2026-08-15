import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";


import { updateUser } from "../../../../api/users.api";

const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUser,

    onSuccess: async (
      response,
      variables
    ) => {
      toast.success(
        response?.message ||
          "User updated successfully"
      );

    await Promise.all([
    queryClient.invalidateQueries({
      queryKey: ["admin-users"],
    }),
    queryClient.invalidateQueries({
      queryKey: ["admin-user"],
    }),

    queryClient.invalidateQueries({
      queryKey: ["admin-user-stats"],
    }),
  ]);
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to update user"
      );
    },
  });
};

export default useUpdateUser;