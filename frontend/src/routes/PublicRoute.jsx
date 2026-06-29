import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = () => {
  const { isAuthenticated, isAuthChecked } = useSelector((state) => state.auth);

  if (!isAuthChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-red-500"></span>
      </div>
    );
  }
    if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

   return <Outlet />;
};

export default PublicRoute;
