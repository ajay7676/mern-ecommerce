import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-hot-toast";

import { createUser } from "../../../../api/users.api";

const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,
    onSuccess: async (response) => {
      toast.success(response?.message || "User created successfully");
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
      const message = error?.response?.data?.message || "Failed to create user";

      toast.error(message);
    },
  });
};

export default useCreateUser;
