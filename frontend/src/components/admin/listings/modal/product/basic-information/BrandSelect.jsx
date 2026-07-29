import { FiChevronDown, FiX } from "react-icons/fi";
import { brandOptions } from "../data/product.data";

const BrandSelect = ({
  value = "",
  options = [],
  error = "",
  disabled = false,
  onChange,
}) => {
  const selectedOption = options.find(
    (option) => option.value === value,
  );

  const handleChange = (event) => {
    onChange?.(event.target.value);
  };

  const handleClear = () => {
    onChange?.("");
  };

  return (
    <div>
      <label
        htmlFor="product-brand"
        className="mb-2 block text-sm font-semibold text-slate-800"
      >
        Brand
        <span className="ml-1 text-red-500" aria-hidden="true">
          *
        </span>
        <span className="sr-only"> required</span>
      </label>

      <div className="relative">
        <select
          id="product-brand"
          name="brand"
          value={value}
          disabled={disabled}
          required
          aria-invalid={Boolean(error)}
          aria-describedby={
            error ? "product-brand-error" : undefined
          }
          onChange={handleChange}
          className={`
            h-12 w-full appearance-none rounded-lg
            border bg-white px-3 pr-20
            text-sm text-slate-800 outline-none
            transition
            disabled:cursor-not-allowed
            disabled:bg-slate-100
            disabled:text-slate-500
            ${
              error
                ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                : "border-slate-200 hover:border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            }
          `}
        >
          <option value="">Select product brand</option>

          {brandOptions.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>

        {selectedOption && !disabled && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear selected brand"
            className="
              absolute right-10 top-1/2
              flex h-7 w-7 -translate-y-1/2
              items-center justify-center rounded-md
              text-slate-400 transition
              hover:bg-slate-100 hover:text-slate-700
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-indigo-500
            "
          >
            <FiX className="h-4 w-4" />
          </button>
        )}

        <FiChevronDown
          aria-hidden="true"
          className="
            pointer-events-none absolute
            right-3 top-1/2 h-4 w-4
            -translate-y-1/2 text-slate-500
          "
        />
      </div>

      {selectedOption?.secondaryText && !error && (
        <p className="mt-1.5 text-xs text-slate-500">
          {selectedOption.secondaryText}
        </p>
      )}

      {error && (
        <p
          id="product-brand-error"
          role="alert"
          className="mt-1.5 text-xs font-medium text-red-500"
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default BrandSelect;