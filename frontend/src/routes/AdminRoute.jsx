// import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";
// import { setError } from "../features/auth/authSlice";

// const API_URL = import.meta.env.VITE_API_URL;

export default function AdminRoute() {
  // const [loading, setLoading] = useState(true);
  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const checkAdmin = async () => {
  //     try {
  //       const { data } = await axios.get(`${API_URL}/api/v1/auth/profile`, {
  //         withCredentials: true,
  //       });

  //       setUser(data.user);
  //     } catch (error) {
  //       setUser(null);
  //       setError(error)
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   checkAdmin();
  // }, []);

  // if (loading) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center bg-gray-100">
  //       <span className="loading loading-spinner loading-lg text-primary"></span>
  //     </div>
  //   );
  // }

  // if (!user) {
  //   return <Navigate to="/login" replace />;
  // }

  // if (user.role !== "admin") {
  //   return <Navigate to="/admin" replace />;
  // }

  //  if (user.role === "admin") {
  //   return <Navigate to="/login" replace />;
  // }

  return <Outlet />;
}