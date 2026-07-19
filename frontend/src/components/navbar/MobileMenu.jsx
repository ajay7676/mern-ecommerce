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
        className={`absolute left-0 top-0 h-full w-80 max-w-[85%] bg-white shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-900">
            Valid Super Store
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 cursor-pointer rounded-full flex items-center justify-center hover:bg-slate-100"
            aria-label="Close menu"
          >
            <FiX className="text-2xl cursor-pointer" />
          </button>
        </div>

        <div className="px-5 py-5 border-b border-slate-100">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-red-500 text-white flex items-center justify-center font-bold">
                {firstLetter}
              </div>

              <div>
                <p className="text-sm font-bold text-slate-900">
                  Hi, {firstName}
                </p>
                <p className="text-xs text-slate-500">{user?.email}</p>
              </div>
            </div>
          ) : (
            <>
              <p className="text-sm font-semibold text-slate-900">
                Welcome to Valid Super Store
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Login for a better shopping experience.
              </p>

              <NavLink
                to="/login"
                onClick={onClose}
                className="btn btn-sm bg-red-500 hover:bg-red-600 text-white border-none rounded-full mt-4"
              >
                Login / Register
              </NavLink>
            </>
          )}
        </div>

        <nav className="py-3">
          {navLinks.map((item) => {
            const isActive = openMenu === item.name;

            return (
              <div key={item.path} className="border-b border-slate-100">
                <button
                  type="button"
                  onClick={() => toggleMenu(item.name)}
                  className={`w-full flex items-center cursor-pointer justify-between px-5 py-4 text-sm font-semibold transition ${
                    isActive
                      ? "text-red-500 bg-red-50"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                  aria-expanded={isActive}
                >
                  <span>{item.name}</span>

                  <FiChevronDown
                    className={`text-lg transition-transform duration-300 ${
                      isActive ? "rotate-180" : "rotate-0"
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
                    <div className="bg-slate-50 px-5 py-4 space-y-5">
                      {item.megaMenu?.map((section) => (
                        <div key={section.title}>
                          <h4 className="text-sm font-bold text-red-500 mb-2">
                            {section.title}
                          </h4>

                          <ul className="grid grid-cols-2 gap-2">
                            {section.items.map((subItem) => (
                              <li key={subItem}>
                                <NavLink
                                  to={`${item.path}?keyword=${encodeURIComponent(
                                    subItem,
                                  )}`}
                                  onClick={onClose}
                                  className="block text-sm text-slate-600 hover:text-red-500 transition"
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

          <NavLink
            to="/cart"
            onClick={onClose}
            className="flex items-center gap-3 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            <FiShoppingBag className="text-lg" />
            Bag
          </NavLink>
        </div>
        {/* Sticky bottom logout */}
        {isAuthenticated && (
          <footer className="border-t border-slate-200 bg-white p-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
            <button
              type="button"
              onClick={() => logoutMutation.mutate()}
              disabled={logoutMutation.isPending}
              className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 text-sm font-semibold text-red-600 transition hover:border-red-300 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoggingOut ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                <FiLogOut className="text-lg" />
              )}

              {isLoggingOut ? "Logging out..." : "Logout"}
            </button>
          </footer>
        )}
      </aside>
    </div>
  );
};

export default MobileMenu;
