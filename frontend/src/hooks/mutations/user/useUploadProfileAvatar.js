import { useMutation } from "@tanstack/react-query";
import { uploadProfileAvatarApi } from "../../../api/authApi";

export const useUploadProfileAvatar = () => {
    return useMutation({
        mutationFn: uploadProfileAvatarApi,
        
      });
  };