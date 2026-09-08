import { useQuery } from "@tanstack/react-query";
import { profileQueryKeys } from "../../profileQueryKeys";
import { getUserProfile } from "../../../api/authApi";


const useProfile = () => {
  return useQuery({
    queryKey: profileQueryKeys.detail(),
    queryFn: getUserProfile,

    staleTime: 1000 * 60 * 5,

    retry: (failureCount, error) => {
      const status = error?.response?.status;

      if (status === 401 || status === 403) {
        return false;
      }

      return failureCount < 2;
    },
  });
};

export default useProfile;
