import clsx from "clsx";

const FormField = ({
  id,
  label,
  name,
  value,
  placeholder,
  type = "text",
  error,
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
        value={value}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        className={clsx(
          "input input-bordered h-11 w-full rounded-md",
          "border-slate-200 bg-white px-3",
          "text-sm text-slate-800 shadow-none",
          "placeholder:text-slate-400",
          "focus:border-indigo-400 focus:outline-none",
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

export default FormField;