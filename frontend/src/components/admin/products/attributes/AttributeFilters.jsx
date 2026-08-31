import {
  FiChevronDown,
  FiFilter,
  FiRotateCcw,
  FiSearch,
} from "react-icons/fi";

const selectClass = `
  h-10 w-full rounded-lg
  border border-slate-200
  bg-white px-3 pr-9
  text-sm text-slate-800
  outline-none
  transition
  focus:border-violet-500
  focus:ring-2 focus:ring-violet-100
`;

const AttributeFilters = ({
  search,
  type,
  status,
  onSearchChange,
  onTypeChange,
  onStatusChange,
  onFilter,
  onReset,
}) => {
  return (
    <section className="rounded-lg border border-slate-100 bg-white p-3 shadow-sm sm:p-4">
      <div className="grid gap-3 lg:grid-cols-[minmax(240px,1fr)_170px_170px_auto_auto]">
        {/* Search */}
        <div className="relative">
          <FiSearch
            size={17}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
          />

          <input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search attributes..."
            className="
              h-10 w-full rounded-lg
              border border-slate-200
              bg-white pl-10 pr-3
              text-sm text-slate-800
              outline-none
              placeholder:text-slate-400
              focus:border-violet-500
              focus:ring-2 focus:ring-violet-100
            "
          />
        </div>

        {/* Type */}
        <div className="relative">
          <select
            value={type}
            onChange={(e) => onTypeChange(e.target.value)}
            className={`${selectClass} appearance-none`}
          >
            <option value="">All Types</option>
            <option value="Dropdown">Dropdown</option>
            <option value="Switch">Switch</option>
            <option value="Text">Text</option>
            <option value="Number">Number</option>
            <option value="Boolean">Boolean</option>
          </select>

          <FiChevronDown
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
            size={15}
          />
        </div>

        {/* Status */}
        <div className="relative">
          <select
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
            className={`${selectClass} appearance-none`}
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <FiChevronDown
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
            size={15}
          />
        </div>

        {/* Filter */}
        <button
          type="button"
          onClick={onFilter}
          className="
            flex h-10 items-center justify-center
            gap-2 rounded-lg
            bg-violet-600 px-5
            text-sm font-semibold text-white
            transition hover:bg-violet-700
          "
        >
          <FiFilter size={16} />
          Filter
        </button>

        {/* Reset */}
        <button
          type="button"
          onClick={onReset}
          className="
            flex h-10 items-center justify-center
            gap-2 rounded-lg
            border border-slate-200
            bg-white px-5
            text-sm font-semibold text-slate-800
            transition hover:bg-slate-50
          "
        >
          <FiRotateCcw size={15} />
          Reset
        </button>
      </div>
    </section>
  );
};

export default AttributeFilters;