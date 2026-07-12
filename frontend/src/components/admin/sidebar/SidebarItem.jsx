import { NavLink } from "react-router-dom";
import clsx from "clsx";
import {ROUTES} from '../../../constants/routes'

const SidebarItem = ({ item }) => {
   const Icon = item.icon;
  return (
    <NavLink
      to={item.path}
      end={item.path === ROUTES.ADMIN.DASHBOARD}
      className={({ isActive }) =>
        clsx(
          "group flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
          "hover:bg-base-200",
          {
            "bg-primary text-primary-content shadow-sm": isActive,
            "text-base-content": !isActive,
          }
        )
      }
    >
      <div className="flex items-center gap-3">
        <Icon size={20} className="shrink-0" />

        <span>{item.label}</span>
      </div>

      {item.badge && (
        <span className="badge badge-primary badge-sm">
          {item.badge}
        </span>
      )}
    </NavLink>
  )
}

export default SidebarItem