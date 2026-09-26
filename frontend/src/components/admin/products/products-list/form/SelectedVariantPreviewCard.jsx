
const SelectedVariantPreviewCard = ({ variant }) => {
  if (!variant) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-lg font-bold text-slate-950">
          Variant Preview
        </h3>

        <div className="mt-5 rounded-2xl bg-slate-50 p-8 text-center text-sm text-slate-500">
          No variant selected
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-lg font-bold text-slate-950">
        Variant Preview
      </h3>

      <div className="mt-5 rounded-2xl bg-slate-50 p-5 text-center">
        <img
          src={variant?.image?.url}
          alt={variant.name}
          className="mx-auto h-40 w-40 object-contain"
        />

        <h4 className="mt-4 text-lg font-extrabold text-slate-950">
          {variant.name}
        </h4>

        <p className="mt-1 text-sm font-semibold text-slate-500">
          SKU: {variant.sku}
        </p>
      </div>

      <div className="mt-4 divide-y divide-slate-200">
        <PreviewRow label="Price (₹)" value={variant.price || "0.00"} />
        <PreviewRow label="Stock" value={variant.stock || "0"} />

        <div className="flex items-center justify-between py-3">
          <span className="text-sm font-medium text-slate-500">
            Status
          </span>

          <span
            className={`rounded-lg px-3 py-1 text-xs font-bold ${
              variant.status
                ? "bg-emerald-100 text-emerald-700"
                : "bg-slate-100 text-slate-500"
            }`}
          >
            {variant.status ? "Active" : "Inactive"}
          </span>
        </div>
      </div>
    </div>
  );
};

const PreviewRow = ({ label, value }) => {
  return (
    <div className="flex items-center justify-between py-3">
      <span className="text-sm font-medium text-slate-500">
        {label}
      </span>

      <span className="text-sm font-bold text-slate-950">
        {value}
      </span>
    </div>
  );
};

export default SelectedVariantPreviewCard;