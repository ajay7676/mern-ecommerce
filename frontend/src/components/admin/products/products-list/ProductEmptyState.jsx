import { PackageOpen, Plus, RefreshCcw, SearchX } from "lucide-react";

const ProductEmptyState = ({
  hasFilters = false,
  title,
  description,
  onAddProduct,
  onClearFilters,
  isRefreshing = false,
}) => {
  const emptyTitle =
    title || (hasFilters ? "No products match your filters" : "No products found");

  const emptyDescription =
    description ||
    (hasFilters
      ? "Try changing your search, status, category, brand, or stock filters to find products."
      : "Start by adding your first product. Once created, it will appear here with price, stock, discount, variants, and status.");

  return (
    <div className="rounded-3xl border border-base-300 bg-base-100 p-6 shadow-sm">
      <div className="flex min-h-90 flex-col items-center justify-center text-center">
        {/* Icon wrapper */}
        <div className="relative mb-6">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 text-primary">
            {hasFilters ? (
              <SearchX className="h-11 w-11" strokeWidth={1.8} />
            ) : (
              <PackageOpen className="h-11 w-11" strokeWidth={1.8} />
            )}
          </div>

          <div className="absolute -right-1 -top-1 h-6 w-6 rounded-full bg-base-100 shadow-sm ring-1 ring-base-300" />
        </div>

        {/* Content */}
        <div className="max-w-md">
          <h3 className="text-xl font-bold text-base-content">{emptyTitle}</h3>

          <p className="mt-3 text-sm leading-6 text-base-content/60">
            {emptyDescription}
          </p>
        </div>

        {/* Actions */}
        <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row">
          {hasFilters && (
            <button
              type="button"
              onClick={onClearFilters}
              disabled={!onClearFilters || isRefreshing}
              className="btn btn-outline rounded-xl"
            >
              <RefreshCcw
                className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
              />
              Clear filters
            </button>
          )}

          <button
            type="button"
            onClick={onAddProduct}
            disabled={!onAddProduct}
            className="btn btn-primary rounded-xl text-white"
          >
            <Plus className="h-4 w-4" />
            Add new product
          </button>
        </div>

        {/* Helper text */}
        <div className="mt-6 rounded-2xl bg-base-200 px-4 py-3 text-xs text-base-content/60">
          Tip: Add product images, pricing, inventory, and variants to make your
          product listing complete.
        </div>
      </div>
    </div>
  );
};

export default ProductEmptyState;