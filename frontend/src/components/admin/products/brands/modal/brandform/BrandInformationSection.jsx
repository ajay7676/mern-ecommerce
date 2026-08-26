const inputClass = ` h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm
text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-violet-500
 focus:ring-2 focus:ring-violet-100 `;

import BrandFieldError from "./BrandFieldError";
const BrandInformationSection = ({ values, errors, onChange }) => {
  return (
    <section>
      <div>
        <h3 className="text-sm font-semibold text-slate-950">
          Brand Information
        </h3>

        <p className="mt-1 text-xs text-slate-500">
          Enter the basic information about this brand.
        </p>
      </div>
      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Brand Name
            <span className="ml-1 text-red-500">*</span>
          </label>

          <input
            value={values.name}
            onChange={(event) => onChange("name", event.target.value)}
            placeholder="Enter brand name"
            className={inputClass}
          />

          <p className="mt-1 text-xs text-slate-400">
            This name will be displayed on your store.
          </p>

          <BrandFieldError message={errors.name} />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Slug (URL)
            <span className="ml-1 text-red-500">*</span>
          </label>

          <input
            value={values.slug}
            onChange={(event) => onChange("slug", event.target.value)}
            placeholder="brand-slug"
            className={inputClass}
          />

          <p className="mt-1 text-xs text-slate-400">
            Unique slug for brand URL.
          </p>

          <BrandFieldError message={errors.slug} />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Description
          </label>

          <textarea
            rows={5}
            value={values.description}
            onChange={(event) => onChange("description", event.target.value)}
            maxLength={500}
            placeholder="Enter brand description..."
            className="
              w-full
              resize-none
              rounded-lg
              border
              border-slate-200
              px-3
              py-3
              text-sm
              text-slate-800
              outline-none
              transition
              placeholder:text-slate-400
              focus:border-violet-500
              focus:ring-2
              focus:ring-violet-100
            "
          />
           <p className="mt-1 text-xs text-slate-400">
            Describe the brnd and its history,quality,or special features.
          </p>

          <div className="mt-1 flex justify-between gap-3">
            <BrandFieldError message={errors.description} />

            <span className="ml-auto text-xs text-slate-400">
              {values.description?.length ?? 0}/500
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandInformationSection;
