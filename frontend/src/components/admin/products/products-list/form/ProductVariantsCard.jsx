// components/ProductVariantsCard.jsx

import { useMemo, useState } from "react";
import { Controller } from "react-hook-form";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Edit3,
  Trash2,
} from "lucide-react";

import VariantImagePicker from "./VariantImagePicker";
import VariantStatsCards from "./VariantStatsCards";

import {
    calculateVariantStats 
} from '../../../../../utils/admin/products/product/productVariationUtils'

const PAGE_SIZE = 4;

const ProductVariantsCard = ({
  fields,
  watchedVariants,
  register,
  control,
  setValue,
  remove,
  errors,
  lowStockThreshold,
  selectedVariantIndex,
  onSelectVariant,
}) => {
  const [page, setPage] = useState(1);

  const stats = useMemo(() => {
    return calculateVariantStats(watchedVariants, lowStockThreshold);
  }, [watchedVariants, lowStockThreshold]);

  const totalPages = Math.max(Math.ceil(fields.length / PAGE_SIZE), 1);
  const startIndex = (page - 1) * PAGE_SIZE;

  const currentRows = fields
    .map((field, index) => ({ field, index }))
    .slice(startIndex, startIndex + PAGE_SIZE);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-950">
            Manage Variants
          </h3>

          <p className="mt-1 text-sm font-medium text-slate-500">
            Edit variant images, SKU, price, stock and status.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            className="btn btn-outline btn-primary h-11 min-h-11 rounded-xl"
          >
            <Edit3 className="h-4 w-4" />
            Bulk Edit
          </button>

          <button
            type="button"
            className="btn btn-outline btn-primary h-11 min-h-11 rounded-xl"
          >
            <Download className="h-4 w-4" />
            Import / Export
          </button>
        </div>
      </div>

      {errors.variants?.message && (
        <p className="mt-3 text-xs font-medium text-error">
          {errors.variants.message}
        </p>
      )}

      <div className="mt-6">
        <VariantStatsCards stats={stats} />
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200">
        <table className="table w-full min-w-275">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-xs text-slate-500">
              <th className="w-10">
                <input type="checkbox" className="checkbox checkbox-sm rounded" />
              </th>
              <th className="min-w-47.5">Variant</th>
              <th className="min-w-52.5">Attributes</th>
              <th className="min-w-32.5">Images</th>
              <th className="min-w-47.5">SKU</th>
              <th className="min-w-30">Price (₹)</th>
              <th className="min-w-27.5">Stock</th>
              <th className="min-w-30">Status</th>
              <th className="w-24 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentRows.map(({ field, index }) => {
              const variant = watchedVariants?.[index] || {};
              const isSelected = selectedVariantIndex === index;

              return (
                <tr
                  key={field.id}
                  onClick={() => onSelectVariant(index)}
                  className={`cursor-pointer border-b border-slate-100 ${
                    isSelected ? "bg-primary/5" : "hover:bg-slate-50"
                  }`}
                >
                  <td onClick={(event) => event.stopPropagation()}>
                    <input type="checkbox" className="checkbox checkbox-sm rounded" />
                  </td>

                  <td>
                    <div className="flex items-center gap-3">
                      <img
                        src={variant.imageUrl}
                        alt={variant.name}
                        className="h-12 w-12 rounded-xl border border-slate-200 object-cover"
                      />

                      <div>
                        <p className="text-sm font-bold text-slate-950">
                          {variant.name || "Variant"}
                        </p>

                        <span
                          className={`mt-1 inline-flex rounded-lg px-2 py-0.5 text-[11px] font-bold ${
                            variant.source === "manual"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {variant.source === "manual" ? "Manual" : "Auto"}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className="flex flex-wrap gap-2">
                      {Object.values(variant.attributeValues || {}).map((item) => (
                        <span
                          key={`${variant.variantId}-${item.attributeId}-${item.value}`}
                          className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700"
                        >
                          {item.colorCode && (
                            <span
                              className="h-2.5 w-2.5 rounded-full border border-slate-300"
                              style={{ backgroundColor: item.colorCode }}
                            />
                          )}
                          {item.label}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td onClick={(event) => event.stopPropagation()}>
                    <VariantImagePicker
                      variant={variant}
                      index={index}
                      setValue={setValue}
                    />
                  </td>

                  <td onClick={(event) => event.stopPropagation()}>
                    <input
                      type="text"
                      className="input input-bordered h-10 min-h-10 w-full rounded-xl border-slate-200 bg-white text-sm"
                      {...register(`variants.${index}.sku`)}
                    />

                    {errors.variants?.[index]?.sku?.message && (
                      <p className="mt-1 text-xs font-medium text-error">
                        {errors.variants[index].sku.message}
                      </p>
                    )}
                  </td>

                  <td onClick={(event) => event.stopPropagation()}>
                    <input
                      type="number"
                      step="0.01"
                      className="input input-bordered h-10 min-h-10 w-full rounded-xl border-slate-200 bg-white text-sm"
                      {...register(`variants.${index}.price`)}
                    />
                  </td>

                  <td onClick={(event) => event.stopPropagation()}>
                    <input
                      type="number"
                      className="input input-bordered h-10 min-h-10 w-full rounded-xl border-slate-200 bg-white text-sm"
                      {...register(`variants.${index}.stock`)}
                    />
                  </td>

                  <td onClick={(event) => event.stopPropagation()}>
                    <Controller
                      name={`variants.${index}.status`}
                      control={control}
                      render={({ field }) => (
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={field.value}
                            onChange={(event) => field.onChange(event.target.checked)}
                            className="toggle toggle-primary toggle-sm"
                          />

                          <span className="text-xs font-bold text-slate-600">
                            {field.value ? "Active" : "Inactive"}
                          </span>
                        </label>
                      )}
                    />
                  </td>

                  <td onClick={(event) => event.stopPropagation()}>
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        className="btn btn-ghost btn-sm btn-circle"
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="btn btn-ghost btn-sm btn-circle text-error"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}

            {!fields.length && (
              <tr>
                <td colSpan={9}>
                  <div className="py-10 text-center">
                    <p className="text-sm font-bold text-slate-700">
                      No variants created yet
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      Generate automatically or add a variant manually.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-medium text-slate-500">
          Showing {fields.length ? startIndex + 1 : 0} to{" "}
          {Math.min(startIndex + PAGE_SIZE, fields.length)} of {fields.length} variants
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <div className="join">
            <button
              type="button"
              disabled={page === 1}
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              className="btn join-item h-10 min-h-10 border-slate-200 bg-white"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {Array.from({ length: Math.min(totalPages, 5) }).map((_, pageIndex) => {
              const pageNumber = pageIndex + 1;

              return (
                <button
                  key={pageNumber}
                  type="button"
                  onClick={() => setPage(pageNumber)}
                  className={`btn join-item h-10 min-h-10 border-slate-200 ${
                    pageNumber === page ? "btn-primary text-white" : "bg-white"
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}

            <button
              type="button"
              disabled={page === totalPages}
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              className="btn join-item h-10 min-h-10 border-slate-200 bg-white"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <select className="select select-bordered h-10 min-h-10 rounded-xl border-slate-200 bg-white text-sm">
            <option>4 / page</option>
            <option>8 / page</option>
            <option>12 / page</option>
          </select>
        </div>
      </div>
    </section>
  );
};

export default ProductVariantsCard;