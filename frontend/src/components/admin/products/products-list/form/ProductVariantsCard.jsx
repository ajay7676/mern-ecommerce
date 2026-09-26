
import {
  ImageIcon,
  Trash2,
} from "lucide-react";


import VariantImageUploader from "./VariantImageUploader";
import {
  getVariantAttributeValuesArray,
  getVariantDisplayName,
  isPersistedVariant,
} from "../../../../../utils/admin/products/product/productVariantDisplayUtils";


const ProductVariantsCard = ({
  fields = [],
  watchedVariants = [],

  register,
  control,
  setValue,

  remove,

  errors = {},

  lowStockThreshold = 0,

  selectedVariantIndex = 0,
  onSelectVariant,
}) => {
  if (!fields.length) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="font-bold text-slate-900">
          Manage Variants
        </h3>

        <div className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
          <ImageIcon className="mx-auto h-8 w-8 text-slate-400" />

          <p className="mt-3 text-sm font-semibold text-slate-700">
            No variants generated yet
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Select attributes and generate variants first.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 p-5">
        <h3 className="font-bold text-slate-900">
          Manage Variants
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Manage images, SKU, price, stock and status for each
          variation.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Variant</th>
              <th>Attributes</th>
              <th>Image</th>
              <th className="min-w-[190px]">
                SKU
              </th>
              <th className="min-w-[130px]">
                Price
              </th>
              <th className="min-w-[110px]">
                Stock
              </th>
              <th>Status</th>
              <th />
            </tr>
          </thead>

          <tbody>
            {fields.map((field, index) => {
              const variant =
                watchedVariants[index] || field;

              const attributeValues =
                getVariantAttributeValuesArray(
                  variant,
                );

              const persisted =
                isPersistedVariant(
                  variant,
                );

              const selected =
                selectedVariantIndex ===
                index;

              const stock =
                Number(
                  variant.stock || 0,
                );

              const lowStock =
                stock <=
                  Number(
                    lowStockThreshold || 0,
                  ) &&
                stock > 0;

              return (
                <tr
                  key={
                    field.formFieldId ||
                    field.id ||
                    variant.variantId ||
                    `${variant.optionSignature}-${index}`
                  }
                  onClick={() =>
                    onSelectVariant?.(
                      index,
                    )
                  }
                  className={`cursor-pointer ${
                    selected
                      ? "bg-primary/5"
                      : ""
                  }`}
                >
                  {/* VARIANT */}
                  <td>
                    <div className="min-w-[160px]">
                      <p className="text-sm font-semibold text-slate-900">
                        {getVariantDisplayName(
                          variant,
                        )}
                      </p>

                      <div className="mt-1 flex flex-wrap gap-1">
                        <span
                          className={`badge badge-xs ${
                            persisted
                              ? "badge-success"
                              : "badge-info"
                          }`}
                        >
                          {persisted
                            ? "Existing"
                            : "New"}
                        </span>

                        {variant.source && (
                          <span className="badge badge-ghost badge-xs">
                            {
                              variant.source
                            }
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* ATTRIBUTES */}
                  <td>
                    <div className="flex min-w-[180px] flex-wrap gap-1.5">
                      {attributeValues.map(
                        (
                          attribute,
                          attributeIndex,
                        ) => (
                          <span
                            key={
                              attribute.optionId ||
                              `${attribute.attributeName}-${attributeIndex}`
                            }
                            className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700"
                          >
                            {attribute.colorCode && (
                              <span
                                className="h-2 w-2 rounded-full border"
                                style={{
                                  backgroundColor:
                                    attribute.colorCode,
                                }}
                              />
                            )}

                            {attribute.label ||
                              attribute.value}
                          </span>
                        ),
                      )}
                    </div>
                  </td>

                  {/* IMAGE */}
                  <td
                    onClick={(event) =>
                      event.stopPropagation()
                    }
                  >
                    <VariantImageUploader
                      variant={variant}
                      variantIndex={
                        index
                      }
                      setValue={
                        setValue
                      }
                    />
                  </td>

                  {/* SKU */}
                  <td
                    onClick={(event) =>
                      event.stopPropagation()
                    }
                  >
                    <input
                      {...register(
                        `variants.${index}.sku`,
                      )}
                      className={`input input-bordered input-sm w-full ${
                        errors
                          ?.variants?.[
                            index
                          ]?.sku
                          ? "input-error"
                          : ""
                      }`}
                    />

                    {errors?.variants?.[
                      index
                    ]?.sku?.message && (
                      <p className="mt-1 text-xs text-error">
                        {
                          errors.variants[
                            index
                          ].sku.message
                        }
                      </p>
                    )}
                  </td>

                  {/* PRICE */}
                  <td
                    onClick={(event) =>
                      event.stopPropagation()
                    }
                  >
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      {...register(
                        `variants.${index}.price`,
                      )}
                      className="input input-bordered input-sm w-full"
                    />
                  </td>

                  {/* STOCK */}
                  <td
                    onClick={(event) =>
                      event.stopPropagation()
                    }
                  >
                    <input
                      type="number"
                      min="0"
                      {...register(
                        `variants.${index}.stock`,
                      )}
                      className={`input input-bordered input-sm w-full ${
                        lowStock
                          ? "input-warning"
                          : ""
                      }`}
                    />

                    {lowStock && (
                      <p className="mt-1 text-[10px] font-medium text-warning">
                        Low stock
                      </p>
                    )}
                  </td>

                  {/* STATUS */}
                  <td
                    onClick={(event) =>
                      event.stopPropagation()
                    }
                  >
                    <label className="flex cursor-pointer items-center gap-2">
                      <input
                        type="checkbox"
                        className="toggle toggle-success toggle-sm"
                        checked={
                          variant.status ===
                            true ||
                          variant.status ===
                            "active"
                        }
                        onChange={(
                          event,
                        ) => {
                          setValue(
                            `variants.${index}.status`,
                            event.target
                              .checked,
                            {
                              shouldDirty: true,
                              shouldValidate: true,
                            },
                          );
                        }}
                      />

                      <span className="text-xs">
                        {variant.status ===
                          true ||
                        variant.status ===
                          "active"
                          ? "Active"
                          : "Inactive"}
                      </span>
                    </label>
                  </td>

                  {/* REMOVE */}
                  <td
                    onClick={(event) =>
                      event.stopPropagation()
                    }
                  >
                    <button
                      type="button"
                      className="btn btn-ghost btn-sm btn-circle text-error"
                      onClick={() =>
                        remove(index)
                      }
                      title="Remove variant"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductVariantsCard;
