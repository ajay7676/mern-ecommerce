import { useSelector } from "react-redux";
import {
  selectUser,
  selectIsAuthenticated,
  selectIsLoading,
  selectIsAuthChecked,
  selectAuthError
} from "../../features/auth/authSelectors";

const useAuth = () => {
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isLoading = useSelector(selectIsLoading);
  const isAuthChecked = useSelector(selectIsAuthChecked);
  const error = useSelector(selectAuthError);

const role = user?.role ?? null;


  const isAdmin = role === "admin";
  const isUser = role === "user";
   return {
    user,
    isAuthenticated,
    isLoading,
    isAuthChecked,
    error,
    isAdmin,
    isUser,
  };
};

export default useAuth;
