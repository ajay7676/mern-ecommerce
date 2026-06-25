import { NavLink } from "react-router-dom";
import { navLinks } from "../../constants/navigation";
const NavLinks = () => {
  return (
    <>
      <nav className="hidden lg:flex items-center gap-7">
        {navLinks.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `relative
              pb-6
              text-sm
              font-semibold
              transition-all
              ${
                isActive
                  ? "text-red-500 after:absolute after:left-0 after:-bottom-1 after:w-full after:h-0.75 after:bg-red-500"
                  : "text-slate-700 hover:text-red-500"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </>
  );
};

export default NavLinks;
