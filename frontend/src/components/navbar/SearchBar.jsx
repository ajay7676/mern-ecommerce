import { FiSearch } from "react-icons/fi";

const SearchBar = () => {
  return (
    <div className="hidden md:flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-full px-5 py-3 w-[320px] xl:w-105">
      <FiSearch className="text-xl text-slate-500" />
      <input
        type="text"
        placeholder="Search for styles, brands and more..."
        className="w-full bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400"
      />
    </div>
  );
};

export default SearchBar;