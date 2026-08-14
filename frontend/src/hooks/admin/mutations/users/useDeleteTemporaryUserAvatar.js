import { useMutation } from "@tanstack/react-query";

import {
  deleteTemporaryUserAvatar,
} from "../../../../api/uploads.api";

const useDeleteTemporaryUserAvatar = () => {
  return useMutation({
    mutationFn: deleteTemporaryUserAvatar,
  });
};

export default useDeleteTemporaryUserAvatar;