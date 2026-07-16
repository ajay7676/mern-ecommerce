// src/components/dashboard/SearchHero.jsx

import SearchBar from "./SearchBar";

const SearchHero = () => {
  return (
    <section className="relative bg-[#DFE7FA]">
      {/* Hero */}
      <div className="mx-auto flex  max-w-360 flex-col items-center pt-5">
        <h1 className="text-[34px] font-semibold tracking-[-0.5px] text-gray-900">
          Search Anything
        </h1>

        <div className="mt-7 w-full p-6 pb-20">
          <SearchBar />
        </div>
      </div>

      {/* White section below */}
      <div className="h-30 bg-white" />
    </section>
  );
};

export default SearchHero;