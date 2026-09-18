import { useState, type ChangeEvent, type FormEvent } from "react";
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

import { authApi } from "../../services/auth.api";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      await authApi.registerUser({
        fullName: formData.fullName,
        email: formData.email,
        mobileNumber: formData.mobileNumber,
        password: formData.password,
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
            {formData.email}
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

        {/* ERROR */}

        {error && (
          <div className="mb-5 rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm text-[#c43d3d]">
            {error}
          </div>
        )}

        {/* FORM */}

        <form onSubmit={handleSubmit} className="space-y-5">
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
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
                className="w-full rounded-lg border border-[#dce5da] bg-white py-3 pl-11 pr-4 text-[#17231f] outline-none transition placeholder:text-[#9aa49d] focus:border-[#173f35] focus:ring-1 focus:ring-[#173f35]"
              />
            </div>
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
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="w-full rounded-lg border border-[#dce5da] bg-white py-3 pl-11 pr-4 text-[#17231f] outline-none transition placeholder:text-[#9aa49d] focus:border-[#173f35] focus:ring-1 focus:ring-[#173f35]"
              />
            </div>
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
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                placeholder="Enter your mobile number"
                required
                className="w-full rounded-lg border border-[#dce5da] bg-white py-3 pl-11 pr-4 text-[#17231f] outline-none transition placeholder:text-[#9aa49d] focus:border-[#173f35] focus:ring-1 focus:ring-[#173f35]"
              />
            </div>
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
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                required
                className="w-full rounded-lg border border-[#dce5da] bg-white py-3 pl-11 pr-12 text-[#17231f] outline-none transition placeholder:text-[#9aa49d] focus:border-[#173f35] focus:ring-1 focus:ring-[#173f35]"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#68736c] transition hover:text-[#173f35]"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
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
