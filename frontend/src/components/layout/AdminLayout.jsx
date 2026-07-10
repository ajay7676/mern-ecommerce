import { Outlet } from "react-router-dom";
import Navbar from "../../components/admin/Navbar";
import Sidebar from "../../components/admin/Sidebar";
const AdminLayout = () => {
  return (
    <div className="drawer lg:drawer-open" data-theme="light">
      <input id="admin-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col min-h-screen bg-gray-100">
        <Navbar />
        <main className="p-4 lg:p-6">
          <Outlet />
        </main>
      </div>

      <div className="drawer-side z-40">
        <label
          htmlFor="admin-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <Sidebar />
      </div>
    </div>
  );
};

export default AdminLayout;
