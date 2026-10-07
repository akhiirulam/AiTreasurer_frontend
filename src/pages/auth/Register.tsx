import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Phone,
  Lock,
  CheckCircle2,
} from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { authApi } from "../../services/auth.api";
import {
  registerSchema,
  type RegisterFormData,
} from "../../validations/register.schema";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setLoading(true);
      setError("");

      await authApi.registerUser({
        fullName: data.fullName,
        email: data.email,
        mobileNumber: data.mobileNumber,
        password: data.password,
      });

      // Registration completed.
      // User must verify their email before logging in.
      setRegistrationSuccess(true);
    } catch (error: any) {
      console.error("Registration failed:", error);

      setError(
        error?.response?.data?.message ||
          "Registration failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  // ==================================================
  // REGISTRATION SUCCESS
  // ==================================================

  if (registrationSuccess) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f5f7f2] px-4 py-8">
        <div className="w-full max-w-md rounded-2xl border border-[#dce5da] bg-white p-6 text-center shadow-xl sm:p-8">
          {/* Logo */}
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-[#173f35] text-xl font-bold text-white">
            AT
          </div>

          {/* Success Icon */}
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#e4f2de]">
            <CheckCircle2 size={34} className="text-[#238636]" />
          </div>

          {/* Heading */}
          <h1 className="text-2xl font-bold text-[#17231f]">
            Check your email
          </h1>

          {/* Message */}
          <p className="mt-3 text-sm leading-6 text-[#68736c]">
            Your AiTreasurer account has been created.
          </p>

          <p className="mt-2 text-sm leading-6 text-[#68736c]">
            We sent a verification link to:
          </p>

          <p className="mt-2 break-all font-semibold text-[#173f35]">
            {/*
              React Hook Form does not expose the submitted data
              after submission through form state by default.

              If you want to display the email here, we will handle
              that separately below.
            */}
          </p>

          <p className="mt-4 text-sm leading-6 text-[#68736c]">
            Please verify your email address before logging in.
          </p>

          {/* Login */}
          <Link
            to="/login"
            className="mt-7 inline-flex w-full items-center justify-center rounded-lg bg-[#173f35] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#102e27]"
          >
            Go to Login
          </Link>

          {/* Note */}
          <p className="mt-5 text-xs leading-5 text-[#68736c]">
            The verification link is valid for 24 hours.
          </p>
        </div>
      </div>
    );
  }

  // ==================================================
  // REGISTRATION FORM
  // ==================================================

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f5f7f2] px-4 py-8">
      <div className="w-full max-w-md rounded-2xl border border-[#dce5da] bg-white p-6 shadow-xl sm:p-8">
        {/* HEADER */}
        <div className="mb-8 text-center">
          {/* Logo */}
          <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#173f35] text-lg font-bold text-white">
            AT
          </div>

          <h1 className="text-3xl font-bold text-[#17231f]">Create Account</h1>

          <p className="mt-2 text-sm text-[#68736c]">
            Start managing your business with AiTreasurer
          </p>
        </div>

        {/* SERVER ERROR */}
        {error && (
          <div className="mb-5 rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm text-[#c43d3d]">
            {error}
          </div>
        )}

        {/* FORM */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
          noValidate
        >
          {/* FULL NAME */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#17231f]">
              Full Name
            </label>

            <div className="relative">
              <User
                size={20}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#68736c]"
              />

              <input
                type="text"
                {...register("fullName")}
                placeholder="Enter your full name"
                className={`w-full rounded-lg border bg-white py-3 pl-11 pr-4 text-[#17231f] outline-none transition placeholder:text-[#9aa49d] focus:border-[#173f35] focus:ring-1 focus:ring-[#173f35] ${
                  errors.fullName ? "border-red-400" : "border-[#dce5da]"
                }`}
              />
            </div>

            {errors.fullName && (
              <p className="mt-1.5 text-xs text-red-500">
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* EMAIL */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#17231f]">
              Email Address
            </label>

            <div className="relative">
              <Mail
                size={20}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#68736c]"
              />

              <input
                type="email"
                {...register("email")}
                placeholder="Enter your email"
                className={`w-full rounded-lg border bg-white py-3 pl-11 pr-4 text-[#17231f] outline-none transition placeholder:text-[#9aa49d] focus:border-[#173f35] focus:ring-1 focus:ring-[#173f35] ${
                  errors.email ? "border-red-400" : "border-[#dce5da]"
                }`}
              />
            </div>

            {errors.email && (
              <p className="mt-1.5 text-xs text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* MOBILE NUMBER */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#17231f]">
              Mobile Number
            </label>

            <div className="relative">
              <Phone
                size={20}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#68736c]"
              />

              <input
                type="tel"
                {...register("mobileNumber")}
                placeholder="Enter your mobile number"
                className={`w-full rounded-lg border bg-white py-3 pl-11 pr-4 text-[#17231f] outline-none transition placeholder:text-[#9aa49d] focus:border-[#173f35] focus:ring-1 focus:ring-[#173f35] ${
                  errors.mobileNumber ? "border-red-400" : "border-[#dce5da]"
                }`}
              />
            </div>

            {errors.mobileNumber && (
              <p className="mt-1.5 text-xs text-red-500">
                {errors.mobileNumber.message}
              </p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#17231f]">
              Password
            </label>

            <div className="relative">
              <Lock
                size={20}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#68736c]"
              />

              <input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                placeholder="Create a password"
                className={`w-full rounded-lg border bg-white py-3 pl-11 pr-12 text-[#17231f] outline-none transition placeholder:text-[#9aa49d] focus:border-[#173f35] focus:ring-1 focus:ring-[#173f35] ${
                  errors.password ? "border-red-400" : "border-[#dce5da]"
                }`}
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#68736c] transition hover:text-[#173f35]"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {errors.password && (
              <p className="mt-1.5 text-xs text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* CONFIRM PASSWORD */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#17231f]">
              Confirm Password
            </label>

            <div className="relative">
              <Lock
                size={20}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#68736c]"
              />

              <input
                type={showPassword ? "text" : "password"}
                {...register("confirmPassword")}
                placeholder="Confirm your password"
                className={`w-full rounded-lg border bg-white py-3 pl-11 pr-4 text-[#17231f] outline-none transition placeholder:text-[#9aa49d] focus:border-[#173f35] focus:ring-1 focus:ring-[#173f35] ${
                  errors.confirmPassword ? "border-red-400" : "border-[#dce5da]"
                }`}
              />
            </div>

            {errors.confirmPassword && (
              <p className="mt-1.5 text-xs text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#173f35] py-3 font-semibold text-white transition hover:bg-[#102e27] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* LOGIN */}
        <p className="mt-6 text-center text-sm text-[#68736c]">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-[#173f35] hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
