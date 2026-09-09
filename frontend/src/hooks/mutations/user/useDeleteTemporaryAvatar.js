import { useMutation } from "@tanstack/react-query";
import { deleteTemporaryProfileAvatarApi } from "../../../api/authApi";

export const useDeleteTemporaryAvatar = () => {
  return useMutation({
    mutationFn: deleteTemporaryProfileAvatarApi,
  });
};