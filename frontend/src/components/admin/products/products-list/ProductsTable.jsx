import { Eye, MoreVertical, Pencil, ArrowUpDown } from "lucide-react";

// import {
//   ProductStatusBadge,
//   StockBadge,
// } from "./ProductBadges";
import { formatCurrency } from "../../../../utils/admin/products/product/productPricingUtils";
import ProductTableSkeleton from "./ProductTableSkeleton";
import ProductEmptyState from "./ProductEmptyState";

const ProductsTable = ({
  products = [],
  isLoading = false,
  isFetching = false,
  isError = false,
  errorMessage = "",
  hasFilters = false,
  onAddProduct,
  onClearFilters,
}) => {
  if (isLoading) {
    return <ProductTableSkeleton />;
  }

  if (isError) {
    return (
      <div className="rounded-3xl border border-error/20 bg-error/5 p-8 text-center">
        <p className="font-semibold text-error">{errorMessage}</p>
      </div>
    );
  }

  if (!products.length) {
  return (
    <ProductEmptyState
      hasFilters={hasFilters}
      onAddProduct={onAddProduct}
      onClearFilters={onClearFilters}
      isRefreshing={isFetching}
    />
  );
}
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {isFetching && (
        <div className="h-1 w-full bg-primary/20">
          <div className="h-full w-1/3 animate-pulse bg-primary" />
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead className="bg-slate-50 text-xs text-slate-600">
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
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-b border-slate-100 hover:bg-slate-50/70"
              >
                <td className="px-5 py-4">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm rounded border-slate-300"
                  />
                </td>

                <td className="min-w-65 px-5 py-4">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 overflow-hidden rounded-xl border border-slate-100 bg-slate-50">
                      <img
                        src={
                          product?.image?.url || "../../../../../public/images/product-placeholder.png"
                        }
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div>
                      <p className="max-w-52.5 text-sm font-bold leading-6 text-slate-950">
                        {product.name}
                      </p>

                      {/* <p className="mt-1 text-xs font-medium text-slate-500">
                        ID: #{product.id}
                      </p> */}
                    </div>
                  </div>
                </td>

                <td className="min-w-42.5 px-5 py-4 text-sm font-medium text-slate-500">
                  {product.sku}
                </td>

                <td className="min-w-42.5 px-5 py-4 text-sm font-medium text-slate-700">
                  {product.category?.name || "-"}
                </td>

                <td className="min-w-32.5 px-5 py-4 text-sm font-medium text-slate-700">
                  {product.brand?.name || "-"}
                </td>

                <td className="min-w-42.5 px-5 py-4">
                  <div>
                    <p className="text-sm font-bold text-slate-950">
                      {formatCurrency(product.finalPrice)}
                    </p>

                    {product.mrp && (
                      <p className="text-xs font-medium text-slate-400 line-through">
                        {formatCurrency(product.mrp)}
                      </p>
                    )}

                   <p className="mt-1">
                     {product.discountType === "percentage" ? (
                      <span className="badge badge-success">
                        {product.discountValue}% OFF
                      </span>
                    ) : product.discountType === "fixed" ? (
                      <span className="badge badge-info">
                        ₹
                        {Number(product.discountValue || 0).toLocaleString(
                          "en-IN",
                        )}{" "}
                        OFF
                      </span>
                    ) : (
                      <span className="badge badge-ghost">No discount</span>
                    )}
                   </p>
                  </div>
                </td>

                <td className="min-w-32.5 px-5 py-4">
                  <div className="mt-1">
                    {/* <StockBadge status={product.stockStatus} /> */}
                    <span
                      className={`badge ${
                        product.stockStatus === "outOfStock"
                          ? "badge-error"
                          : product.stockStatus === "lowStock"
                            ? "badge-warning"
                            : "badge-success"
                      }`}
                    >
                      {product.stockQuantity}
                    </span>
                  </div>
                </td>

                <td className="min-w-35 px-5 py-4">
                  {/* <ProductStatusBadge status={product.status} /> */}
                  <span
                    className={`badge ${
                      product.status === "active"
                        ? "badge-success"
                        : product.status === "draft"
                          ? "badge-warning"
                          : "badge-ghost"
                    }`}
                  >
                    {product.status}
                  </span>
                </td>

                <td className="min-w-37.5 px-5 py-4">
                  <p className="text-sm font-medium text-slate-700">
                    {product.createdAt
                      ? new Date(product.createdAt).toLocaleDateString("en-IN")
                      : "-"}
                  </p>

                  <p className="mt-1 text-xs font-medium text-slate-500">
                    {product.createdAt
                      ? new Date(product.createdAt).toLocaleTimeString("en-IN")
                      : "-"}
                  </p>
                </td>

                <td className="px-5 py-4">
                  <div className="flex justify-end gap-3 text-slate-700">
                    <button
                      type="button"
                      className="rounded-lg p-1.5 hover:bg-slate-100"
                    >
                      <Eye className="h-4 w-4" />
                    </button>

                    <button
                      type="button"
                      className="rounded-lg p-1.5 hover:bg-slate-100"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>

                    <button
                      type="button"
                      className="rounded-lg p-1.5 hover:bg-slate-100"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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

export default ProductsTable;
