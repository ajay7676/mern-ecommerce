import { forwardRef } from "react";
import clsx from "clsx";
// import { ChevronDown } from "lucide-react";

const SelectField = forwardRef(
  (
    {
      label,
      name,
      options = [],
      placeholder = "Select an option",
      icon: Icon,
      error,
      helperText,
      required = false,
      disabled = false,
      className = "",
      ...props
    },
    ref
  ) => {
    return (
      <div className="form-control w-full cursor-pointer">
        {/* Label */}
        {label && (
          <label className="label">
            <span className="label-text font-medium">
              {label}

              {required && (
                <span className="ml-1 text-error">*</span>
              )}
            </span>
          </label>
        )}

        {/* Select Wrapper */}
        <div className="relative">
          {/* Left Icon */}
          {Icon && (
            <Icon
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-base-content/50"
            />
          )}

          {/* Select */}
          <select
            ref={ref}
            name={name}
            disabled={disabled}
            className={clsx(
              "select select-bordered w-full appearance-none",
              Icon && "pl-11",
              error && "select-error",
              className
            )}
            {...props}
          >
            <option value="">
              {placeholder}
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

          {/* Right Arrow */}
          {/* <ChevronDown
            size={18}
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-base-content/50"
          /> */}
        </div>

        {/* Helper */}
        {!error && helperText && (
          <label className="label">
            <span className="label-text-alt">
              {helperText}
            </span>
          </label>
        )}

        {/* Error */}
        {error && (
          <label className="label">
            <span className="label-text-alt text-error">
              {error}
            </span>
          </label>
        )}
      </div>
    );
  }
);

SelectField.displayName = "SelectField";

export default SelectField;