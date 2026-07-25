import clsx from "clsx";

const AccountFormField = ({
  id,
  name,
  label,
  value,
  type = "text",
  placeholder,
  error,
  readOnly = false,
  onChange,
  className = "",
}) => {
  return (
    <div className={clsx("min-w-0", className)}>
      <label
        htmlFor={id}
        className="mb-2 block text-xs font-medium text-slate-600"
      >
        {label}
      </label>

      <input
        id={id}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        readOnly={readOnly}
        onChange={onChange}
        className={clsx(
          "input input-bordered h-11 w-full rounded-md",
          "border-slate-200 bg-white px-3",
          "text-sm text-slate-800 shadow-none",
          "placeholder:text-slate-400",
          "focus:border-indigo-500 focus:outline-none",
          readOnly && "cursor-not-allowed bg-slate-50",
          error && "border-red-400 focus:border-red-400",
        )}
      />

      {error && (
        <p className="mt-1 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default AccountFormField;
