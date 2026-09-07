import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "../../../api/authApi";

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfile,

    onSuccess: (response) => {
      queryClient.setQueryData(["user-profile"], response.data);
    },
  });
};
