import {
  FiSearch,
  FiFilter,
  FiCalendar,
  FiRotateCcw,
  FiChevronDown,
} from "react-icons/fi";

const FilterSelect = ({ label, value, onChange, children }) => {
  return (
    <div className="relative">
      <select
        aria-label={label}
        value={value}
        onChange={onChange}
        className="
          h-11
          min-w-35
          appearance-none
          rounded-lg
          border
          border-slate-200
          bg-white
          px-4
          pr-10
          text-sm
          text-slate-600
          outline-none
          transition
          focus:border-violet-400
          focus:ring-2
          focus:ring-violet-100
        "
      >
        {children}
      </select>

      <FiChevronDown
        size={16}
        className="
          pointer-events-none
          absolute
          right-3
          top-1/2
          -translate-y-1/2
          text-slate-400
        "
      />
    </div>
  );
};

const UserFilters = ({
  search,
  setSearch,
  role,
  setRole,
  status,
  setStatus,
  onClear,
}) => {
  return (
    <div
      className="
        flex
        flex-col
        gap-3
        border-b
        border-slate-200
        p-5
        xl:flex-row
        xl:items-center
        xl:justify-between
      "
    >
      <div className="flex flex-1 flex-col gap-3 sm:flex-row">
        <div className="relative w-full max-w-78.50">
          <FiSearch
            size={18}
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-slate-400
            "
          />

          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by name, email or phone..."
            className="
              h-11
              w-full
              rounded-lg
              border
              border-slate-200
              bg-white
              pl-11
              pr-4
              text-sm
              text-slate-700
              outline-none
              placeholder:text-slate-400
              focus:border-violet-400
              focus:ring-2
              focus:ring-violet-100
            "
          />
        </div>

        <button
          type="button"
          className="
            flex
            h-11
            items-center
            justify-center
            gap-2
            rounded-lg
            border
            border-slate-200
            bg-white
            px-5
            text-sm
            font-medium
            text-slate-700
            hover:bg-slate-50
          "
        >
          <FiFilter size={18} />
          Filters
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <FilterSelect
          label="Filter by role"
          value={role}
          onChange={(event) => setRole(event.target.value)}
        >
          <option value="">Role</option>
          <option value="User">User</option>
          <option value="Admin">Admin</option>
        </FilterSelect>

        <FilterSelect
          label="Filter by status"
          value={status}
          onChange={(event) => setStatus(event.target.value)}
        >
          <option value="">Status</option>
          <option value="Active">Active</option>
          <option value="Pending">Pending</option>
          <option value="Blocked">Blocked</option>
        </FilterSelect>

        <button
          type="button"
          className="
            flex
            h-11
            min-w-36.25
            items-center
            justify-between
            rounded-lg
            border
            border-slate-200
            bg-white
            px-4
            text-sm
            text-slate-600
          "
        >
          Joined Date
          <FiCalendar size={17} />
        </button>

        <div className="hidden h-10 w-px bg-slate-200 xl:block" />

        <button
          type="button"
          onClick={onClear}
          className="
            flex
            h-11
            items-center
            gap-2
            px-2
            text-sm
            font-medium
            text-violet-600
            hover:text-violet-800
          "
        >
          <FiRotateCcw size={17} />
          Clear All
        </button>
      </div>
    </div>
  );
};

export default UserFilters;
