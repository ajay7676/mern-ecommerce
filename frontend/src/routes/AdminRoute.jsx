import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const isAuthenticated = false;
  const user = null;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;