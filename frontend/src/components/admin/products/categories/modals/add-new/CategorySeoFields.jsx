import CategoryFieldError from "./CategoryFieldError";

const CategorySeoFields = ({
  values,
  errors,
  onChange,
  disabled,
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
        <h3 className="text-sm font-semibold text-slate-900">
          SEO Settings
        </h3>

        <p className="mt-1 text-xs text-slate-500">
          Improve how this category appears in search results.
        </p>
      </div>

      <div className="mt-5 space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            SEO Title
          </label>

          <input
            value={values.seoTitle}
            onChange={(event) =>
              onChange(
                "seoTitle",
                event.target.value,
              )
            }
            disabled={disabled}
            placeholder="Best Clothing Collection"
            className="
              h-11
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

          <div className="mt-1 flex justify-between gap-3">
            <CategoryFieldError
              message={errors.seoTitle}
            />

            <span className="ml-auto text-xs text-slate-400">
              {values.seoTitle.length}/60
            </span>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            SEO Description
          </label>

          <textarea
            rows={3}
            value={values.seoDescription}
            onChange={(event) =>
              onChange(
                "seoDescription",
                event.target.value,
              )
            }
            disabled={disabled}
            placeholder="Write a search-friendly description..."
            className="
              w-full
              resize-none
              rounded-lg
              border
              border-slate-200
              px-3
              py-3
              text-sm
              outline-none
              focus:border-violet-500
              focus:ring-2
              focus:ring-violet-100
            "
          />

          <div className="mt-1 flex justify-between gap-3">
            <CategoryFieldError
              message={
                errors.seoDescription
              }
            />

            <span className="ml-auto text-xs text-slate-400">
              {values.seoDescription.length}/160
            </span>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            SEO Keywords
          </label>

          <input
            value={values.seoKeywords}
            onChange={(event) =>
              onChange(
                "seoKeywords",
                event.target.value,
              )
            }
            disabled={disabled}
            placeholder="clothing, fashion, men, women"
            className="
              h-11
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
            Separate keywords with commas.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CategorySeoFields;