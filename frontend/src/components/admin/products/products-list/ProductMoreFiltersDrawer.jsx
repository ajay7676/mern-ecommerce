import { useEffect, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";

import {
  DEFAULT_PRODUCT_FILTERS,
  PRODUCT_SORT_OPTIONS,
  PRODUCT_TYPE_OPTIONS,
} from '../../../../constants/admin/products/productFilter.constants';


import { joinSortValue, splitSortValue } from "../../../../utils/admin/products/product/productFilterUtils";

const ProductMoreFiltersDrawer = ({
  isOpen = false,
  filters,
  onClose,
  onApply,
  onClearAdvanced,
}) => {
  const [draftFilters, setDraftFilters] = useState(filters);

  useEffect(() => {
    if (isOpen) {
      setDraftFilters(filters);
    }
  }, [isOpen, filters]);

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sortValue = joinSortValue({
    sortBy: draftFilters.sortBy,
    sortOrder: draftFilters.sortOrder,
  });

  const handleChange = (name, value) => {
    setDraftFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSortChange = (value) => {
    const { sortBy, sortOrder } = splitSortValue(value);

    setDraftFilters((prev) => ({
      ...prev,
      sortBy,
      sortOrder,
    }));
  };

  const handleApply = () => {
    onApply?.({
      productType: draftFilters.productType,
      sortBy: draftFilters.sortBy,
      sortOrder: draftFilters.sortOrder,
    });
  };

  const handleClearAdvanced = () => {
    const clearedFilters = {
      productType: DEFAULT_PRODUCT_FILTERS.productType,
      sortBy: DEFAULT_PRODUCT_FILTERS.sortBy,
      sortOrder: DEFAULT_PRODUCT_FILTERS.sortOrder,
    };

    setDraftFilters((prev) => ({
      ...prev,
      ...clearedFilters,
    }));

    onClearAdvanced?.(clearedFilters);
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <button
        type="button"
        aria-label="Close filters"
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
      />

      {/* Drawer */}
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-base-100 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-base-300 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <SlidersHorizontal className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-base-content">
                More Filters
              </h2>
              <p className="text-xs text-base-content/50">
                Refine product listing results
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="btn btn-ghost btn-sm rounded-xl"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 space-y-5 overflow-y-auto px-5 py-5">
          {/* Product Type */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-base-content">
              Product Type
            </label>

            <select
              value={draftFilters.productType}
              onChange={(event) =>
                handleChange("productType", event.target.value)
              }
              className="select select-bordered w-full rounded-xl"
            >
              {PRODUCT_TYPE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <p className="mt-2 text-xs text-base-content/50">
              Filter simple or variable products.
            </p>
          </div>

          {/* Sort */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-base-content">
              Sort Products
            </label>

            <select
              value={sortValue}
              onChange={(event) => handleSortChange(event.target.value)}
              className="select select-bordered w-full rounded-xl"
            >
              {PRODUCT_SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <p className="mt-2 text-xs text-base-content/50">
              Choose how products should be ordered in the table.
            </p>
          </div>

          {/* Future filters */}
          <div className="rounded-2xl border border-dashed border-base-300 bg-base-200/60 p-4">
            <h3 className="text-sm font-bold text-base-content">
              Coming later
            </h3>

            <p className="mt-1 text-xs leading-5 text-base-content/60">
              Price range, date range, created by, and inventory warehouse
              filters can be added when backend supports them.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 border-t border-base-300 px-5 py-4">
          <button
            type="button"
            onClick={handleClearAdvanced}
            className="btn btn-ghost rounded-xl"
          >
            Clear advanced
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-outline rounded-xl"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleApply}
              className="btn btn-primary rounded-xl text-white"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default ProductMoreFiltersDrawer;