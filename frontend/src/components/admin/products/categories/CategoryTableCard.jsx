import CategoryEmptyState from "./CategoryEmptyState";
import CategoryPagination from "./CategoryPagination";
import CategoryTable from "./CategoryTable";
import CategoryTableSkeleton from "./CategoryTableSkeleton";

const CategoryTableCard = ({
  categories = [],

  page,
  limit,
  total,
  totalPages,

  isLoading,
  isFetching,
  isError,

  hasFilters,

  onEdit,
  onDelete,
  
  onToggle,
  onPageChange,
  onLimitChange,
}) => {
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
        shadow-[0_4px_18px_rgba(15,23,42,0.04)]
      "
    >
      {isFetching && !isLoading && (
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
              rounded-full
              bg-violet-600
            "
          />
        </div>
      )}

      {isLoading ? (
        <CategoryTableSkeleton />
      ) : isError ? (
        <div
          className="
            flex
            min-h-107.5
            items-center
            justify-center
            px-6
            text-center
          "
        >
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Unable to load categories
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Something went wrong while loading category data.
            </p>
          </div>
        </div>
      ) : categories.length === 0 ? (
        <CategoryEmptyState
          hasFilters={hasFilters}
        />
      ) : (
        <>
          <CategoryTable
            categories={categories}
            page={page}
            limit={limit}
            onEdit={onEdit}
            onDelete={onDelete}
            onToggle={onToggle}
          />

          <CategoryPagination
            page={page}
            limit={limit}
            total={total}
            totalPages={totalPages}
            onPageChange={onPageChange}
            onLimitChange={onLimitChange}
          />
        </>
      )}
    </section>
  );
};

export default CategoryTableCard;