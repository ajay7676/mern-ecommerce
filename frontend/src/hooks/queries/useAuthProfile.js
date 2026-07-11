import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { getProfile } from "../../api/authApi";
import { authChecked, logout, setUser } from "../../features/auth/authSlice";
import { useEffect } from "react";

const useAuthProfile = () => {
  const dispatch = useDispatch();

  const query = useQuery({
    queryKey: ["auth-profile"],
    queryFn: getProfile,
    retry: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (query.isSuccess) {
      dispatch(setUser(query.data.user));
    }

    if (query.isError) {
      dispatch(logout());
    }

    if (query.isSuccess || query.isError) {
      dispatch(authChecked());
    }
  }, [query.isSuccess, query.isError, query.data, dispatch]);

  return query;
};

export default useAuthProfile;
