import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-hot-toast";

import { createUser } from "../../../../api/users.api";

const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,
    onSuccess: (response) => {
      toast.success(
        response?.message ||
          "User created successfully"
      );
      queryClient.invalidateQueries({
        queryKey: ["admin-users"],
      });
    },
    onError: (error) => {
      const message = error?.response?.data?.message || "Failed to create user";

      toast.error(message);
    },
  });
};

export default useCreateUser;
