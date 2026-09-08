import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "../../../api/authApi";
import { profileQueryKeys } from "../../profileQueryKeys";

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfile,
     onSuccess: (updatedProfile) => {
      queryClient.setQueryData(
        profileQueryKeys.detail(),
        updatedProfile
      );
    },
  });
};
