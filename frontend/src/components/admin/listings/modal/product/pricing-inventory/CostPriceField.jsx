import { useId } from "react";
import { FiInfo } from "react-icons/fi";

const CostPriceField = ({
  value = "",
  currencySymbol = "₹",
  error = "",
  disabled = false,
  onChange,
}) => {
  const inputId = useId();
  const errorId = `${inputId}-error`;

  return (
    <div>
      <div className="mb-2 flex items-center gap-1.5">
        <label
          htmlFor={inputId}
          className="text-xs font-semibold text-slate-800"
        >
          Cost Price
        </label>

        <span
          tabIndex={0}
          aria-label="Internal product cost. Customers cannot see this value."
          data-tip="Internal product cost. Customers cannot see it."
          className="tooltip tooltip-top inline-flex cursor-help"
        >
          <FiInfo
            aria-hidden="true"
            className="text-xs text-slate-500"
          />
        </span>
      </div>

      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-700">
          {currencySymbol}
        </span>

        <input
          id={inputId}
          name="costPrice"
          type="number"
          inputMode="decimal"
          min="0"
          step="0.01"
          value={value}
          disabled={disabled}
          placeholder="650"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          onChange={(event) => onChange(event.target.value)}
          onWheel={(event) => event.currentTarget.blur()}
          className={`input h-10 w-full rounded-md border bg-white pl-9 pr-3 text-sm font-medium text-slate-800
            outline-none transition
            focus:border-violet-500 focus:ring-2 focus:ring-violet-100
            disabled:cursor-not-allowed disabled:bg-slate-100 ${
              error
                ? "border-red-400"
                : "border-slate-200"
            }`}
        />
      </div>

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

export default CostPriceField;