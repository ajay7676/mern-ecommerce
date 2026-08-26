import BrandFieldError from "./BrandFieldError";

const BrandSeoSection = ({
  seo,
  errors,
  onChange,
}) => {
  return (
    <section
      className="
        rounded-xl
        border
        border-slate-200
        bg-white
        p-5
      "
    >
      <h3 className="text-sm font-semibold text-slate-950">
        SEO Information
        <span className="ml-1 text-xs font-normal text-slate-400">
          (Optional)
        </span>
      </h3>

      <p className="mt-1 text-xs text-slate-500">
        Optimize your brand for search engines.
      </p>

      <div className="mt-5 space-y-4">
        <div>
          <label className="mb-2 block text-xs font-semibold text-slate-700">
            Meta Title
          </label>

          <input
            value={seo?.title}
            maxLength={60}
            onChange={(event) =>
              onChange(
                "title",
                event.target.value,
              )
            }
            placeholder="Enter meta title"
            className="
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

          <div className="mt-1 flex justify-between">
            <BrandFieldError
              message={
                errors.seoTitle
              }
            />

            <span className="ml-auto text-xs text-slate-400">
              {seo?.title?.length ?? 0}/60
            </span>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-xs font-semibold text-slate-700">
            Meta Description
          </label>

          <textarea
            rows={3}
            value={seo?.description}
            maxLength={160}
            onChange={(event) =>
              onChange(
                "description",
                event.target.value,
              )
            }
            placeholder="Enter meta description"
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

          <div className="mt-1 flex justify-between">
            <BrandFieldError
              message={
                errors.seoDescription
              }
            />

            <span className="ml-auto text-xs text-slate-400">
              {seo?.description?.length ?? 0}/160
            </span>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-xs font-semibold text-slate-700">
            Meta Keywords
          </label>

          <input
            value={seo?.keywords}
            onChange={(event) =>
              onChange(
                "keywords",
                event.target.value,
              )
            }
            placeholder="nike, sportswear, shoes"
            className="
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
        </div>
      </div>
    </section>
  );
};

export default BrandSeoSection;