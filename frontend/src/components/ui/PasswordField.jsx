import { useState } from "react";
import {
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import clsx from "clsx";

const PasswordField = ({
  id,
  name,
  label,
  value,
  placeholder,
  error,
  onChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-xs font-medium text-slate-600"
      >
        {label}
      </label>

      <div className="relative">
        <input
          id={id}
          name={name}
          type={showPassword ? "text" : "password"}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className={clsx(
            "input input-bordered h-11 w-full rounded-md",
            "border-slate-200 bg-white px-3 pr-11",
            "text-sm text-slate-800 shadow-none",
            "placeholder:text-slate-400",
            "focus:border-indigo-500 focus:outline-none",
            error && "border-red-400",
          )}
        />

        <button
          type="button"
          onClick={() => setShowPassword((current) => !current)}
          aria-label={
            showPassword ? "Hide password" : "Show password"
          }
          className="
            absolute right-3 top-1/2
            -translate-y-1/2 text-slate-500
            transition-colors hover:text-indigo-600
          "
        >
          {showPassword ? (
            <FiEyeOff className="h-5 w-5" />
          ) : (
            <FiEye className="h-5 w-5" />
          )}
        </button>
      </div>

      {error && (
        <p className="mt-1 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default PasswordField;