import { Link } from "react-router-dom";
import { FiMail, FiUser } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import AuthLayout from "../../../components/auth/AuthLayout";
import AuthHeader from "../../../components/auth/AuthHeader";
import FormInput from "../../../components/common/FormInput";
import PasswordInput from "../../../components/common/PasswordInput";
import useRegister from "../../../hooks/mutations/useRegister";
import { registerSchema } from "../../../validation/authSchema";

const Register = () => {
  const registerUserMutation = useRegister();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

   const onSubmit = (formData) => {
    registerUserMutation.mutate(formData);
  };
  return (
    <AuthLayout>
      <AuthHeader
        title="Create an account"
        subtitle="Welcome back! Select method to sign up"
      />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
         <FormInput
          label="Full Name"
          icon={FiUser}
          type="text"
          placeholder="Enter your full name"
          disabled={registerUserMutation.isPending}
          error={errors.name?.message}
          {...register("name")}
        />

        <FormInput
          label="Email address"
          icon={FiMail}
          type="email"
          placeholder="Enter your email"
          disabled={registerUserMutation.isPending}
          error={errors.email?.message}
          {...register("email")}
        />
         <PasswordInput
          placeholder="Enter your password"
          disabled={registerUserMutation.isPending}
          error={errors.password?.message}
          {...register("password")}
        />
          <button
          type="submit"
          disabled={registerUserMutation.isPending}
          className="btn w-full bg-blue-600 hover:bg-blue-700 text-white border-none"
        >
          {registerUserMutation.isPending ? "Creating account..." : "Sign Up"}
        </button>
      </form>
      <p className="text-center text-sm text-slate-500 mt-7">
        Already have an account?{" "}
        <Link to="/login" className="font-bold text-blue-600">
          Log in
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Register;
