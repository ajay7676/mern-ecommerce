import {
  Eye,
  MoreVertical,
  Pencil,
  ArrowUpDown,
} from "lucide-react";

import {
  ProductStatusBadge,
  StockBadge,
} from "./ProductBadges";

const ProductsTable = ({ products }) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
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
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div>
                      <p className="max-w-52.5 text-sm font-bold leading-6 text-slate-950">
                        {product.name}
                      </p>

                      <p className="mt-1 text-xs font-medium text-slate-500">
                        ID: #{product.id}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="min-w-42.5 px-5 py-4 text-sm font-medium text-slate-500">
                  {product.sku}
                </td>

                <td className="min-w-42.5 px-5 py-4 text-sm font-medium text-slate-700">
                  {product.category}
                </td>

                <td className="min-w-32.5 px-5 py-4 text-sm font-medium text-slate-700">
                  {product.brand}
                </td>

                <td className="min-w-32.5 px-5 py-4">
                  <div>
                    <p className="text-sm font-bold text-slate-950">
                      ₹{product.price.toLocaleString("en-IN")}
                    </p>

                    {product.oldPrice && (
                      <p className="text-xs font-medium text-slate-400 line-through">
                        ₹{product.oldPrice.toLocaleString("en-IN")}
                      </p>
                    )}

                    {product.discount && (
                      <span className="mt-1 inline-flex rounded-md bg-emerald-100 px-2 py-1 text-xs font-bold text-emerald-700">
                        {product.discount}
                      </span>
                    )}
                  </div>
                </td>

                <td className="min-w-32.5 px-5 py-4">
                  <p className="text-sm font-bold text-slate-950">
                    {product.stock}
                  </p>

                  <div className="mt-1">
                    <StockBadge status={product.stockStatus} />
                  </div>
                </td>

                <td className="min-w-35 px-5 py-4">
                  <ProductStatusBadge status={product.status} />
                </td>

                <td className="min-w-37.5 px-5 py-4">
                  <p className="text-sm font-medium text-slate-700">
                    {product.createdAt}
                  </p>

                  <p className="mt-1 text-xs font-medium text-slate-500">
                    {product.createdTime}
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