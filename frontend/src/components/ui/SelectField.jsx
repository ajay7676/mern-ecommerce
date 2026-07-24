import clsx from "clsx";

const SelectField = ({
  id,
  label,
  name,
  value,
  options = [],
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

      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className={clsx(
          "select select-bordered h-11 min-h-11 w-full rounded-md",
          "border-slate-200 bg-white px-3",
          "text-sm text-slate-700 shadow-none",
          "focus:border-indigo-400 focus:outline-none",
          error && "border-red-400",
        )}
      >
        <option value="" disabled>
          Select {label.toLowerCase()}
        </option>

        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>

      {error && (
        <p className="mt-1 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default SelectField;