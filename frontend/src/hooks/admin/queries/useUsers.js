import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../../api/users.api";

const useUsers = ({ page, limit, search, role, status }) => {
  return useQuery({
    queryKey: [
      "admin-users",
      {
        page,
        limit,
        search,
        role,
        status,
      },
    ],
    queryFn: () =>
      getUsers({
        page,
        limit,
        search,
        role,
        status,
    }),
    staleTime: 30 * 1000,
    placeholderData: (previousData) => previousData,
  });
};

export default useUsers;
