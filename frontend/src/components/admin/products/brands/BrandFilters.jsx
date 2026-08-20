import {
  FiChevronDown,
  FiFilter,
  FiRefreshCw,
  FiSearch,
} from "react-icons/fi";

const BrandFilters = ({
  search,
  status,
  onSearchChange,
  onStatusChange,
  onFilter,
  onReset,
}) => {
  return (
    <section
      className="
        mt-5
        rounded-xl
        border
        border-slate-200
        bg-white
        p-4
        shadow-[0_1px_4px_rgba(15,23,42,0.03)]
      "
    >
      <div
        className="
          grid
          grid-cols-1
          gap-3
          md:grid-cols-2
          xl:grid-cols-[minmax(280px,1.6fr)_190px_105px_100px]
        "
      >
        <div className="relative">
          <input
            value={search}
            onChange={(event) =>
              onSearchChange(event.target.value)
            }
            placeholder="Search brands..."
            className="
              h-9.5
              w-full
              rounded-lg
              border
              border-slate-200
              bg-white
              px-4
              pr-11
              text-[13px]
              text-slate-700
              outline-none
              placeholder:text-slate-400
              focus:border-violet-400
              focus:ring-2
              focus:ring-violet-100
            "
          />

          <FiSearch
            size={17}
            className="
              absolute
              right-4
              top-1/2
              -translate-y-1/2
              text-slate-500
            "
          />
        </div>

        <div className="relative">
          <select
            value={status}
            onChange={(event) =>
              onStatusChange(event.target.value)
            }
            className="
              h-9.5
              w-full
              appearance-none
              rounded-lg
              border
              border-slate-200
              bg-white
              px-4
              pr-10
              text-[13px]
              text-slate-700
              outline-none
              focus:border-violet-400
              focus:ring-2
              focus:ring-violet-100
            "
          >
            <option value="">
              All Status
            </option>

            <option value="active">
              Active
            </option>

            <option value="inactive">
              Inactive
            </option>
          </select>

          <FiChevronDown
            size={14}
            className="
              pointer-events-none
              absolute
              right-3
              top-1/2
              -translate-y-1/2
              text-slate-500
            "
          />
        </div>

        <button
          type="button"
          onClick={onFilter}
          className="
            inline-flex
            h-9.5
            items-center
            justify-center
            gap-2
            rounded-lg
            bg-violet-600
            px-4
            text-[13px]
            font-semibold
            text-white
            hover:bg-violet-700
          "
        >
          <FiFilter size={16} />
          Filter
        </button>

        <button
          type="button"
          onClick={onReset}
          className="
            inline-flex
            h-9.5
            items-center
            justify-center
            gap-2
            rounded-lg
            border
            border-slate-200
            bg-white
            px-4
            text-[13px]
            font-semibold
            text-slate-700
            hover:bg-slate-50
          "
        >
          <FiRefreshCw size={15} />
          Reset
        </button>
      </div>
    </section>
  );
};

export default BrandFilters;