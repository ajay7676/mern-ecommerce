import { Outlet } from "react-router-dom";
import AdminSidebar from '../components/admin/sidebar/AdminSidebar';
import AdminNavbar from '../components/admin/navbar/AdminNavbar';


const AdminLayout = () => {
  return (
    <div className="drawer lg:drawer-open">
      {/* Mobile Drawer Toggle */}

      <input
        id="admin-drawer"
        type="checkbox"
        className="drawer-toggle"
      />

      {/* Main Content */}

      <div className="drawer-content flex min-h-screen flex-col bg-base-200">
        <AdminNavbar />
        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>

      </div>

      {/* Sidebar */}

      <AdminSidebar />
    </div>

  )
}

export default AdminLayout