import {
  Bookmark,
  Filter,
  RotateCcw,
  Search,
  Plus,
} from "lucide-react";

const ProductFilters = () => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="grid gap-3 xl:grid-cols-[1fr_190px_190px_190px_190px_auto_auto]">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

          <input
            type="text"
            placeholder="Search by product name, SKU, or barcode..."
            className="input input-bordered h-12 w-full rounded-xl border-slate-200 bg-white pl-12 text-sm"
          />
        </div>

        <FilterSelect label="Category" value="All Categories" />
        <FilterSelect label="Brand" value="All Brands" />
        <FilterSelect label="Status" value="All Status" />
        <FilterSelect label="Stock" value="All Stock" />

        <button
          type="button"
          className="btn h-12 min-h-12 rounded-xl border-slate-200 bg-white px-5 text-slate-800"
        >
          <Filter className="h-4 w-4" />
          More Filters
        </button>

        <button
          type="button"
          className="btn btn-ghost h-12 min-h-12 rounded-xl px-5 text-primary"
        >
          <RotateCcw className="h-4 w-4" />
          Clear All
        </button>
      </div>

      <div className="my-5 border-t border-slate-100" />

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium text-slate-600">
            Active Filters:
          </span>

          <FilterChip label="Status: Published" />
          <FilterChip label="Stock: In Stock" />
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            className="btn h-10 min-h-10 rounded-xl border-slate-200 bg-white px-4 text-slate-800"
          >
            <Bookmark className="h-4 w-4" />
            Saved Views
          </button>

          <button
            type="button"
            className="btn h-10 min-h-10 rounded-xl border-slate-200 bg-white px-4 text-slate-800"
          >
            <Plus className="h-4 w-4" />
            Create View
          </button>
        </div>
      </div>
    </div>
  );
};

const FilterSelect = ({ label, value }) => {
  return (
    <label className="select select-bordered flex h-12 min-h-12 items-center rounded-xl border-slate-200 bg-white">
      <div className="flex flex-col">
        <span className="text-xs font-medium leading-none text-slate-400">
          {label}
        </span>

        <select
          className="mt-1 bg-transparent text-sm font-medium text-slate-800 outline-none"
          defaultValue={value}
        >
          <option>{value}</option>
        </select>
      </div>
    </label>
  );
};

const FilterChip = ({ label }) => {
  return (
    <span className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700">
      {label}
      <button
        type="button"
        className="text-slate-500 hover:text-slate-900"
      >
        ×
      </button>
    </span>
  );
};

export default ProductFilters;