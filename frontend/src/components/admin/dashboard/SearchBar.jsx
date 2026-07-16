// src/components/dashboard/SearchBar.jsx

import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="mx-auto w-full max-w-220">
      <div
        className="
          flex
          h-14
          items-center
          rounded-2xl
          border
          border-gray-200
          bg-white
          px-5
          shadow-[0_4px_15px_rgba(0,0,0,0.06)]
          transition-all
          duration-200
          focus-within:border-primary
          focus-within:ring-2
          focus-within:ring-primary/20
        "
      >
        <Search
          size={20}
          className="mr-3 text-[#4F6EF7]"
          strokeWidth={2}
        />

        <input
          type="text"
          placeholder="Search Rate Card"
          className="
            h-full
            w-full
            border-none
            bg-transparent
            text-[15px]
            text-gray-700
            placeholder:text-gray-400
            focus:outline-none
          "
        />
      </div>
    </div>
  );
};

export default SearchBar;