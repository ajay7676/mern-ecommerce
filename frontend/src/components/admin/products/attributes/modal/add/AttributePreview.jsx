const AttributePreview = ({ form }) => {
  const values = form?.values || [];
  const title = form?.name || "Attribute";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-lg font-bold text-slate-900">
        Attribute Preview
      </h3>

      <p className="mt-1 text-sm text-slate-500">
        This is how the attribute will appear on the product page.
      </p>

      <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-5">
        <h4 className="mb-4 text-sm font-bold text-slate-900">
          {title}
          {form?.unit ? ` (${form.unit})` : ""}
        </h4>

        {form?.type === "dropdown" && (
          <div className="flex flex-wrap gap-3">
            {values.map((item, index) => (
              <button
                key={`${item.label}-${index}`}
                type="button"
                className={`rounded-lg border px-5 py-3 text-sm font-semibold ${
                  index === 0
                    ? "border-primary text-primary"
                    : "border-slate-200 bg-white text-slate-700"
                }`}
              >
                {item.label || "Value"}
              </button>
            ))}
          </div>
        )}

        {form?.type === "switch" && (
          <div className="flex flex-wrap gap-3">
            {values.map((item, index) => (
              <button
                key={`${item.label}-${index}`}
                type="button"
                className="h-8 w-8 rounded-full border border-slate-300 shadow-sm"
                style={{
                  backgroundColor: item.colorCode || "#000000",
                }}
                title={item.label}
              />
            ))}
          </div>
        )}

        {form?.type === "text" && (
          <input
            type="text"
            className="input input-bordered w-full bg-white"
            placeholder={form.placeholder || "Enter your text here"}
            value={form.defaultValue || ""}
            readOnly
          />
        )}

        {form?.type === "number" && (
          <input
            type="number"
            className="input input-bordered w-full bg-white"
            min={form.minValue || ""}
            max={form.maxValue || ""}
            step={form.step || ""}
            value={form.defaultValue || ""}
            readOnly
          />
        )}

        {form?.type === "boolean" && (
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              className="checkbox checkbox-primary checkbox-sm"
              checked={form.defaultValue === "true"}
              readOnly
            />

            <span className="text-sm font-medium text-slate-700">
              {form.trueLabel || "Yes"}
            </span>
          </label>
        )}
      </div>
    </div>
  );
};

export default AttributePreview;