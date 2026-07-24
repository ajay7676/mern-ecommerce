import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import clsx from "clsx";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const visiblePages = [1, 2, 3];

  const goToPreviousPage = () => {
    onPageChange(Math.max(currentPage - 1, 1));
  };

  const goToNextPage = () => {
    onPageChange(Math.min(currentPage + 1, totalPages));
  };

  return (
    <nav
      aria-label="Order pagination"
      className="flex items-center justify-center gap-2"
    >
      <PaginationButton
        label="Previous page"
        disabled={currentPage === 1}
        onClick={goToPreviousPage}
      >
        <FiChevronLeft />
      </PaginationButton>

      {visiblePages.map((page) => (
        <PaginationButton
          key={page}
          active={currentPage === page}
          onClick={() => onPageChange(page)}
        >
          {page}
        </PaginationButton>
      ))}

      {totalPages > 4 && (
        <>
          <span className="px-2 text-sm text-slate-500">...</span>

          <PaginationButton
            active={currentPage === totalPages}
            onClick={() => onPageChange(totalPages)}
          >
            {totalPages}
          </PaginationButton>
        </>
      )}

      <PaginationButton
        label="Next page"
        disabled={currentPage === totalPages}
        onClick={goToNextPage}
      >
        <FiChevronRight />
      </PaginationButton>
    </nav>
  );
};

const PaginationButton = ({
  children,
  active = false,
  disabled = false,
  label,
  onClick,
}) => {
  return (
    <button
      type="button"
      aria-label={label}
      aria-current={active ? "page" : undefined}
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        "flex h-10 min-w-10 items-center justify-center rounded-md",
        "border px-3 text-sm font-medium transition-colors",
        "focus:outline-none focus:ring-2",
        "focus:ring-indigo-500 focus:ring-offset-2",
        active
          ? "border-indigo-600 bg-indigo-600 text-white"
          : "border-slate-200 bg-white text-slate-800 hover:bg-slate-50",
        disabled && "cursor-not-allowed opacity-40",
      )}
    >
      {children}
    </button>
  );
};

export default Pagination;