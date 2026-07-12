import { useState } from "react";
import { Search } from "lucide-react";
import { FiSearch, FiX } from "react-icons/fi";

const SearchBox = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const clearSearch = () => {};
  return (
    <div className="hidden flex-1 lg:flex w-[320px] xl:w-105">
      <div className="flex items-center gap-3 w-full bg-slate-50 border border-slate-200 rounded-full px-5 py-3 focus-within:border-red-400 focus-within:bg-white transition">
        <FiSearch className="text-xl text-slate-500" />

        <input
          type="text"
          value={searchTerm}
          onFocus={() => setIsFocused(true)}
          placeholder="Search products, orders..."
          className="w-full bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400"
        />

        {searchTerm && (
          <button
            type="button"
            onClick={clearSearch}
            className="text-slate-400 hover:text-red-500 transition cursor-pointer"
            aria-label="Clear search"
          >
            <FiX className="text-lg" />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBox;
