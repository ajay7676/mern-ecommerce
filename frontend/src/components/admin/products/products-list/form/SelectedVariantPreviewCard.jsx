import {
  ImageOff,
} from "lucide-react";

import {
  getVariantAttributeValuesArray,
  getVariantDisplayName,
  getVariantImageUrl,
  isPersistedVariant,
} from "../../../../../utils/admin/products/product/productVariantDisplayUtils";

const SelectedVariantPreviewCard = ({
  variant,
}) => {
  if (!variant) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="font-bold text-slate-900">
          Variant Preview
        </h3>

        <div className="mt-4 rounded-2xl bg-slate-50 p-6 text-center">
          <p className="text-sm text-slate-500">
            Select a variant to preview.
          </p>
        </div>
      </div>
    );
  }

  const imageUrl =
    getVariantImageUrl(variant);

  const attributes =
    getVariantAttributeValuesArray(
      variant,
    );

  const persisted =
    isPersistedVariant(variant);

  const isActive =
    variant.status === true ||
    variant.status === "active";

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-bold text-slate-900">
          Variant Preview
        </h3>

        <span
          className={`badge badge-sm ${
            persisted
              ? "badge-success"
              : "badge-info"
          }`}
        >
          {persisted
            ? "Existing"
            : "New"}
        </span>
      </div>

      <div className="mt-4 flex min-h-48 items-center justify-center rounded-2xl bg-slate-50 p-4">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={getVariantDisplayName(
              variant,
            )}
            className="max-h-44 w-full object-contain"
          />
        ) : (
          <div className="text-center text-slate-400">
            <ImageOff className="mx-auto h-8 w-8" />

            <p className="mt-2 text-xs">
              No variant image
            </p>
          </div>
        )}
      </div>

      <h4 className="mt-4 text-center text-base font-bold text-slate-900">
        {getVariantDisplayName(
          variant,
        )}
      </h4>

      <p className="mt-1 break-all text-center text-xs text-slate-500">
        SKU: {variant.sku || "—"}
      </p>

      <div className="mt-4 flex flex-wrap justify-center gap-1.5">
        {attributes.map(
          (attribute, index) => (
            <span
              key={
                attribute.optionId ||
                index
              }
              className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-xs"
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

      <div className="mt-5 divide-y divide-slate-100 rounded-2xl border border-slate-200">
        <PreviewRow
          label="Price"
          value={
            variant.price
              ? `₹${variant.price}`
              : "—"
          }
        />

        <PreviewRow
          label="Stock"
          value={
            variant.stock ?? "0"
          }
        />

        <PreviewRow
          label="Status"
          value={
            isActive
              ? "Active"
              : "Inactive"
          }
          valueClassName={
            isActive
              ? "text-success"
              : "text-slate-500"
          }
        />

        <PreviewRow
          label="Source"
          value={
            variant.source || "auto"
          }
        />
      </div>
    </div>
  );
};

const PreviewRow = ({
  label,
  value,
  valueClassName = "",
}) => {
  return (
    <div className="flex items-center justify-between gap-4 px-4 py-3">
      <span className="text-xs text-slate-500">
        {label}
      </span>

      <span
        className={`text-sm font-semibold text-slate-900 ${valueClassName}`}
      >
        {value}
      </span>
    </div>
  );
};

export default SelectedVariantPreviewCard;