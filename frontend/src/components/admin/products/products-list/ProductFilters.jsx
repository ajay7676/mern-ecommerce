import {
  Bookmark,
  Filter,
  RotateCcw,
  Search,
  Plus,
  ChevronDown,
} from "lucide-react";
import {
  PRODUCT_STATUS_OPTIONS,
  PRODUCT_STOCK_OPTIONS,
} from '../../../../constants/admin/products/productFilter.constants'

const ProductFilters = ({
  filters,
  categoryOptions = [],
  brandOptions = [],
  onSearchChange,
  onFilterChange,
  onClearFilters,
  onOpenMoreFilters,
  onCreateView,
  onSavedViews,
  hasActiveFilters = false,
}) => {
  return (
    <div className="rounded-3xl border border-base-300 bg-base-100 p-5 shadow-sm">
      <div className="flex flex-col gap-5">
        {/* Top filters */}
        <div className="grid grid-cols-1 gap-3 xl:grid-cols-[1.5fr_0.8fr_0.8fr_0.8fr_0.8fr_auto_auto]">
          {/* Search */}
          <label className="input input-bordered flex h-12 items-center gap-2 rounded-xl bg-base-100">
            <Search className="h-4 w-4 text-base-content/40" />

            <input
              type="text"
              value={filters.search}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search by product name, SKU, or barcode..."
              className="grow text-sm"
            />
          </label>

          {/* Category */}
          <div className="relative">
            <span className="absolute left-3 top-1.5 text-[11px] font-semibold text-base-content/40">
              Category
            </span>

            <select
              value={filters.category}
              onChange={(event) => onFilterChange("category", event.target.value)}
              className="select select-bordered h-12 w-full rounded-xl pt-1 text-sm font-semibold"
            >
              <option value="all">All Categories</option>

              {categoryOptions.map((category) => (
                <option key={category._id || category.id} value={category._id || category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Brand */}
          <div className="relative">
            <span className="absolute left-3 top-1.5 text-[11px] font-semibold text-base-content/40">
              Brand
            </span>

            <select
              value={filters.brand}
              onChange={(event) => onFilterChange("brand", event.target.value)}
              className="select select-bordered h-12 w-full rounded-xl pt-1 text-sm font-semibold"
            >
              <option value="all">All Brands</option>

              {brandOptions.map((brand) => (
                <option key={brand._id || brand.id} value={brand._id || brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div className="relative">
            <span className="absolute left-3 top-1.5 text-[11px] font-semibold text-base-content/40">
              Status
            </span>

            <select
              value={filters.status}
              onChange={(event) => onFilterChange("status", event.target.value)}
              className="select select-bordered h-12 w-full rounded-xl pt-1 text-sm font-semibold"
            >
              {PRODUCT_STATUS_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Stock */}
          <div className="relative">
            <span className="absolute left-3 top-1.5 text-[11px] font-semibold text-base-content/40">
              Stock
            </span>

            <select
              value={filters.stockStatus}
              onChange={(event) =>
                onFilterChange("stockStatus", event.target.value)
              }
              className="select select-bordered h-12 w-full rounded-xl pt-1 text-sm font-semibold"
            >
              {PRODUCT_STOCK_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* More Filters */}
          <button
            type="button"
            onClick={onOpenMoreFilters}
            className="btn btn-outline h-12 rounded-xl"
          >
            <Filter className="h-4 w-4" />
            More Filters
            <ChevronDown className="h-4 w-4" />
          </button>

          {/* Clear */}
          <button
            type="button"
            onClick={onClearFilters}
            disabled={!hasActiveFilters}
            className="btn btn-ghost h-12 rounded-xl text-primary disabled:text-base-content/30"
          >
            <RotateCcw className="h-4 w-4" />
            Clear All
          </button>
        </div>

        <div className="border-t border-base-300" />

        {/* Bottom actions */}
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div className="text-sm font-semibold text-base-content/60">
            Active Filters
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onSavedViews}
              className="btn btn-outline btn-sm h-10 rounded-xl"
            >
              <Bookmark className="h-4 w-4" />
              Saved Views
            </button>

            <button
              type="button"
              onClick={onCreateView}
              className="btn btn-outline btn-sm h-10 rounded-xl"
            >
              <Plus className="h-4 w-4" />
              Create View
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;