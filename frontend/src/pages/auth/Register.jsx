import { useState } from "react";
import { Link } from "react-router-dom";
import { FiEye, FiEyeOff, FiLock, FiMail, FiUser } from "react-icons/fi";

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);

  return (
     <section className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-100 to-cyan-100 px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 md:p-8">
        <div className="text-center mb-7">
          <div className="flex items-center justify-center gap-2">
            <div className="w-8 h-8 rounded bg-blue-600 text-white flex items-center justify-center font-bold">
              V
            </div>
            <h2 className="text-2xl font-bold text-blue-600">Valid India</h2>
          </div>

          <h1 className="text-2xl font-bold text-slate-700 mt-7">
            Create an account
          </h1>
          <p className="text-sm text-slate-500 mt-2">
            Welcome back! Select method to sign up
          </p>
        </div>

        <form className="space-y-4">
          <label className="form-control">
            <span className="label-text font-semibold text-slate-700">
              Full Name
            </span>
            <div className="input input-bordered flex items-center gap-3 bg-white w-full mt-2 mb-2">
              <FiUser className="text-slate-500" />
              <input
                type="text"
                placeholder="Enter your full name"
                className="grow w-full"
              />
            </div>
          </label>

          <label className="form-control">
            <span className="label-text font-semibold text-slate-700">
              Email address
            </span>
            <div className="input input-bordered flex items-center gap-3 bg-white w-full mt-2 mb-2">
              <FiMail className="text-slate-500" />
              <input
                type="email"
                placeholder="Enter your email"
                className="grow"
              />
            </div>
          </label>

          <label className="form-control">
            <span className="label-text font-semibold text-slate-700">
              Password
            </span>
            <div className="input input-bordered flex items-center gap-3 bg-white w-full mt-2 mb-2 pr-0">
              <FiLock className="text-slate-500" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="grow"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="h-full px-4 border-l border-slate-200"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </label>
          <div className="flex items-center justify-between text-sm mt-3">
            <label className="flex items-center gap-2 text-slate-500">
              <input type="checkbox" className="checkbox checkbox-sm" />
              Remember me
            </label>

            <Link to="/forgot-password" className="text-blue-600 font-medium">
              Forgot your password?
            </Link>
          </div>

          <button
            type="submit"
            className="btn w-full bg-blue-600 hover:bg-blue-700 text-white border-none"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center text-sm text-slate-500 mt-7">
          Already have an account?{" "}
          <Link to="/login" className="font-bold text-blue-600">
            Log in
          </Link>
        </p>
      </div>
    </section>
  )
}

export default Register