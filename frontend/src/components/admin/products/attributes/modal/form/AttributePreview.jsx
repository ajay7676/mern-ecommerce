import { FiCheck, FiType } from "react-icons/fi";

const AttributePreview = ({ values }) => {
  const attributeName =
    values.name?.trim() || "Attribute Name";

  const typeLabel =
    values.type
      ? values.type.charAt(0).toUpperCase() +
        values.type.slice(1)
      : "Attribute Type";

  return (
    <div className="space-y-5">
      {/* Preview */}
      <section className="rounded-xl border border-slate-200 bg-white p-5">
        <h3 className="text-sm font-semibold text-slate-900">
          Attribute Preview
        </h3>

        <p className="mt-1 text-xs text-slate-500">
          This is how the attribute will appear.
        </p>

        <div className="mt-4 rounded-xl border border-slate-200 p-5">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-violet-50 text-violet-600">
              <FiType size={38} />
            </div>

            <h4 className="mt-4 text-xl font-bold text-slate-900">
              {attributeName}
            </h4>

            <span className="mt-2 rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-600">
              {typeLabel}
            </span>

            <p className="mt-4 text-xs leading-5 text-slate-500">
              {values.description?.trim() ||
                "Attribute description will appear here..."}
            </p>
          </div>
        </div>
      </section>

      {/* Summary */}
      <section className="rounded-xl border border-slate-200 bg-white p-5">
        <h3 className="text-sm font-semibold text-slate-900">
          Attribute Summary
        </h3>

        <div className="mt-5 space-y-4">
          <SummaryRow
            label="Type"
            value={typeLabel}
          />

          <SummaryRow
            label="Values"
            value={`${values.values?.length || 0} values`}
          />

          <SummaryRow
            label="Default Value"
            value={
              values.values?.find(
                (item) => item.isDefault
              )?.value || "None"
            }
          />

          <SummaryRow
            label="Status"
            value={
              values.status === "active" ? (
                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-600">
                  Active
                </span>
              ) : (
                <span className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-600">
                  Inactive
                </span>
              )
            }
          />

          <SummaryRow
            label="Show in Filter"
            value={
              values.showInFilter ? (
                <CheckValue />
              ) : (
                "No"
              )
            }
          />

          <SummaryRow
            label="Show on Product Page"
            value={
              values.showOnProductPage ? (
                <CheckValue />
              ) : (
                "No"
              )
            }
          />
        </div>
      </section>

      {/* Tips */}
      <section className="rounded-xl border border-slate-200 bg-white p-5">
        <h3 className="text-sm font-semibold text-slate-900">
          💡 Tips
        </h3>

        <ul className="mt-4 space-y-3">
          {[
            "Use clear and simple attribute names.",
            "Add relevant values that customers expect.",
            "Use color swatches for better visualization.",
            "Set proper sort order for user experience.",
            "You can edit these details anytime.",
          ].map((tip) => (
            <li
              key={tip}
              className="flex items-start gap-2 text-xs leading-5 text-slate-600"
            >
              <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <FiCheck size={10} />
              </span>

              {tip}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

const SummaryRow = ({ label, value }) => (
  <div className="flex items-center justify-between gap-4 text-xs">
    <span className="font-medium text-slate-500">
      {label}
    </span>

    <span className="text-right font-medium text-slate-700">
      {value}
    </span>
  </div>
);

const CheckValue = () => (
  <span className="inline-flex items-center gap-1 text-emerald-600">
    <FiCheck size={13} />
    Yes
  </span>
);

export default AttributePreview;