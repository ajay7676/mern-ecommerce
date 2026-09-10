import {
  GripVertical,
  Plus,
  Trash2,
} from "lucide-react";

const AttributeTypeFields = ({
  type,
  fields,
  append,
  remove,
  register,
  errors,
}) => {
  if (type === "dropdown") {
    return (
      <section className="border-t border-slate-200 pt-6">
        <SectionTitle
          title="Attribute Values"
          description="Add dropdown options for this attribute."
        />

        <div className="space-y-3">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="flex items-center gap-3"
            >
              <GripVertical className="h-4 w-4 text-slate-400" />

              <div className="flex-1">
                <input
                  type="text"
                  {...register(`values.${index}.label`)}
                  placeholder="e.g. XL"
                  className="input input-bordered h-11 w-full bg-white"
                />

                {errors.values?.[index]?.label && (
                  <p className="mt-1 text-xs text-error">
                    {errors.values[index].label.message}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={() => remove(index)}
                className="btn btn-ghost btn-sm text-slate-500"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        {errors.values?.message && (
          <p className="mt-2 text-sm text-error">
            {errors.values.message}
          </p>
        )}

        <button
          type="button"
          onClick={() =>
            append({
              label: "",
              value: "",
              colorCode: "#000000",
            })
          }
          className="btn btn-outline btn-primary btn-sm mt-4"
        >
          <Plus className="h-4 w-4" />
          Add Value
        </button>
      </section>
    );
  }

  if (type === "switch") {
    return (
      <section className="border-t border-slate-200 pt-6">
        <SectionTitle
          title="Attribute Values"
          description="Add color or visual selection values."
        />

        <div className="space-y-3">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="flex items-center gap-3"
            >
              <GripVertical className="h-4 w-4 text-slate-400" />

              <input
                type="color"
                {...register(`values.${index}.colorCode`)}
                className="h-10 w-10 cursor-pointer rounded-full border border-slate-300 bg-white p-1"
              />

              <div className="flex-1">
                <input
                  type="text"
                  {...register(`values.${index}.label`)}
                  placeholder="e.g. Black"
                  className="input input-bordered h-11 w-full bg-white"
                />

                {errors.values?.[index]?.label && (
                  <p className="mt-1 text-xs text-error">
                    {errors.values[index].label.message}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={() => remove(index)}
                className="btn btn-ghost btn-sm text-slate-500"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() =>
            append({
              label: "",
              value: "",
              colorCode: "#000000",
            })
          }
          className="btn btn-outline btn-primary btn-sm mt-4"
        >
          <Plus className="h-4 w-4" />
          Add Value
        </button>
      </section>
    );
  }

  if (type === "text") {
    return (
      <section className="border-t border-slate-200 pt-6">
        <SectionTitle
          title="Text Settings"
          description="Configure text input behavior."
        />

        <div className="grid gap-4">
          <InputField
            label="Placeholder Text"
            name="placeholder"
            register={register}
            placeholder="Enter your text here"
            error={errors.placeholder?.message}
          />

          <InputField
            label="Max Length"
            name="maxLength"
            type="number"
            register={register}
            placeholder="50"
            error={errors.maxLength?.message}
          />

          <InputField
            label="Default Value"
            name="defaultValue"
            register={register}
            placeholder="e.g. Happy Birthday"
            error={errors.defaultValue?.message}
          />
        </div>
      </section>
    );
  }

  if (type === "number") {
    return (
      <section className="border-t border-slate-200 pt-6">
        <SectionTitle
          title="Number Settings"
          description="Configure numeric input behavior."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <InputField
            label="Min Value"
            name="minValue"
            type="number"
            register={register}
            error={errors.minValue?.message}
          />

          <InputField
            label="Max Value"
            name="maxValue"
            type="number"
            register={register}
            error={errors.maxValue?.message}
          />

          <InputField
            label="Step"
            name="step"
            type="number"
            register={register}
            placeholder="0.1"
            error={errors.step?.message}
          />

          <InputField
            label="Unit"
            name="unit"
            register={register}
            placeholder="kg"
            error={errors.unit?.message}
          />
        </div>

        <div className="mt-4">
          <InputField
            label="Default Value"
            name="defaultValue"
            type="number"
            register={register}
            error={errors.defaultValue?.message}
          />
        </div>
      </section>
    );
  }

  if (type === "boolean") {
    return (
      <section className="border-t border-slate-200 pt-6">
        <SectionTitle
          title="Boolean Settings"
          description="Configure true and false labels."
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <InputField
            label="Label When True"
            name="trueLabel"
            register={register}
            placeholder="Yes, this product is fragile"
            error={errors.trueLabel?.message}
          />

          <InputField
            label="Label When False"
            name="falseLabel"
            register={register}
            placeholder="No"
            error={errors.falseLabel?.message}
          />
        </div>

        <div className="mt-4">
          <label className="label font-semibold">
            Default Value
          </label>

          <select
            {...register("defaultValue")}
            className="select select-bordered w-full bg-white"
          >
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>
      </section>
    );
  }

  return null;
};

const SectionTitle = ({ title, description }) => {
  return (
    <div className="mb-4 flex items-start gap-3">
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
        2
      </span>

      <div>
        <h3 className="text-lg font-bold text-slate-900">
          {title}
        </h3>

        <p className="text-sm text-slate-500">
          {description}
        </p>
      </div>
    </div>
  );
};

const InputField = ({
  label,
  name,
  type = "text",
  register,
  placeholder,
  error,
}) => {
  return (
    <div>
      <label className="label font-semibold">
        {label}
      </label>

      <input
        type={type}
        {...register(name)}
        placeholder={placeholder}
        className="input input-bordered w-full bg-white"
      />

      {error && (
        <p className="mt-1 text-xs text-error">
          {error}
        </p>
      )}
    </div>
  );
};

export default AttributeTypeFields;