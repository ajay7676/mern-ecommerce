import { useState } from "react";
import { FiEye, FiEyeOff, FiLock } from "react-icons/fi";
const PasswordInput = ({ label = "Password", error, ...props }) => {
     const [showPassword, setShowPassword] = useState(false);

  return (
      <label className="form-control">
      <span className="label-text font-semibold text-slate-700 ">{label}</span>
      <div className="input input-bordered flex items-center gap-3 bg-white w-full pr-0 mt-2 mb-2">
        <FiLock className="text-slate-500" />
        <input
          {...props}
          type={showPassword ? "text" : "password"}
          className="grow"
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="h-full text-center px-4 border-l border-slate-200"
        >
          {showPassword ? <FiEyeOff /> : <FiEye />}
        </button>
      </div>

      {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
    </label>
  )
}

export default PasswordInput