"use client";

import { clsx } from 'clsx';


import Link from "next/link";
import { Menu, Search } from "lucide-react";
import { useEffect, useState } from "react";

import Container from "@/components/common/Container";
import Logo from "@/components/common/Logo";
import HeaderActions from "./HeaderActions";
import MobileNavigation from "./MobileNavigation";
import { navigationItems } from "@/constants/navigation/routes";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined;
    }

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isMenuOpen]);

  return (
    <>
      <header
        className={`
           sticky top-0 z-50 border-b border-slate-200
          bg-white/95 backdrop-blur-lg
          `}
      >
        <Container
          className={` flex min-h-15.5 items-center gap-3
            sm:min-h-17 sm:gap-3
            xl:gap-5
            max-w-8xl mx-auto px-4 py-4 justify-between `}
        >
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Open navigation menu"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen(true)}
              className={clsx(
                "focus-ring btn btn-ghost btn-circle",
                "btn-sm ml-1 lg:hidden xl:hidden",
              )}
            >
              <Menu size={22} />
            </button>
            <Logo />
          </div>
          <nav
            aria-label="Primary navigation"
            className={` 
              hidden min-w-0 flex-1 items-center
              justify-center gap-5 xl:flex 2xl:gap-7
            `}
          >
            {navigationItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`
                   focus-ring whitespace-nowrap rounded-md
                  px-1 py-2 text-[12px] font-medium
                  text-slate-700 transition
                  hover:text-[#ff3047]
                  2xl:text-[13px]
                  `}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <label
            className={`
              hidden h-10 min-w-0 flex-1 items-center
              gap-3 rounded-full border border-slate-200
              bg-slate-50 px-4 transition
              focus-within:border-[#ff3047]
              focus-within:ring-4
              focus-within:ring-[#ff3047]/10
              md:flex md:max-w-77.5
              lg:max-w-90
              xl:max-w-82.5
              2xl:max-w-97.5
              
              `}
          >
            <Search
              aria-hidden="true"
              size={17}
              className="shrink-0 text-slate-500"
            />

            <input
              type="search"
              placeholder="Search for styles, brands and more..."
              aria-label="Search products"
              className={`min-w-0 flex-1 bg-transparent
                text-xs text-slate-900 outline-none
                placeholder:text-slate-400`}
            />
          </label>

          <div className="flex items-center">
            <HeaderActions />
          </div>
        </Container>
      </header>
      <MobileNavigation
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        navigationItems={navigationItems}
      />
    </>
  );
};

export default Header;
