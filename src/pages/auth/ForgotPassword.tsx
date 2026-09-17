import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Mail } from "lucide-react";
import api from "../../api/axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const normalizedEmail = email.trim();

    if (!normalizedEmail) {
      setError("Please enter your email address.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/auth/forgot-password", {
        email: normalizedEmail,
      });

      setSuccess(
        response.data?.message ||
          "If an account exists for this email, a password reset link has been sent.",
      );
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          "Unable to process your request. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7f2] px-4 py-8 sm:px-6">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-md items-center justify-center">
        <div className="w-full">
          {/* Logo */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#173f35] text-xl font-bold text-white shadow-sm">
              Ai
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-[#173f35]">
              AiTreasurer
            </h1>

            <p className="mt-1 text-sm text-[#68736c]">
              Smart accounting for your business
            </p>
          </div>

          {/* Card */}
          <div className="rounded-2xl border border-[#dce5da] bg-white p-6 shadow-sm sm:p-8">
            {/* Header */}
            <div className="mb-6">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-[#e4f2de] text-[#173f35]">
                <Mail size={20} />
              </div>

              <h2 className="text-xl font-semibold text-[#17231f]">
                Forgot your password?
              </h2>

              <p className="mt-1 text-sm leading-6 text-[#68736c]">
                Enter your email address and we&apos;ll send you a password
                reset link.
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-5 rounded-lg border border-[#f0caca] bg-[#fff5f5] px-4 py-3 text-sm text-[#c43d3d]">
                {error}
              </div>
            )}

            {/* Success */}
            {success && (
              <div className="mb-5 flex items-start gap-3 rounded-lg border border-[#cfe5c7] bg-[#e4f2de] px-4 py-3 text-sm text-[#238636]">
                <CheckCircle2 size={18} className="mt-0.5 shrink-0" />

                <div>
                  <p className="leading-5">{success}</p>

                  <p className="mt-2 text-xs text-[#68736c]">
                    Please check your inbox and spam folder.
                  </p>
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-[#17231f]"
                >
                  Email address
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#68736c]"
                  />

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    autoComplete="email"
                    disabled={loading}
                    className="w-full rounded-lg border border-[#dce5da] bg-[#f9fbf7] py-3 pl-10 pr-4 text-sm text-[#17231f] outline-none transition placeholder:text-[#9aa59f] focus:border-[#79c267] focus:ring-2 focus:ring-[#e4f2de] disabled:cursor-not-allowed disabled:opacity-60"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-[#173f35] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#102e27] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Sending reset link..." : "Send reset link"}
              </button>
            </form>

            {/* Back to login */}
            <div className="mt-6 text-center">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 text-sm font-medium text-[#173f35] transition hover:text-[#102e27]"
              >
                <ArrowLeft size={16} />
                Back to login
              </Link>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-[#9aa59f]">
            © AiTreasurer
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
