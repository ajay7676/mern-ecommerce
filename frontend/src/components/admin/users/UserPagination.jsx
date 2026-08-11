import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronDown,
} from "react-icons/fi";

const pageButtonClass =
  "flex h-9 min-w-9 items-center justify-center rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-600 hover:bg-slate-50";

const UserPagination = () => {
  return (
    <div
      className="
        flex
        flex-col
        gap-4
        border-t
        border-slate-200
        px-5
        py-4
        md:flex-row
        md:items-center
        md:justify-between
      "
    >
      <p className="text-sm text-slate-500">
        Showing <span className="font-medium">1 to 10</span> of{" "}
        <span className="font-medium">128</span> users
      </p>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled
            className={`${pageButtonClass} disabled:cursor-not-allowed disabled:opacity-40`}
          >
            <FiChevronLeft />
          </button>

          <button
            type="button"
            className="
              flex
              h-9
              min-w-9
              items-center
              justify-center
              rounded-lg
              bg-violet-600
              px-3
              text-sm
              font-medium
              text-white
              shadow-sm
            "
          >
            1
          </button>

          {[2, 3, 4, 5].map((page) => (
            <button
              key={page}
              type="button"
              className={pageButtonClass}
            >
              {page}
            </button>
          ))}

          <button
            type="button"
            className={pageButtonClass}
          >
            ...
          </button>

          <button
            type="button"
            className={pageButtonClass}
          >
            13
          </button>

          <button
            type="button"
            className={pageButtonClass}
          >
            <FiChevronRight />
          </button>
        </div>

        <button
          type="button"
          className="
            flex
            h-9
            min-w-27.5
            items-center
            justify-between
            rounded-lg
            border
            border-slate-200
            bg-white
            px-4
            text-sm
            text-slate-500
          "
        >
          10 / page
          <FiChevronDown />
        </button>
      </div>
    </div>
  );
};

export default UserPagination;