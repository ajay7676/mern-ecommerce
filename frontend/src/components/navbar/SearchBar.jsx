import { useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import useDebounce from "../../hooks/useDebounce";
import useSearchProducts from "../../hooks/queries/useSearchProducts";
import SearchDropdown from "./SearchDropdown";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const debouncedSearch = useDebounce(searchTerm, 300);

  const { data, isPending, isError } = useSearchProducts(debouncedSearch);
  const products = data?.products || [];

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };
  const closeDropdown = () => {
    setIsFocused(false);
    setSearchTerm("");
  };
  const showDropdown = isFocused && searchTerm.trim().length > 1;
   console.log(showDropdown)

  return (
    <div className="relative hidden md:flex items-center w-[320px] xl:w-105">
      <div className="flex items-center gap-3 w-full bg-slate-50 border border-slate-200 rounded-full px-5 py-3 focus-within:border-red-400 focus-within:bg-white transition">
        <FiSearch className="text-xl text-slate-500" />

        <input
          type="text"
          value={searchTerm}
          onChange={handleChange}
           onFocus={() => setIsFocused(true)}
          placeholder="Search for styles, brands and more..."
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
      {showDropdown && (
        <SearchDropdown
          products={products}
          isPending={isPending}
          isError={isError}
          searchTerm={searchTerm}
          onClose={closeDropdown}
        />
      )}
    </div>
  );
};

export default SearchBar;
