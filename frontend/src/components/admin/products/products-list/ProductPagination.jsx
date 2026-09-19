import { ChevronLeft, ChevronRight } from "lucide-react";

const LIMIT_OPTIONS = [10, 20, 50, 100];

const getVisiblePages = ({ currentPage, totalPages }) => {
  const pages = [];

  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  pages.push(1);

  if (currentPage > 4) {
    pages.push("left-ellipsis");
  }

  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  for (let page = start; page <= end; page += 1) {
    pages.push(page);
  }

  if (currentPage < totalPages - 3) {
    pages.push("right-ellipsis");
  }

  pages.push(totalPages);

  return pages;
};

const ProductPagination = ({
  pagination,
  onPageChange,
  onLimitChange,
  isLoading = false,
}) => {
  if (!pagination) return null;

  const {
    page = 1,
    limit = 10,
    totalProducts = 0,
    totalPages = 1,
    hasNextPage = false,
    hasPrevPage = false,
  } = pagination;

  if (totalProducts === 0) return null;

  const startItem = (page - 1) * limit + 1;
  const endItem = Math.min(page * limit, totalProducts);

  const visiblePages = getVisiblePages({
    currentPage: page,
    totalPages,
  });

  const handlePageChange = (nextPage) => {
    if (isLoading) return;
    if (nextPage < 1 || nextPage > totalPages) return;
    if (nextPage === page) return;

    onPageChange?.(nextPage);
  };

  const handleLimitChange = (event) => {
    const nextLimit = Number(event.target.value);

    onLimitChange?.(nextLimit);
  };

  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-base-300 bg-base-100 px-4 py-4 shadow-sm lg:flex-row lg:items-center lg:justify-between">
      {/* Left info */}
      <div className="text-sm text-base-content/70">
        Showing{" "}
        <span className="font-semibold text-base-content">{startItem}</span> to{" "}
        <span className="font-semibold text-base-content">{endItem}</span> of{" "}
        <span className="font-semibold text-base-content">
          {" "}
          {totalProducts}
        </span>{" "}
        products
      </div>

      {/* Right controls */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {/* Limit selector */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-base-content/60">Rows</span>

          <select
            value={limit}
            onChange={handleLimitChange}
            disabled={isLoading}
            className="select select-bordered select-sm rounded-xl"
          >
            {LIMIT_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Pagination buttons */}
        <div className="join">
          <button
            type="button"
            onClick={() => handlePageChange(page - 1)}
            disabled={!hasPrevPage || isLoading}
            className="btn join-item btn-sm rounded-l-xl"
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {visiblePages.map((pageItem) => {
            if (typeof pageItem === "string") {
              return (
                <button
                  key={pageItem}
                  type="button"
                  disabled
                  className="btn join-item btn-sm"
                >
                  ...
                </button>
              );
            }

            return (
              <button
                key={pageItem}
                type="button"
                onClick={() => handlePageChange(pageItem)}
                disabled={isLoading}
                className={`btn join-item btn-sm ${
                  pageItem === page ? "btn-primary text-white" : ""
                }`}
              >
                {pageItem}
              </button>
            );
          })}

          <button
            type="button"
            onClick={() => handlePageChange(page + 1)}
            disabled={!hasNextPage || isLoading}
            className="btn join-item btn-sm rounded-r-xl"
            aria-label="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPagination;