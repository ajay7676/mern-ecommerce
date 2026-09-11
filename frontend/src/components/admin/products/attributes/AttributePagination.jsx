const AttributePagination = ({
  pagination,
  onPageChange,
  isFetching,
}) => {
  if (!pagination) {
    return null;
  }

  const {
    page,
    totalPages,
    total,
    limit,
    hasNextPage,
    hasPrevPage,
  } = pagination;

  const start = total === 0 ? 0 : (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);

  return (
    <div className="flex flex-col gap-3 rounded-b-2xl border border-t-0 border-slate-200 bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-slate-500">
        Showing{" "}
        <span className="font-semibold text-slate-800">
          {start}
        </span>{" "}
        to{" "}
        <span className="font-semibold text-slate-800">
          {end}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-slate-800">
          {total}
        </span>{" "}
        attributes
      </p>

      <div className="join">
        <button
          type="button"
          disabled={!hasPrevPage || isFetching}
          onClick={() => onPageChange(page - 1)}
          className="btn join-item btn-sm"
        >
          Prev
        </button>

        <button
          type="button"
          className="btn join-item btn-sm"
        >
          Page {page} of {totalPages || 1}
        </button>

        <button
          type="button"
          disabled={!hasNextPage || isFetching}
          onClick={() => onPageChange(page + 1)}
          className="btn join-item btn-sm"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AttributePagination;