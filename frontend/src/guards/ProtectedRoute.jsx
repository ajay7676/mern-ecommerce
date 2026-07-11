import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/queries/useAuth";
import { ROUTES } from "../constants/routes";
import AuthLoader from "../components/common/loader/AuthLoader";

const ProtectedRoute = () => {
     const {
    isLoading,
    isAuthChecked,
    isAuthenticated,
    isAdmin,
  } = useAuth();

  const location = useLocation();
  // Wait until authentication check finishes
  if (isLoading || !isAuthChecked) {
    return <AuthLoader />;
  }

  // User is not logged in
  if (!isAuthenticated) {
    return (
      <Navigate
        to={ROUTES.AUTH.LOGIN}
        state={{ from: location }}
        replace
      />
    );
  }

  // Logged-in admin should use admin panel
  if (isAdmin) {
    return (
      <Navigate
        to={ROUTES.ADMIN.DASHBOARD}
        replace
      />
    );
  }

  // Logged-in customer
  return <Outlet />;
}

export default ProtectedRoute