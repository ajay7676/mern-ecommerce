import { useId } from "react";

const CURRENCY_OPTIONS = [
  {
    value: "INR",
    label: "INR – Indian Rupee",
  },
  {
    value: "USD",
    label: "USD – US Dollar",
  },
  {
    value: "EUR",
    label: "EUR – Euro",
  },
  {
    value: "GBP",
    label: "GBP – British Pound",
  },
];

const CurrencySelect = ({
  value = "INR",
  options = CURRENCY_OPTIONS,
  error = "",
  disabled = false,
  onChange,
}) => {
  const inputId = useId();
  const errorId = `${inputId}-error`;

  return (
    <div>
      <label
        htmlFor={inputId}
        className="mb-2 block text-xs font-semibold text-slate-800"
      >
        Currency
        <span className="ml-1 text-red-500">*</span>
      </label>

      <select
        id={inputId}
        name="currency"
        value={value}
        disabled={disabled}
        required
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        onChange={(event) => onChange(event.target.value)}
        className={`select h-10 min-h-10 w-full rounded-md border bg-white px-3 text-sm font-medium
          text-slate-800 outline-none transition
          focus:border-violet-500 focus:ring-2 focus:ring-violet-100
          disabled:cursor-not-allowed disabled:bg-slate-100 ${
            error
              ? "border-red-400"
              : "border-slate-200"
          }`}
      >
        {options.map((currency) => (
          <option
            key={currency.value}
            value={currency.value}
          >
            {currency.label}
          </option>
        ))}
      </select>

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

export default CurrencySelect;