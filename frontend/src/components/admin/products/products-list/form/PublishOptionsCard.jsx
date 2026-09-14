
import { Controller } from "react-hook-form";

const publishOptions = [
  {
    value: "publishNow",
    label: "Publish Now",
    description: "Make this product live immediately.",
  },
  {
    value: "schedulePublish",
    label: "Schedule Publish",
    description: "Choose a future date and time.",
  },
  {
    value: "saveAsDraft",
    label: "Save as Draft",
    description: "Save this product as draft to publish later.",
  },
];

const PublishOptionsCard = ({
  control,
  register,
  errors,
  publishOption,
}) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-lg font-extrabold text-slate-950">
        Publishing Options
      </h3>

      <p className="mt-1 text-sm font-medium text-slate-500">
        Choose how you want to publish this product.
      </p>

      <Controller
        name="publishOption"
        control={control}
        render={({ field }) => (
          <div className="mt-5 space-y-4">
            {publishOptions.map((option) => (
              <label
                key={option.value}
                className="flex cursor-pointer items-start gap-3"
              >
                <input
                  type="radio"
                  className="radio radio-primary mt-1"
                  checked={field.value === option.value}
                  onChange={() => field.onChange(option.value)}
                />

                <span>
                  <span className="block text-sm font-bold text-slate-900">
                    {option.label}
                  </span>

                  <span className="block text-xs font-medium text-slate-500">
                    {option.description}
                  </span>
                </span>
              </label>
            ))}
          </div>
        )}
      />

      {publishOption === "schedulePublish" && (
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div>
            <input
              type="date"
              className="input input-bordered h-11 w-full rounded-xl border-slate-200 bg-white text-sm"
              {...register("scheduleDate")}
            />

            {errors.scheduleDate?.message && (
              <p className="mt-1 text-xs font-medium text-error">
                {errors.scheduleDate.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="time"
              className="input input-bordered h-11 w-full rounded-xl border-slate-200 bg-white text-sm"
              {...register("scheduleTime")}
            />

            {errors.scheduleTime?.message && (
              <p className="mt-1 text-xs font-medium text-error">
                {errors.scheduleTime.message}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PublishOptionsCard;