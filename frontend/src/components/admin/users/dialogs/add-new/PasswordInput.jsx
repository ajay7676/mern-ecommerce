import { useState } from "react";

import { FiEye, FiEyeOff, FiLock } from "react-icons/fi";

const PasswordInput = ({
  label,
  name,
  value,
  error,
  onChange,
  placeholder,
  disabled = false,
  autoComplete = "new-password",
  required = false,
}) => {
    const [showPassword, setShowPassword] =
    useState(false);
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}

        {required && (
          <span className="ml-1 text-red-500">
            *
          </span>
        )}
      </label>

      <div className="relative">
        <FiLock
          className="
            pointer-events-none
            absolute
            left-3
            top-1/2
            -translate-y-1/2
            text-slate-400
          "
          size={17}
        />

        <input
          type={showPassword ? "text" : "password"}
          name={name}
          value={value}
          onChange={(event) =>
            onChange(
              name,
              event.target.value
            )
          }
          disabled={disabled}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          className={`
            h-11
            w-full
            rounded-lg
            border
            bg-white
            pl-10
            pr-11
            text-sm
            text-slate-800
            outline-none
            transition
            placeholder:text-slate-400
            focus:ring-2
            disabled:cursor-not-allowed
            disabled:bg-slate-50
            disabled:text-slate-500

            ${
              error
                ? `
                  border-red-300
                  focus:border-red-500
                  focus:ring-red-100
                `
                : `
                  border-slate-200
                  focus:border-violet-500
                  focus:ring-violet-100
                `
            }
          `}
        />

        <button
          type="button"
          onClick={() =>
            setShowPassword(
              (current) => !current
            )
          }
          disabled={disabled}
          aria-label={
            showPassword
              ? "Hide password"
              : "Show password"
          }
          className="
            absolute
            right-3
            top-1/2
            flex
            -translate-y-1/2
            items-center
            justify-center
            text-slate-400
            transition
            hover:text-slate-700
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          {showPassword ? (
            <FiEyeOff size={18} />
          ) : (
            <FiEye size={18} />
          )}
        </button>
      </div>

      {error && (
        <p
          className="
            mt-1.5
            text-xs
            font-medium
            text-red-500
          "
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default PasswordInput;
