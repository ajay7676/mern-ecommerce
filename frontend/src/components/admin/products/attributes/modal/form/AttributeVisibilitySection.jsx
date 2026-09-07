
const AttributeVisibilitySection = ({
  values,
  onChange,
}) => {
  return (
    <section className="rounded-xl border border-slate-200 bg-white">
      <div className="border-b border-slate-100 px-5 py-4">
        <div className="flex items-start gap-3">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-600 text-xs font-semibold text-white">
            3
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              Status & Visibility
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              Control the status and visibility of this attribute.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 p-5 sm:grid-cols-3">
        <VisibilityToggle
          label="Status"
          description="Active attributes are available for use."
          checked={values.status === "active"}
          onChange={(checked) =>
            onChange(
              "status",
              checked ? "active" : "inactive"
            )
          }
          required
        />

        <VisibilityToggle
          label="Show on Product Filter"
          description="Show this attribute on storefront filters."
          checked={values.showInFilter}
          onChange={(checked) =>
            onChange("showInFilter", checked)
          }
        />

        <VisibilityToggle
          label="Show on Product Page"
          description="Show this attribute on the product detail page."
          checked={values.showOnProductPage}
          onChange={(checked) =>
            onChange("showOnProductPage", checked)
          }
        />
      </div>
    </section>
  );
};

const VisibilityToggle = ({
  label,
  description,
  checked,
  onChange,
  required,
}) => {
  return (
    <div>
      <div className="flex items-center gap-2">
        <p className="text-sm font-medium text-slate-700">
          {label}

          {required && (
            <span className="ml-1 text-red-500">*</span>
          )}
        </p>
      </div>

      <div className="mt-3 flex items-center gap-3">
        <button
          type="button"
          role="switch"
          aria-checked={checked}
          onClick={() => onChange(!checked)}
          className={`
            relative
            h-6
            w-11
            rounded-full
            transition
            ${
              checked
                ? "bg-emerald-500"
                : "bg-slate-200"
            }
          `}
        >
          <span
            className={`
              absolute
              top-1
              h-4
              w-4
              rounded-full
              bg-white
              shadow-sm
              transition
              ${
                checked
                  ? "left-6"
                  : "left-1"
              }
            `}
          />
        </button>

        <span className="text-sm font-semibold text-slate-800">
          {checked ? "Yes" : "No"}
        </span>
      </div>

      <p className="mt-2 text-xs leading-5 text-slate-400">
        {description}
      </p>
    </div>
  );
};

export default AttributeVisibilitySection;