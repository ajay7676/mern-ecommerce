import { useState } from "react";
import { NavLink } from "react-router-dom";
import { navLinks } from "../../constants/navigation";
import MegaMenu from "./MegaMenu";

const NavLinks = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  return (
    <>
      <nav className="hidden lg:flex items-center gap-7"
       onMouseLeave={() => setActiveMenu(null)}
      >
        { navLinks.map((item) => (
        <div
          key={item.path}
          className="relative"
          onMouseEnter={() => setActiveMenu(item.name)}
        >
          <NavLink
            to={item.path}
            className={({ isActive }) =>
              `relative
              pb-2
              text-sm
              font-semibold
              transition-all
              ${
                isActive
                  ? "text-purple-500 after:absolute after:left-0 after:-bottom-1 after:w-full after:h-0.75 after:bg-purple-500"
                  : "text-slate-700 hover:text-red-500"
              }`
            }
          >
            {item.name}
          </NavLink>
          <div
            className={`fixed w-3xl mx-auto left-80 top-24 transition-all duration-300 ease-out ${
              activeMenu === item.name
                ? "opacity-100 visible translate-y-0"
                : "opacity-0 invisible -translate-y-3"
            }`}
          >
            <MegaMenu menu={item.megaMenu} />
          </div>
          </div>

        ))
        }
      
      </nav>
    </>
  );
};

export default NavLinks;
