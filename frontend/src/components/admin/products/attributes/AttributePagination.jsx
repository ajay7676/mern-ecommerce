import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronDown,
} from "react-icons/fi";

const AttributePagination = () => {
  return (
    <div className="flex flex-col gap-4 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-xs text-[#253875] sm:text-sm">
        Showing 1 to 10 of 24 attributes
      </p>

      <div className="flex items-center justify-between gap-4 sm:justify-end">
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled
            className="
              flex h-8 w-8 items-center justify-center
              rounded-md border border-slate-200
              text-slate-300
              disabled:cursor-not-allowed
            "
          >
            <FiChevronLeft size={16} />
          </button>

          <button
            className="
              h-8 w-8 rounded-md
              bg-violet-600
              text-xs font-semibold text-white
            "
          >
            1
          </button>

          <button className="h-8 w-8 rounded-md border border-slate-200 text-xs text-slate-700 hover:bg-slate-50">
            2
          </button>

          <button className="h-8 w-8 rounded-md border border-slate-200 text-xs text-slate-700 hover:bg-slate-50">
            3
          </button>

          <button className="h-8 w-8 rounded-md border border-slate-200 text-xs text-slate-700 hover:bg-slate-50">
            <FiChevronRight size={16} className="mx-auto" />
          </button>
        </div>

        <div className="relative">
          <select
            className="
              h-8 appearance-none
              rounded-md border border-slate-200
              bg-white pl-3 pr-8
              text-xs text-slate-700
              outline-none
            "
            defaultValue="10"
          >
            <option value="10">10 / page</option>
            <option value="20">20 / page</option>
            <option value="50">50 / page</option>
          </select>

          <FiChevronDown
            size={13}
            className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-500"
          />
        </div>
      </div>
    </div>
  );
};

export default AttributePagination;