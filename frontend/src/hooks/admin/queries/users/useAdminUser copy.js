

import { useQuery } from "@tanstack/react-query";

import { getUserById } from "../../../../api/users.api";

const useAdminUser = (userId,
  options = {}) => {
  return useQuery({
    queryKey: ["admin-user", userId],

    queryFn: () => getUserById(userId),

    enabled: Boolean(userId),

    staleTime: 30 * 1000,

    ...options,
  });
}

export default useAdminUser