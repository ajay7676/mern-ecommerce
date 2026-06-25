import { FiX } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import {navLinks} from '../../constants/navigation'
const MobileMenu = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed inset-0 z-50 bg-black/40 lg:hidden ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="w-72 h-full bg-white p-5 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Valid India</h2>
          <button onClick={onClose}>
            <FiX className="text-2xl" />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {navLinks.map((item) => (
            <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `
              relative
              text-sm
              font-semibold
              transition-colors
              duration-300

              ${
                isActive
                  ? "text-blue-500"
                  : "text-slate-700 hover:text-red-500"
              }
            `
          }
        >
          {item.name}
        </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;