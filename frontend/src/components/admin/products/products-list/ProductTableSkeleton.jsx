import { ArrowUpDown } from "lucide-react";

const skeletonRows = Array.from({ length: 8 });

const ProductTableSkeleton = ({ rows = skeletonRows.length }) => {
  const rowItems = Array.from({ length: rows });

  return (
    <div
      role="status"
      aria-busy="true"
      aria-label="Loading products"
      className="overflow-hidden rounded-3xl border border-base-300 bg-base-100 shadow-sm"
    >
      {/* Top loading bar */}
      <div className="h-1 w-full bg-base-200">
        <div className="h-full w-1/3 animate-pulse bg-primary/60" />
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="w-12 px-5 py-4">
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm rounded border-slate-300"
                />
              </th>

              <SortableTh label="Product" />
              <SortableTh label="SKU" />
              <SortableTh label="Category" />
              <SortableTh label="Brand" />
              <SortableTh label="Price" />
              <SortableTh label="Stock" />
              <SortableTh label="Status" />
              <SortableTh label="Created At" />

              <th className="px-5 py-4 text-right font-bold text-slate-700">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {rowItems.map((_, index) => (
              <tr key={index} className="border-base-200">
                {/* Product */}
                <td>
                  <div className="flex items-center gap-3">
                    <div className="skeleton h-12 w-12 rounded-xl" />

                    <div className="space-y-2">
                      <div className="skeleton h-4 w-40 rounded-md" />
                      <div className="skeleton h-3 w-20 rounded-md" />
                    </div>
                  </div>
                </td>

                {/* SKU */}
                <td>
                  <div className="skeleton h-4 w-24 rounded-md" />
                </td>

                {/* Category */}
                <td>
                  <div className="skeleton h-4 w-28 rounded-md" />
                </td>

                {/* Brand */}
                <td>
                  <div className="skeleton h-4 w-24 rounded-md" />
                </td>

                {/* Price */}
                <td>
                  <div className="space-y-2">
                    <div className="skeleton h-4 w-20 rounded-md" />
                    <div className="skeleton h-3 w-14 rounded-md" />
                  </div>
                </td>

                {/* Discount */}
                <td>
                  <div className="skeleton h-6 w-20 rounded-full" />
                </td>

                {/* Stock */}
                <td>
                  <div className="skeleton h-6 w-16 rounded-full" />
                </td>

                {/* Variants */}
                <td>
                  <div className="skeleton h-4 w-10 rounded-md" />
                </td>

                {/* Status */}
                <td>
                  <div className="skeleton h-6 w-20 rounded-full" />
                </td>

                {/* Created */}
                <td>
                  <div className="skeleton h-4 w-24 rounded-md" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer pagination skeleton */}
      <div className="flex flex-col gap-4 border-t border-base-300 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="skeleton h-4 w-44 rounded-md" />

        <div className="flex items-center gap-2">
          <div className="skeleton h-9 w-9 rounded-xl" />
          <div className="skeleton h-9 w-9 rounded-xl" />
          <div className="skeleton h-9 w-9 rounded-xl" />
          <div className="skeleton h-9 w-9 rounded-xl" />
        </div>
      </div>

      <span className="sr-only">Loading products...</span>
    </div>
  );
};

const SortableTh = ({ label }) => {
  return (
    <th className="min-w-30 px-5 py-4">
      <button
        type="button"
        className="flex items-center gap-2 text-xs font-bold text-slate-700"
      >
        {label}
        <ArrowUpDown className="h-3.5 w-3.5 text-slate-400" />
      </button>
    </th>
  );
};

export default ProductTableSkeleton;