import { FiChevronDown } from "react-icons/fi";

import CategoryFieldError from "./CategoryFieldError";

const inputClass = `h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800
 outline-none transition  placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-100
 disabled:cursor-not-allowed  disabled:bg-slate-50
`;

const CategoryBasicFields = ({
  values,
  errors,
  parentCategories,
  onChange,
  disabled,
  mode = "add"
}) => {
  return (
    <section>
      <div>
        <h3 className="text-sm font-semibold text-slate-900">
          Basic Information
        </h3>

        <p className="mt-1 text-xs text-slate-500">
          Enter the main details for this category.
        </p>
      </div>
      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Category Name
            <span className="ml-1 text-red-500">*</span>
          </label>

          <input
            name="name"
            value={values.name}
            onChange={(event) => onChange("name", event.target.value)}
            disabled={disabled}
            placeholder="e.g. Clothing"
            className={inputClass}
          />

          <CategoryFieldError message={errors.name} />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Slug
            <span className="ml-1 text-red-500">*</span>
          </label>

          <input
            name="slug"
            value={values.slug}
            onChange={(event) => onChange("slug", event.target.value)}
            disabled={disabled}
            placeholder="clothing"
            className={inputClass}
          />

          <CategoryFieldError message={errors.slug} />
        </div>

        <div className="sm:col-span-2">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Description
          </label>

          <textarea
            name="description"
            value={values.description}
            onChange={(event) => onChange("description", event.target.value)}
            disabled={disabled}
            rows={4}
            placeholder="Write a short description..."
            className="
              w-full
              resize-none
              rounded-lg
              border
              border-slate-200
              bg-white
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

          <div className="mt-1 flex items-center justify-between gap-3">
            <CategoryFieldError message={errors.description} />

            {/* <span className="ml-auto text-xs text-slate-400">
              {values?.description.length ?? 0}/500
            </span> */}
          </div>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Parent Category
          </label>

          <div className="relative">
            <select
              name="parentCategory"
              value={values.parentCategory}
              onChange={(event) =>
                onChange("parentCategory", event.target.value)
              }
              disabled={disabled}
              className={`
                ${inputClass}
                appearance-none
                pr-10
              `}
            >
              <option value="">None — Top Level</option>

              {parentCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            <FiChevronDown
              size={16}
              className="
                pointer-events-none
                absolute
                right-3
                top-1/2
                -translate-y-1/2
                text-slate-400
              "
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Status
          </label>

          <div className="relative">
            <select
              value={values.status}
              onChange={(event) => onChange("status", event.target.value)}
              disabled={disabled}
              className={`
                ${inputClass}
                appearance-none
                pr-10
              `}
            >
              <option value="active">Active</option>

              <option value="inactive">Inactive</option>
            </select>

            <FiChevronDown
              size={16}
              className="
                pointer-events-none
                absolute
                right-3
                top-1/2
                -translate-y-1/2
                text-slate-400
              "
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Sort Order
          </label>

          <input
            type="number"
            min="0"
            value={values.sortOrder}
            onChange={(event) => onChange("sortOrder", event.target.value)}
            disabled={disabled}
            placeholder="0"
            className={inputClass}
          />

          <CategoryFieldError message={errors.sortOrder} />

          <p className="mt-1 text-xs text-slate-400">
            Lower numbers appear first.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CategoryBasicFields;
