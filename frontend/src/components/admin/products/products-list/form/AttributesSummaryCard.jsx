
const AttributesSummaryCard = ({ attributes }) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-lg font-bold text-slate-950">
        Attributes Summary
      </h3>

      <p className="mt-1 text-sm text-slate-500">
        {attributes.length} attributes selected
      </p>

      <div className="mt-5 space-y-4">
        {attributes.map((attribute, index) => (
          <div
            key={attribute.attributeId}
            className="flex items-center justify-between gap-4 border-b border-slate-100 pb-3 last:border-b-0 last:pb-0"
          >
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-slate-700">
                {index + 1}.
              </span>

              <span className="font-bold text-slate-900">
                {attribute.name || "Unnamed"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="rounded-lg bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                {attribute.type}
              </span>

              <span className="text-xs font-semibold text-slate-500">
                {attribute.options?.length || 0}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttributesSummaryCard;