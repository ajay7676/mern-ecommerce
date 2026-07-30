import { useId } from "react";
import { FiInfo } from "react-icons/fi";

const LowStockField = ({
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
      <div className="mb-2 flex items-center gap-1.5">
        <label
          htmlFor={inputId}
          className="text-xs font-semibold text-slate-800"
        >
          Low Stock Threshold
        </label>

        <span
          tabIndex={0}
          aria-label="A warning will appear when stock reaches this value."
          data-tip="A warning will appear when stock reaches this value."
          className="tooltip tooltip-top inline-flex cursor-help"
        >
          <FiInfo
            aria-hidden="true"
            className="text-xs text-slate-500"
          />
        </span>
      </div>

      <input
        id={inputId}
        name="lowStockThreshold"
        type="text"
        inputMode="numeric"
        value={value}
        disabled={disabled}
        placeholder="5"
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

export default LowStockField;