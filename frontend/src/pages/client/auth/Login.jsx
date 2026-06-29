import { Link } from "react-router-dom";
import { FiMail } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import AuthLayout from "../../../components/auth/AuthLayout";
import AuthHeader from "../../../components/auth/AuthHeader";
import { loginSchema } from "../../../validation/authSchema";
import useLogin from "../../../hooks/mutations/useLogin";
import FormInput from "../../../components/common/FormInput";
import PasswordInput from "../../../components/common/PasswordInput";

const Login = () => {

const loginMutation = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (formData) => {
    loginMutation.mutate(formData);
  };

  return (
     <AuthLayout>
      <AuthHeader
        title="Welcome back"
        subtitle="Login to continue shopping"
      />
       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormInput
          label="Email address"
          icon={FiMail}
          type="email"
          placeholder="Enter your email"
          disabled={loginMutation.isPending}
          error={errors.email?.message}
          {...register("email")}
        />

        <PasswordInput
          placeholder="Enter your password"
          disabled={loginMutation.isPending}
          error={errors.password?.message}
          {...register("password")}
        />

        <div className="flex items-center justify-between text-sm">
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
          disabled={loginMutation.isPending}
          className="btn w-full bg-blue-600 hover:bg-blue-700 text-white border-none"
        >
          {loginMutation.isPending ? "Logging in..." : "Log In"}
        </button>
      </form>

      <p className="text-center text-sm text-slate-500 mt-7">
        Don’t have an account?{" "}
        <Link to="/register" className="font-bold text-blue-600">
          Register
        </Link>
      </p>
      </AuthLayout>
  );
};

export default Login;