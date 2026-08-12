import { useQuery } from "@tanstack/react-query";

import { getUserById } from "../../../../api/users.api";

const useUser = (
  userId,
  options = {},
) => {
  return useQuery({
    queryKey: ["admin-user", userId],

    queryFn: () => getUserById(userId),

    enabled: Boolean(userId),

    staleTime: 30 * 1000,

    ...options,
  });
};

export default useUser;