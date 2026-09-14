
import { Plus, Trash2 } from "lucide-react";

const createCustomField = () => ({
  id: crypto.randomUUID(),
  label: "",
  value: "",
});

const CustomInformationCard = ({
  fields,
  register,
  append,
  remove,
  errors,
}) => {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div>
        <h3 className="text-lg font-bold text-slate-950">
          Custom Information
        </h3>

        <p className="mt-1 text-sm font-medium text-slate-500">
          Add any custom information that is specific to this product.
        </p>
      </div>

      <div className="mt-5 space-y-4">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="grid gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-[1fr_1.5fr_auto]"
          >
            <div>
              <input
                type="text"
                placeholder="Field label"
                className="input input-bordered h-11 min-h-11 w-full rounded-xl border-slate-200 bg-white text-sm"
                {...register(`customFields.${index}.label`)}
              />

              {errors.customFields?.[index]?.label?.message && (
                <p className="mt-1 text-xs font-medium text-error">
                  {errors.customFields[index].label.message}
                </p>
              )}
            </div>

            <div>
              <input
                type="text"
                placeholder="Field value"
                className="input input-bordered h-11 min-h-11 w-full rounded-xl border-slate-200 bg-white text-sm"
                {...register(`customFields.${index}.value`)}
              />

              {errors.customFields?.[index]?.value?.message && (
                <p className="mt-1 text-xs font-medium text-error">
                  {errors.customFields[index].value.message}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={() => remove(index)}
              className="btn btn-ghost btn-circle text-error"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => append(createCustomField())}
        className="btn btn-outline btn-primary mt-5 h-12 min-h-12 w-full rounded-xl border-dashed"
      >
        <Plus className="h-4 w-4" />
        Add Custom Field
      </button>
    </section>
  );
};

export default CustomInformationCard;