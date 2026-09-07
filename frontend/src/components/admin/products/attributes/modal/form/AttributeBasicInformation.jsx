import { FiChevronDown } from "react-icons/fi";

import { ATTRIBUTE_TYPES } from "../../../../../../constants/admin/products/attribute.constants";
import AttributeFieldError from "../AttributeFieldError";

const inputClass = `
  h-11
  w-full
  rounded-lg
  border
  border-slate-200
  bg-white
  px-3
  text-sm
  text-slate-800
  outline-none
  transition
  placeholder:text-slate-400
  focus:border-violet-500
  focus:ring-2
  focus:ring-violet-100
`;

const AttributeBasicInformation = ({ register, errors }) => {
  return (
    <section className="rounded-xl border border-slate-200 bg-white">
      <div className="border-b border-slate-100 px-5 py-4">
        <div className="flex items-start gap-3">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-600 text-xs font-semibold text-white">
            1
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              Basic Information
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              Enter the basic details for this attribute.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-5 p-5 sm:grid-cols-2">
        {/* Name */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Attribute Name
            <span className="ml-1 text-red-500">*</span>
          </label>

          <input
            {...register("name")}
            placeholder="Enter attribute name"
            className={inputClass}
          />

          <p className="mt-1 text-xs text-slate-400">
            This name will be visible in your store.
          </p>

          <AttributeFieldError message={errors.name?.message} />
        </div>

        {/* Slug */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Attribute Slug (URL)
            <span className="ml-1 text-red-500">*</span>
          </label>

          <input
            {...register("slug")}
            placeholder="attribute-slug"
            className={inputClass}
          />

          <p className="mt-1 text-xs text-slate-400">
            Unique slug for attribute URL (e.g. size, color).
          </p>

          <AttributeFieldError message={errors.slug?.message} />
        </div>

        {/* Type */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Attribute Type
            <span className="ml-1 text-red-500">*</span>
          </label>

          <div className="relative">
            <select
              {...register("type")}
              className="select select-bordered w-full"
            >
              <option value="dropdown">Dropdown</option>

              <option value="switch">Switch</option>

              <option value="text">Text</option>

              <option value="boolean">Boolean</option>

              <option value="number">Number</option>
            </select>

            {/* <FiChevronDown
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={17}
            /> */}
          </div>

          <p className="mt-1 text-xs text-slate-400">
            Choose how customers will select this attribute.
          </p>

          <AttributeFieldError message={errors.type?.message} />
        </div>

        {/* Unit */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Unit <span className="text-slate-400">(Optional)</span>
          </label>

          <input
           {...register("unit")}
            placeholder="e.g. cm, inch, kg"
            className={inputClass}
          />

          <p className="mt-1 text-xs text-slate-400">
            Add unit if this attribute has measurement.
          </p>
        </div>

        {/* Description */}
        <div className="sm:col-span-2">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Description <span className="text-slate-400">(Optional)</span>
          </label>

          <textarea
            rows={4}
            maxLength={500}
            {...register("description")}
            placeholder="Enter attribute description..."
            className="
              min-h-27.5
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

          <div className="mt-1 flex justify-between gap-3">
            <div>
              <AttributeFieldError message={errors.description?.message} />
            </div>
{/* 
            <span className="text-xs text-slate-400">
              {values.description?.length || 0}/500
            </span> */}
          </div>

          <p className="mt-1 text-xs text-slate-400">
            Add description to help you and your team.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AttributeBasicInformation;
