import MarketplaceTabs from "./MarketplaceTabs";
import {
  HiOutlineChevronDown,
  HiOutlineMagnifyingGlass,
} from "react-icons/hi2";

const ListingsHeader = () => {
  return (
    <header className="space-y-5">
      {/* Top Row */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        {/* Left Section */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight text-base-content">
            All Listings
          </h1>

          <MarketplaceTabs />
        </div>

        {/* Right Section */}
        <div className="flex flex-wrap items-center gap-3 lg:justify-end">
          {/* Search */}
          <button
            type="button"
            aria-label="Search Listings"
            className="btn btn-outline btn-square"
          >
            <HiOutlineMagnifyingGlass className="h-5 w-5" />
          </button>

          {/* Add Listing */}
          <button
            type="button"
            className="btn btn-primary gap-2 normal-case"
          >
            Add Listing

            <HiOutlineChevronDown className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default ListingsHeader;