import { NavLink } from "react-router-dom";
const menuItems = [
  { name: "Dashboard", path: "/admin", icon: "📊" },
  { name: "Products", path: "/admin/products", icon: "🛍️" },
  { name: "Categories", path: "/admin/categories", icon: "📁" },
  { name: "Orders", path: "/admin/orders", icon: "📦" },
  { name: "Customers", path: "/admin/customers", icon: "👥" },
  { name: "Reviews", path: "/admin/reviews", icon: "⭐" },
  { name: "Coupons", path: "/admin/coupons", icon: "🏷️" },
  { name: "Settings", path: "/admin/settings", icon: "⚙️" },
];
const Sidebar = () => {
  return (
    <aside className="min-h-full w-72 bg-white border-r border-gray-200">
      <div className="h-16 flex items-center px-6 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-bold text-blue-600">ValidBazar</h1>
          <p className="text-xs text-gray-500">Admin Panel</p>
        </div>
      </div>
      <ul className="menu p-4 gap-1 text-gray-700">
        {menuItems.map((item) => (
          <li key={item.name}>
            <NavLink
              to={item.path}
              end={item.path === "/admin"}
              className={({ isActive }) =>
                `rounded-xl font-medium ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "hover:bg-blue-50 hover:text-blue-600"
                }`
              }
            >
              <span>{item.icon}</span>
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
