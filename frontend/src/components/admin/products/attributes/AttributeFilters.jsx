// src/features/admin/attributes/components/AttributeFilters.jsx

import {
  RotateCcw,
  Search,
  SlidersHorizontal,
} from "lucide-react";

const AttributeFilters = ({
  filters,
  onFilterChange,
  onApplyFilters,
  onResetFilters,
  isFetching,
}) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="grid gap-3 lg:grid-cols-[1fr_170px_170px_auto_auto]">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

          <input
            type="text"
            value={filters.search}
            onChange={(event) =>
              onFilterChange(
                "search",
                event.target.value
              )
            }
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                onApplyFilters();
              }
            }}
            placeholder="Search attributes..."
            className="input input-bordered w-full bg-white pl-11"
          />
        </div>

        <select
          value={filters.type}
          onChange={(event) =>
            onFilterChange(
              "type",
              event.target.value
            )
          }
          className="select select-bordered w-full bg-white"
        >
          <option value="all">All Types</option>
          <option value="dropdown">Dropdown</option>
          <option value="switch">Switch</option>
          <option value="text">Text</option>
          <option value="number">Number</option>
          <option value="boolean">Boolean</option>
        </select>

        <select
          value={filters.status}
          onChange={(event) =>
            onFilterChange(
              "status",
              event.target.value
            )
          }
          className="select select-bordered w-full bg-white"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        <button
          type="button"
          onClick={onApplyFilters}
          disabled={isFetching}
          className="btn btn-primary"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filter
        </button>

        <button
          type="button"
          onClick={onResetFilters}
          disabled={isFetching}
          className="btn btn-outline"
        >
          <RotateCcw className="h-4 w-4" />
          Reset
        </button>
      </div>
    </div>
  );
};

export default AttributeFilters;