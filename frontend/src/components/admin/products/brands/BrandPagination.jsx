import {
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

const buttonClass = `
  grid
  h-8
  min-w-8
  place-items-center
  rounded-md
  border
  border-slate-200
  bg-white
  px-2
  text-xs
  text-slate-600
  hover:bg-slate-50
`;

const BrandPagination = ({
  page,
  totalPages,
  total,
  limit,
  onPageChange,
  onLimitChange,
}) => {
  const start =
    total === 0
      ? 0
      : (page - 1) * limit + 1;

  const end =
    Math.min(
      page * limit,
      total,
    );

  return (
    <footer
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
      <p className="text-[11px] text-slate-500">
        Showing {start} to {end} of {total} brands
      </p>

      <div
        className="
          flex
          flex-wrap
          items-center
          gap-3
        "
      >
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={page === 1}
            onClick={() =>
              onPageChange(
                page - 1,
              )
            }
            className={`${buttonClass} disabled:opacity-40`}
          >
            <FiChevronLeft />
          </button>

          {Array.from(
            {
              length:
                totalPages,
            },
            (_, index) =>
              index + 1,
          ).map(
            (pageNumber) => (
              <button
                type="button"
                key={pageNumber}
                onClick={() =>
                  onPageChange(
                    pageNumber,
                  )
                }
                className={
                  page ===
                  pageNumber
                    ? `
                      grid
                      h-8
                      min-w-8
                      place-items-center
                      rounded-md
                      bg-violet-600
                      px-2
                      text-xs
                      font-semibold
                      text-white
                    `
                    : buttonClass
                }
              >
                {pageNumber}
              </button>
            ),
          )}

          <button
            type="button"
            disabled={
              page ===
              totalPages
            }
            onClick={() =>
              onPageChange(
                page + 1,
              )
            }
            className={`${buttonClass} disabled:opacity-40`}
          >
            <FiChevronRight />
          </button>
        </div>

        <div className="relative">
          <select
            value={limit}
            onChange={(event) =>
              onLimitChange(
                Number(
                  event.target
                    .value,
                ),
              )
            }
            className="
              h-8
              min-w-27.5
              appearance-none
              rounded-md
              border
              border-slate-200
              bg-white
              pl-3
              pr-8
              text-[11px]
              text-slate-600
              outline-none
            "
          >
            <option value={10}>
              10 / page
            </option>

            <option value={20}>
              20 / page
            </option>

            <option value={50}>
              50 / page
            </option>
          </select>

          <FiChevronDown
            size={13}
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
      </div>
    </footer>
  );
};

export default BrandPagination;