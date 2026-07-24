import clsx from "clsx";
import { NavLink } from "react-router-dom";

const SidebarNavItem = ({ item, onClick }) => {
  const Icon = item.icon;

  return (
    <NavLink
      to={item.path}
      onClick={onClick}
      className={({ isActive }) =>
        clsx(
          "group flex min-h-11 items-center gap-3 rounded-lg px-3 py-2.5",
          "text-sm font-medium transition-colors duration-200",
          isActive
            ? "bg-indigo-50 text-indigo-600"
            : "text-slate-700 hover:bg-slate-50 hover:text-indigo-600",
        )
      }
    >
      {({ isActive }) => (
        <>
          <Icon
            className={clsx(
              "h-4.75 w-4.75 shrink-0",
              isActive
                ? "text-indigo-600"
                : "text-slate-500 group-hover:text-indigo-600",
            )}
          />

          <span>{item.label}</span>
        </>
      )}
    </NavLink>
  );
};

export default SidebarNavItem;