import { useId } from "react";
import { PRODUCT_VISIBILITY_OPTIONS } from "../../../../../../constants/admin/products/productStatus";

import {
  FiGlobe,
} from "react-icons/fi";
const VisibilitySelect = ({
  value = "public",
  options = PRODUCT_VISIBILITY_OPTIONS,
  error = "",
  disabled = false,
  onChange,
}) => {
  const inputId = useId();
  const errorId = `${inputId}-error`;

  const currentVisibility =
    options.find((option) => option.value === value) ??
    options[0];

  const VisibilityIcon =
    currentVisibility?.icon ?? FiGlobe;

  const isDisabled = Boolean(disabled);

  return (
    <div>
      <label
        htmlFor={inputId}
        className="mb-2 block text-xs font-semibold text-slate-800"
      >
        Visibility
        <span className="ml-1 text-red-500">*</span>
      </label>

      <div className="relative">
        <VisibilityIcon
          aria-hidden="true"
          className="pointer-events-none absolute left-3 top-1/2
                     z-10 -translate-y-1/2 text-base text-slate-500"
        />

        <select
          id={inputId}
          name="visibility"
          value={value}
          disabled={isDisabled}
          required
          aria-invalid={Boolean(error)}
          aria-describedby={
            error ? errorId : undefined
          }
          onChange={(event) =>
            onChange(event.target.value)
          }
          className={`select h-10 min-h-10 w-full appearance-none
                      rounded-md border bg-white py-0 pl-9 pr-9
                      text-sm font-medium text-slate-800
                      outline-none transition cursor-pointer
                      focus:border-violet-500 focus:ring-2
                      focus:ring-violet-100
                      disabled:cursor-not-allowed disabled:bg-slate-100 ${
                        error
                          ? "border-red-400"
                          : "border-slate-200"
                      }`}
        >
          {options.map((visibility) => (
            <option
              key={visibility.value}
              value={visibility.value}
            >
              {visibility.label}
            </option>
          ))}
        </select>

        {/* <FiChevronDown
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-1/2
                     -translate-y-1/2 text-sm text-slate-500"
        /> */}
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

export default VisibilitySelect;