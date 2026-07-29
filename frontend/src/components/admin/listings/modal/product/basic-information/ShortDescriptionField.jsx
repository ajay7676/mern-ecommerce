const SHORT_DESCRIPTION_MAX_LENGTH = 160;

const ShortDescriptionField = ({
  value = "",
  error = "",
  disabled = false,
  onChange,
}) => {
  const handleChange = (event) => {
    onChange?.(event.target.value);
  };

  const isNearLimit =
    value.length >= SHORT_DESCRIPTION_MAX_LENGTH * 0.9;

  return (
    <div>
      <label
        htmlFor="short-description"
        className="mb-2 block text-sm font-semibold text-slate-800"
      >
        Short Description
        <span className="ml-1 text-red-500" aria-hidden="true">
          *
        </span>
        <span className="sr-only"> required</span>
      </label>

      <div className="relative">
        <input
          id="short-description"
          name="shortDescription"
          type="text"
          value={value}
          maxLength={SHORT_DESCRIPTION_MAX_LENGTH}
          disabled={disabled}
          required
          autoComplete="off"
          placeholder="Enter a short product description"
          aria-invalid={Boolean(error)}
          aria-describedby={
            error ? "short-description-error" : undefined
          }
          onChange={handleChange}
          className={`
            h-12 w-full rounded-lg border bg-white
            px-3 pr-20 text-sm text-slate-800
            outline-none transition
            placeholder:text-slate-400
            disabled:cursor-not-allowed
            disabled:bg-slate-100
            disabled:text-slate-500
            ${
              error
                ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                : "border-slate-200 hover:border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            }
          `}
        />

        <span
          className={`
            pointer-events-none absolute right-3 top-1/2
            -translate-y-1/2 text-xs font-medium
            ${isNearLimit ? "text-amber-600" : "text-slate-400"}
          `}
        >
          {value.length}/{SHORT_DESCRIPTION_MAX_LENGTH}
        </span>
      </div>

      {error && (
        <p
          id="short-description-error"
          role="alert"
          className="mt-1.5 text-xs font-medium text-red-500"
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default ShortDescriptionField;