import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router";
import { FiChevronDown } from "react-icons/fi";
import clsx from "clsx";
import {ROUTES} from '../../../constants/routes'

const SidebarItem = ({ item, onNavigate }) => {
  const Icon = item.icon;
  const location = useLocation();

  const hasChildren = Boolean(item.children?.length);

  const isChildActive = item.children?.some((child) =>
    location.pathname.startsWith(child.path),
  );

  const [isOpen, setIsOpen] = useState(isChildActive);

  useEffect(() => {
    if (isChildActive) {
      setIsOpen(true);
    }
  }, [isChildActive]);

 if (!hasChildren) {
    return (
      <NavLink
        to={item.path}
        end={item.path === "/admin/products"}
        onClick={onNavigate}
        className={({ isActive }) =>
          [
            "flex min-h-11 items-center gap-3 rounded-xl px-4",
            "text-sm font-medium transition-colors duration-200",
            isActive
              ? "bg-indigo-600 text-white"
              : "text-slate-700 hover:bg-slate-100",
          ].join(" ")
        }
      >
        <Icon className="h-5 w-5 shrink-0" />

        <span>{item.label}</span>
      </NavLink>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsOpen((previous) => !previous)}
        aria-expanded={isOpen}
        className={[
          "flex min-h-11 w-full items-center gap-3 rounded-xl px-4",
          "text-sm font-medium transition-colors duration-200 cursor-pointer",
          isChildActive
            ? "bg-indigo-600 text-white"
            : "text-slate-700 hover:bg-slate-100",
        ].join(" ")}
      >
        <Icon className="h-5 w-5 shrink-0" />

        <span className="flex-1 text-left">{item.label}</span>

        <FiChevronDown
          className={[
            "h-4 w-4 transition-transform duration-200",
            isOpen ? "rotate-180" : "",
          ].join(" ")}
        />
      </button>

      <div
        className={[
          "grid transition-all duration-200",
          isOpen
            ? "mt-1 grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0",
        ].join(" ")}
      >
        <div className="overflow-hidden">
          <div className="ml-6 space-y-1 border-l border-slate-200 py-1 pl-4">
            {item.children.map((child) => {
              const ChildIcon = child.icon;

              return (
                <NavLink
                  key={child.path}
                  to={child.path}
                  onClick={onNavigate}
                  className={({ isActive }) =>
                    [
                      "flex min-h-10 items-center gap-3 rounded-lg px-3",
                      "text-sm transition-colors",
                      isActive
                        ? "bg-indigo-50 font-medium text-indigo-700"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
                    ].join(" ")
                  }
                >
                  <ChildIcon className="h-4 w-4 shrink-0" />

                  <span>{child.label}</span>
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarItem