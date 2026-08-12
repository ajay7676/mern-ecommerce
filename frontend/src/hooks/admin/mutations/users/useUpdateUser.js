import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { updateUser } from "../../../../api/users.api";

const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUser,

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["admin-users"],
      });

      queryClient.invalidateQueries({
        queryKey: [
          "admin-user",
          variables.userId,
        ],
      });
    },
  });
};

export default useUpdateUser;