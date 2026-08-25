import BrandEmptyState from "./BrandEmptyState";
import BrandPagination from "./BrandPagination";
import BrandTable from "./BrandTable";
import BrandTableSkeleton from "./BrandTableSkeleton";

const BrandTableCard = ({
  brands = [],

  page,
  limit,
  total,
  totalPages,

  isLoading,
  isFetching,
  isError,
  error,

  hasFilters,

  onPageChange,
  onLimitChange,

  onEdit,
  onDelete,
  onToggleFeatured,

  onAddBrand,
  onResetFilters,
}) => {
  if (isLoading) {
    return (
      <section
        className="
          overflow-hidden
          rounded-xl
          border
          border-slate-200
          bg-white
          shadow-[0_2px_12px_rgba(15,23,42,0.03)]
        "
      >
        <BrandTableSkeleton
          rows={limit > 10 ? 10 : limit}
        />
      </section>
    );
  }

  if (isError) {
    return (
      <section
        className="
          flex
          min-h-105
          items-center
          justify-center
          rounded-xl
          border
          border-slate-200
          bg-white
          px-6
          text-center
        "
      >
        <div>
          <h3 className="text-base font-bold text-slate-900">
            Unable to load brands
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            {error?.response?.data?.message ||
              "Something went wrong while loading brands."}
          </p>
        </div>
      </section>
    );
  }

  if (!brands.length) {
    return (
      <section
        className="
          overflow-hidden
          rounded-xl
          border
          border-slate-200
          bg-white
          shadow-[0_2px_12px_rgba(15,23,42,0.03)]
        "
      >
        <BrandEmptyState
          hasFilters={hasFilters}
          onAddBrand={onAddBrand}
          onResetFilters={onResetFilters}
        />
      </section>
    );
  }

  return (
    <section
      className="
        relative
        min-w-0
        overflow-hidden
        rounded-xl
        border
        border-slate-200
        bg-white
        shadow-[0_2px_12px_rgba(15,23,42,0.03)]
      "
    >
      {/* Background refetch indicator */}

      {isFetching && (
        <div
          className="
            absolute
            left-0
            right-0
            top-0
            z-20
            h-0.5
            overflow-hidden
            bg-violet-100
          "
        >
          <div
            className="
              h-full
              w-1/3
              animate-pulse
              bg-violet-600
            "
          />
        </div>
      )}

      <BrandTable
        brands={brands}
        page={page}
        limit={limit}
        onEdit={onEdit}
        onDelete={onDelete}
        onToggleFeatured={onToggleFeatured}
      />

      <BrandPagination
        page={page}
        limit={limit}
        total={total}
        totalPages={totalPages}
        onPageChange={onPageChange}
        onLimitChange={onLimitChange}
      />
    </section>
  );
};

export default BrandTableCard;