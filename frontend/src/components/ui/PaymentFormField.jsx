import clsx from "clsx";

const PaymentFormField = ({
  id,
  label,
  name,
  value,
  placeholder,
  type = "text",
  maxLength,
  error,
  onChange,
}) => {
  return (
    <div>
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
        maxLength={maxLength}
        placeholder={placeholder}
        onChange={onChange}
        className={clsx(
          "input input-bordered h-11 w-full rounded-md",
          "border-slate-200 bg-white text-sm shadow-none",
          "placeholder:text-slate-400",
          "focus:border-indigo-500 focus:outline-none",
          error && "border-red-400",
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

export default PaymentFormField;
