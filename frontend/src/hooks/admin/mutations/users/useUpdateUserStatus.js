import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  updateUserStatus,
} from "../../../../api/users.api";

const useUpdateUserStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserStatus,

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

export default useUpdateUserStatus;