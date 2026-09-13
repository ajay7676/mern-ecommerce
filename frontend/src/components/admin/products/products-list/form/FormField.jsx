const FormError = ({ message }) => {
  if (!message) return null;

  return <p className="mt-1 text-xs font-medium text-error">{message}</p>;
};

export const TextInputField = ({
  label,
  required,
  helper,
  error,
  rightText,
  ...props
}) => {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-slate-800">
        {label}
        {required && <span className="text-error"> *</span>}
      </label>

      <div className="relative">
        <input
          {...props}
          className="input input-bordered h-11 w-full rounded-xl border-slate-200 bg-white pr-16 text-sm focus:border-primary"
        />

        {rightText && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400">
            {rightText}
          </span>
        )}
      </div>

      <FormError message={error} />

      {helper && (
        <p className="mt-1 text-xs font-medium text-slate-500">{helper}</p>
      )}
    </div>
  );
};

export const TextAreaField = ({
  label,
  required,
  helper,
  error,
  rightText,
  rows = 3,
  ...props
}) => {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-slate-800">
        {label}
        {required && <span className="text-error"> *</span>}
      </label>

      <div className="relative">
        <textarea
          {...props}
          rows={rows}
          className="textarea textarea-bordered w-full resize-none rounded-xl border-slate-200 bg-white pr-16 text-sm focus:border-primary"
        />

        {rightText && (
          <span className="absolute bottom-3 right-4 text-xs font-medium text-slate-400">
            {rightText}
          </span>
        )}
      </div>

      <FormError message={error} />

      {helper && (
        <p className="mt-1 text-xs font-medium text-slate-500">{helper}</p>
      )}
    </div>
  );
};

export const SelectField = ({
  label,
  required,
  helper,
  error,
  children,
  ...props
}) => {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-slate-800">
        {label}
        {required && <span className="text-error"> *</span>}
      </label>

      <select
        {...props}
        className="select select-bordered h-11 min-h-11 w-full rounded-xl border-slate-200 bg-white text-sm focus:border-primary"
      >
        {children}
      </select>

      <FormError message={error} />

      {helper && (
        <p className="mt-1 text-xs font-medium text-slate-500">{helper}</p>
      )}
    </div>
  );
};
