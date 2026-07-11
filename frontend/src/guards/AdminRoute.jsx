import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/queries/useAuth";
import { ROUTES } from "../constants/routes";
import AuthLoader from "../components/common/loader/AuthLoader";

const AdminRoute = () => {
   const {
    isLoading,
    isAuthChecked,
    isAuthenticated,
    isAdmin,
  } = useAuth();

  const location = useLocation();

  // Wait until authentication check is completed
  if (isLoading || !isAuthChecked) {
    return <AuthLoader />;
  }

  // Guest user
  if (!isAuthenticated) {
    return (
      <Navigate
        to={ROUTES.ADMIN.LOGIN}
        state={{ from: location }}
        replace
      />
    );
  }

  // Logged in but not an admin
  if (!isAdmin) {
    return (
      <Navigate
        to={ROUTES.PUBLIC.HOME}
        replace
      />
    );
  }

  // Admin user
  return <Outlet />;
}

export default AdminRoute