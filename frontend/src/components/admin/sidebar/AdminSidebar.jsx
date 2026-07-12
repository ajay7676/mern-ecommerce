import SidebarLogo from "./SidebarLogo";
import SidebarItem from "./SidebarItem";
import { sidebarMenu } from "./sidebarMenu";

const AdminSidebar = () => {
  return (
    <div className="drawer-side z-40">
      {/* Overlay (mobile only) */}
      <label
        htmlFor="admin-drawer"
        aria-label="close sidebar"
        className="drawer-overlay"
      />

      <aside className="flex h-full w-72 flex-col border-r border-base-300 bg-base-100">
        {/* Logo */}
        <SidebarLogo />

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-1">
            {sidebarMenu.map((item) => (
              <li key={item.id}>
                <SidebarItem item={item} />
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </div>
  )
};

export default AdminSidebar;
