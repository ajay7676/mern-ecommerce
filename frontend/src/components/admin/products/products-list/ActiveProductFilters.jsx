import { X } from "lucide-react";

import {
  PRODUCT_STATUS_OPTIONS,
  PRODUCT_STOCK_OPTIONS,
  PRODUCT_TYPE_OPTIONS,
} from '../../../../constants/admin/products/productFilter.constants'

const findLabel = (options, value) => {
  return options.find((option) => option.value === value)?.label || value;
};

const ActiveProductFilters = ({
  filters,
  categoryOptions = [],
  brandOptions = [],
  onRemoveFilter,
}) => {
  const chips = [];

  if (filters.search) {
    chips.push({
      key: "search",
      label: `Search: ${filters.search}`,
    });
  }

  if (filters.status !== "all") {
    chips.push({
      key: "status",
      label: `Status: ${findLabel(PRODUCT_STATUS_OPTIONS, filters.status)}`,
    });
  }

  if (filters.stockStatus !== "all") {
    chips.push({
      key: "stockStatus",
      label: `Stock: ${findLabel(PRODUCT_STOCK_OPTIONS, filters.stockStatus)}`,
    });
  }

  if (filters.productType !== "all") {
    chips.push({
      key: "productType",
      label: `Type: ${findLabel(PRODUCT_TYPE_OPTIONS, filters.productType)}`,
    });
  }

  if (filters.category !== "all") {
    const category = categoryOptions.find(
      (item) => String(item._id || item.id) === String(filters.category)
    );

    chips.push({
      key: "category",
      label: `Category: ${category?.name || "Selected"}`,
    });
  }

  if (filters.brand !== "all") {
    const brand = brandOptions.find(
      (item) => String(item._id || item.id) === String(filters.brand)
    );

    chips.push({
      key: "brand",
      label: `Brand: ${brand?.name || "Selected"}`,
    });
  }

  if (!chips.length) {
    return (
      <div className="text-sm text-base-content/50">
        No active filters
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm font-semibold text-base-content/60">
        Active Filters:
      </span>

      {chips.map((chip) => (
        <button
          key={chip.key}
          type="button"
          onClick={() => onRemoveFilter(chip.key)}
          className="inline-flex items-center gap-2 rounded-lg bg-base-200 px-3 py-2 text-xs font-semibold text-base-content/70 hover:bg-base-300"
        >
          {chip.label}
          <X className="h-3.5 w-3.5" />
        </button>
      ))}
    </div>
  );
};

export default ActiveProductFilters;