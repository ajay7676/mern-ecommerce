import { useId } from "react";
// import { FiChevronDown } from "react-icons/fi";
import { PRODUCT_STATUS_OPTIONS } from "../../../../../../constants/admin/products/productStatus";


const StatusSelect = ({
  value = "draft",
  options = PRODUCT_STATUS_OPTIONS,
  error = "",
  disabled = false,
  onChange,
}) => {
  const inputId = useId();
  const errorId = `${inputId}-error`;

  const currentStatus =
    options.find((option) => option.value === value) ??
    options[0];

  const isDisabled = Boolean(disabled);

  return (
    <div>
      <label
        htmlFor={inputId}
        className="mb-2 block text-xs font-semibold text-slate-800"
      >
        Status
        <span className="ml-1 text-red-500">*</span>
      </label>

      <div className="relative">
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute left-3 top-1/2
                      z-10 h-2 w-2 -translate-y-1/2 rounded-full
                      ${currentStatus.color}`}
        />

        <select
          id={inputId}
          name="status"
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
                      rounded-md border bg-white py-0 pl-8 pr-9
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
          {options.map((status) => (
            <option
              key={status.value}
              value={status.value}
              className="cursor-pointer"
            >
              {status.label}
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

export default StatusSelect;