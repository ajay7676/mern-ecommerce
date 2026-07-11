import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/queries/useAuth";
import { ROUTES } from "../constants/routes";
import AuthLoader from "../components/common/loader/AuthLoader";

const GuestRoute = () => {
  // const { isLoading, isAuthChecked, isAuthenticated, isAdmin } = useAuth();
  const auth = useAuth();
   console.log(auth)
  const { isLoading, isAuthChecked, isAuthenticated, isAdmin } = auth;

 console.log(isAuthChecked)
  const location = useLocation();

  // Wait until auth check completes
  if (isLoading || !isAuthChecked) {
    return <AuthLoader />;
  }

  // Guest → allow
  if (!isAuthenticated) {
    return <Outlet />;
  }

  // Logged-in admin
  if (isAdmin) {
    return (
      <Navigate
        to={ROUTES.ADMIN.DASHBOARD}
        state={{ from: location }}
        replace
      />
    );
  }

  // Logged-in user
  return (
    <Navigate to={ROUTES.PUBLIC.HOME} state={{ from: location }} replace />
  );
};

export default GuestRoute;
