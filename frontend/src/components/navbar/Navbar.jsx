import { useState,useEffect } from "react";
import { FiMenu, FiBox } from "react-icons/fi";
import NavLinks from "./NavLinks";
import SearchBar from "./SearchBar";
import UserMenu from "./UserMenu";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  

  return (
    <>
      {/* <div className="bg-red-500 text-white text-xs md:text-sm font-semibold py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-center md:justify-between">
          <p>🔥 SUMMER SPOTLIGHT: Up to 60% Off + Extra 10% Off</p>

          <div className="hidden md:flex gap-5">
            <span>Track Order</span>
            <span>Help & Support</span>
            <span>India 🇮🇳</span>
          </div>
        </div>
      </div> */}
      <header className={`bg-white sticky top-0 z-40 ${isScrolled ? "shadow-md": "shadow-sm"}`}>
        <div className="max-w-8xl mx-auto px-4 py-4 flex items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden"
              onClick={() => setIsOpen(true)}
            >
              <FiMenu className="text-2xl cursor-pointer" />
            </button>

            <div className="flex items-center flex-nowrap gap-2">
              <div className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center text-white">
                <FiBox className="text-2xl" />
              </div>
              <h1 className="text-2xl font-bold text-slate-900">
                Valid Super Store
              </h1>
            </div>
          </div>

          <NavLinks />

          <SearchBar />

          <UserMenu />
        </div>

        <div className="md:hidden px-4 pb-4">
          <SearchBar />
        </div>
      </header>

      <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default Navbar;