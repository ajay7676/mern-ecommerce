import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronDown,
} from "react-icons/fi";

const UserPagination = ({
  page,
  limit,
  pagination,
  onPageChange,
  onLimitChange,
}) => {

   if (!pagination) {
    return null;
  }

   const {
    totalUsers,
    totalPages,
  } = pagination;

  const start =
    totalUsers === 0
      ? 0
      : (page - 1) * limit + 1;

  const end = Math.min(
    page * limit,
    totalUsers
  );

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
        lg:flex-row
        lg:items-center
        lg:justify-between
      "
    >
      <p className="text-sm text-slate-500">
        Showing{" "}
        <span className="font-medium text-slate-700">
          {start} to {end}
        </span>{" "}
        of{" "}
        <span className="font-medium text-slate-700">
          {totalUsers}
        </span>{" "}
        users
      </p>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex gap-2">
          <button
            type="button"
            disabled={page === 1}
            onClick={() =>
              onPageChange(page - 1)
            }
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              border
              border-slate-200
              bg-white
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
          >
            <FiChevronLeft />
          </button>

          {Array.from(
            {
              length: totalPages,
            },
            (_, index) => index + 1
          ).map((pageNumber) => (
            <button
              key={pageNumber}
              type="button"
              onClick={() =>
                onPageChange(pageNumber)
              }
              className={`
                flex
                h-9
                min-w-9
                items-center
                justify-center
                rounded-lg
                border
                px-3
                text-sm
                font-medium
                ${
                  page === pageNumber
                    ? `
                      border-violet-600
                      bg-violet-600
                      text-white
                    `
                    : `
                      border-slate-200
                      bg-white
                      text-slate-600
                      hover:bg-slate-50
                    `
                }
              `}
            >
              {pageNumber}
            </button>
          ))}

          <button
            type="button"
            disabled={page === totalPages}
            onClick={() =>
              onPageChange(page + 1)
            }
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              border
              border-slate-200
              bg-white
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
          >
            <FiChevronRight />
          </button>
        </div>

        <div className="relative">
          <select
            value={limit}
            onChange={(event) =>
              onLimitChange(
                Number(event.target.value)
              )
            }
            className="
              h-9
              appearance-none
              rounded-lg
              border
              border-slate-200
              bg-white
              pl-3
              pr-9
              text-sm
              text-slate-600
              outline-none
            "
          >
            <option value={5}>
              5 / page
            </option>

            <option value={10}>
              10 / page
            </option>

            <option value={20}>
              20 / page
            </option>
          </select>

          <FiChevronDown
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
      </div>
    </div>
  );
};

export default UserPagination;