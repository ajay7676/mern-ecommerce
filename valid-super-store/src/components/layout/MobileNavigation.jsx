"use client";

import Link from "next/link";
import { Search, X } from "lucide-react";

const MobileNavigation = ({
  isOpen,
  onClose,
  navigationItems,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="
        fixed inset-0 z-100 bg-black/40
        backdrop-blur-[2px] xl:hidden
      "
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
      onClick={onClose}
    >
      <div
        className="
          ml-auto flex h-full w-[min(88%,360px)]
          flex-col bg-white shadow-2xl
        "
        onClick={(event) => event.stopPropagation()}
      >
        <div
          className="
            flex h-16 items-center justify-between
            border-b border-slate-200 px-5
          "
        >
          <p className="font-black text-[#101828]">Menu</p>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation menu"
            className="
              focus-ring btn btn-ghost btn-circle btn-sm
            "
          >
            <X size={22} />
          </button>
        </div>

        <div className="border-b border-slate-200 p-4">
          <label
            className="
              flex h-11 items-center gap-3 rounded-full
              border border-slate-200 bg-slate-50 px-4
              focus-within:border-[#ff3047]
            "
          >
            <Search
              aria-hidden="true"
              size={18}
              className="shrink-0 text-slate-500"
            />

            <input
              type="search"
              placeholder="Search products..."
              aria-label="Search products"
              className="
                min-w-0 flex-1 bg-transparent text-sm
                text-slate-900 outline-none
                placeholder:text-slate-400
              "
            />
          </label>
        </div>

        <nav
          className="flex-1 overflow-y-auto p-3"
          aria-label="Mobile navigation links"
        >
          {navigationItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={onClose}
              className="
                focus-ring block rounded-xl px-4 py-3
                text-sm font-semibold text-slate-700
                transition hover:bg-slate-100
                hover:text-[#ff3047]
              "
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default MobileNavigation;