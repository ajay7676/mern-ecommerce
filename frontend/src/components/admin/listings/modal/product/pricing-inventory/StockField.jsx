import { useId } from "react";

const StockField = ({
  value = "",
  error = "",
  disabled = false,
  onChange,
}) => {
  const inputId = useId();
  const errorId = `${inputId}-error`;

  const handleChange = (event) => {
    const nextValue = event.target.value;

    if (nextValue === "" || /^\d+$/.test(nextValue)) {
      onChange(nextValue);
    }
  };

  return (
    <div>
      <label
        htmlFor={inputId}
        className="mb-2 block text-xs font-semibold text-slate-800"
      >
        Stock Quantity
        <span className="ml-1 text-red-500">*</span>
      </label>

      <input
        id={inputId}
        name="stock"
        type="text"
        inputMode="numeric"
        value={value}
        disabled={disabled}
        placeholder="75"
        required={!disabled}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        onChange={handleChange}
        className={`input h-10 w-full rounded-md border bg-white px-3 text-sm font-medium text-slate-800
          outline-none transition
          focus:border-violet-500 focus:ring-2 focus:ring-violet-100
          disabled:cursor-not-allowed disabled:bg-slate-100 ${
            error
              ? "border-red-400"
              : "border-slate-200"
          }`}
      />

      {error && (
        <p
          id={errorId}
          role="alert"
          className="mt-1 text-xs text-red-500"
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default StockField;