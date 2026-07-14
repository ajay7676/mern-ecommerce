import { Search } from "lucide-react";
import { useState } from "react";

const SearchSection = () => {
  const [keyword, setKeyword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO:
    // Global dashboard search
    console.log(keyword);
  };

  return (
    <section className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-base-content">
          Search Dashboard
        </h2>

        <p className="mt-1 text-sm text-base-content/60">
          Quickly search products, orders, customers, and more.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:flex-row">
        {/* Search Input */}

        <label className="input input-bordered flex flex-1 items-center gap-3">
          <Search size={18} className="text-base-content/50" />

          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search anything..."
            className="grow"
          />
        </label>

        {/* Button */}

        <button type="submit" className="btn btn-primary px-8">
          Search
        </button>
      </form>
    </section>
  );
};

export default SearchSection;
