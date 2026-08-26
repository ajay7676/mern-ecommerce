const Toggle = ({
  checked,
  onChange,
}) => {
  return (
    <button
      type="button"
      onClick={() =>
        onChange(!checked)
      }
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
          shadow
          transition
          ${
            checked
              ? "left-6"
              : "left-1"
          }
        `}
      />
    </button>
  );
};

const BrandVisibilitySection = ({
  values,
  onChange,
}) => {
  return (
    <section
      className="
        border-t
        border-slate-200
        pt-6
      "
    >
      <div>
        <h3 className="text-sm font-semibold text-slate-950">
          Status & Visibility
        </h3>

        <p className="mt-1 text-xs text-slate-500">
          Control the status and visibility of this brand.
        </p>
      </div>

      <div className="mt-5 grid gap-6 md:grid-cols-3">
        <div>
          <p className="text-xs font-semibold text-slate-700">
            Status
          </p>

          <div className="mt-3 flex items-center gap-3">
            <Toggle
              checked={
                values.status ===
                "active"
              }
              onChange={(checked) =>
                onChange(
                  "status",
                  checked
                    ? "active"
                    : "inactive",
                )
              }
            />

            <span className="text-sm text-slate-700">
              {values.status ===
              "active"
                ? "Active"
                : "Inactive"}
            </span>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold text-slate-700">
            Featured Brand
          </p>

          <div className="mt-3 flex items-center gap-3">
            <Toggle
              checked={
                values.isFeatured
              }
              onChange={(checked) =>
                onChange(
                  "isFeatured",
                  checked,
                )
              }
            />

            <span className="text-sm text-slate-600">
              Mark as featured
            </span>
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-700">
            Display Order
          </label>

          <input
            type="number"
            min="0"
            value={values.sortOrder}
            onChange={(event) =>
              onChange(
                "sortOrder",
                event.target.value,
              )
            }
            className="
              mt-3
              h-10
              w-full
              rounded-lg
              border
              border-slate-200
              px-3
              text-sm
              outline-none
              focus:border-violet-500
              focus:ring-2
              focus:ring-violet-100
            "
          />

          <p className="mt-1 text-xs text-slate-400">
            Lower numbers appear first.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BrandVisibilitySection;