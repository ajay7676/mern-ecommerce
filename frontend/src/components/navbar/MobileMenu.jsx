import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FiChevronDown,
  FiHeart,
  FiLogOut,
  FiShoppingBag,
  FiUser,
  FiX,
} from "react-icons/fi";

import { navLinks } from "../../constants/navigation";
import { useSelector } from "react-redux";
import useLogout from "../../hooks/mutations/useLogout";

const MobileMenu = ({ isOpen, onClose, isLoggingOut = false }) => {
  const [openMenu, setOpenMenu] = useState(null);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const firstName = user?.name?.split(" ")[0];
  const firstLetter = user?.name?.charAt(0)?.toUpperCase();
  const logoutMutation = useLogout();
  const toggleMenu = (menuName) => {
    setOpenMenu((prev) => (prev === menuName ? null : menuName));
  };

  useEffect(() => {
    if (!isOpen) {
      setOpenMenu(null);
    }
  }, [isOpen]);

  return (
    <div
      className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${
        isOpen ? "visible" : "invisible"
      }`}
    >
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

     <aside
  className={`absolute left-0 top-0 flex h-dvh w-80 max-w-[85%]
    flex-col overflow-hidden bg-white shadow-2xl
    transition-transform duration-300 ease-out ${
      isOpen ? "translate-x-0" : "-translate-x-full"
    }`}
>
  {/* Fixed header */}
  <div className="shrink-0">
    <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
      <h2 className="text-xl font-bold text-slate-900">
        Valid Super Store
      </h2>

      <button
        type="button"
        onClick={onClose}
        className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-slate-100"
        aria-label="Close menu"
      >
        <FiX className="text-2xl" />
      </button>
    </div>

    <div className="border-b border-slate-100 px-5 py-5">
      {isAuthenticated ? (
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-500 font-bold text-white">
            {firstLetter}
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-slate-900">
              Hi, {firstName}
            </p>

            <p className="truncate text-xs text-slate-500">
              {user?.email}
            </p>
          </div>
        </div>
      ) : (
        <>
          <p className="text-sm font-semibold text-slate-900">
            Welcome to Valid Super Store
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Login for a better shopping experience.
          </p>

          <NavLink
            to="/login"
            onClick={onClose}
            className="mt-4 inline-flex rounded-full bg-red-500 px-4 py-2 text-sm font-semibold text-white"
          >
            Login / Register
          </NavLink>
        </>
      )}
    </div>
  </div>

  {/* Scrollable middle area */}
  <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
    <nav className="py-3">
      {navLinks.map((item) => {
        const isActive = openMenu === item.name;

        return (
          <div key={item.name} className="border-b border-slate-100">
            <button
              type="button"
              onClick={() => toggleMenu(item.name)}
              className={`flex w-full items-center justify-between px-5 py-4 text-sm font-semibold ${
                isActive
                  ? "bg-red-50 text-red-500"
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              <span>{item.name}</span>

              <FiChevronDown
                className={`transition-transform duration-300 ${
                  isActive ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`grid transition-all duration-300 ${
                isActive
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="space-y-5 bg-slate-50 px-5 py-4">
                  {item.megaMenu?.map((section) => (
                    <div key={section.title}>
                      <h4 className="mb-2 text-sm font-bold text-red-500">
                        {section.title}
                      </h4>

                      <ul className="grid grid-cols-2 gap-2">
                        {section.items.map((subItem) => (
                          <li key={subItem}>
                            <NavLink
                              to={`${item.path}?keyword=${encodeURIComponent(
                                subItem
                              )}`}
                              onClick={onClose}
                              className="block text-sm text-slate-600 hover:text-red-500"
                            >
                              {subItem}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </nav>

    <div className="border-t border-slate-100 py-3">
      {isAuthenticated && (
        <>
          <NavLink
            to="/profile"
            onClick={onClose}
            className="flex items-center gap-3 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            <FiUser className="text-lg" />
            Profile
          </NavLink>

          <NavLink
            to="/wishlist"
            onClick={onClose}
            className="flex items-center gap-3 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            <FiHeart className="text-lg" />
            Wishlist
          </NavLink>
        </>
      )}

      <NavLink
        to="/cart"
        onClick={onClose}
        className="flex items-center gap-3 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
      >
        <FiShoppingBag className="text-lg" />
        Bag
      </NavLink>
    </div>
  </div>

  {/* Always visible logout footer */}
  {isAuthenticated && (
    <div
      className="shrink-0 border-t border-slate-200 bg-white px-4 pt-4
        pb-[calc(1rem+env(safe-area-inset-bottom))]"
    >
      <button
        type="button"
        onClick={() => logoutMutation.mutate()}
        disabled={logoutMutation.isPending}
        className="flex min-h-12 w-full items-center justify-center gap-2
          rounded-xl border border-red-300 bg-red-50
          text-sm font-semibold text-red-600
          hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <FiLogOut className="text-lg" />

        {isLoggingOut ? "Logging out..." : "Logout"}
      </button>
    </div>
  )}
</aside>
    </div>
  );
};

export default MobileMenu;
