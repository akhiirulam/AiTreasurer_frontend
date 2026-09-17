import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Eye, EyeOff, Lock, CheckCircle2 } from "lucide-react";
import api from "../../api/axios";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!token) {
      setError("This password reset link is invalid.");
      return;
    }

    if (!newPassword) {
      setError("Please enter a new password.");
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/auth/reset-password", {
        token,
        newPassword,
      });

      setSuccess(response.data?.message || "Password reset successfully.");

      setNewPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        "Unable to reset your password. The link may have expired.";

      setError(message);
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
            <div className="mb-6">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-[#e4f2de] text-[#173f35]">
                <Lock size={20} />
              </div>

              <h2 className="text-xl font-semibold text-[#17231f]">
                Reset your password
              </h2>

              <p className="mt-1 text-sm leading-6 text-[#68736c]">
                Create a new password for your AiTreasurer account.
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
                  <p>{success}</p>

                  <p className="mt-1 text-xs text-[#68736c]">
                    Redirecting you to login...
                  </p>
                </div>
              </div>
            )}

            {!token ? (
              <div className="rounded-lg border border-[#f0caca] bg-[#fff5f5] p-4 text-sm text-[#c43d3d]">
                This password reset link is invalid or missing a reset token.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* New password */}
                <div>
                  <label
                    htmlFor="newPassword"
                    className="mb-2 block text-sm font-medium text-[#17231f]"
                  >
                    New password
                  </label>

                  <div className="relative">
                    <Lock
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-[#68736c]"
                    />

                    <input
                      id="newPassword"
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                      disabled={loading}
                      className="w-full rounded-lg border border-[#dce5da] bg-[#f9fbf7] py-3 pl-10 pr-11 text-sm text-[#17231f] outline-none transition placeholder:text-[#9aa59f] focus:border-[#79c267] focus:ring-2 focus:ring-[#e4f2de] disabled:cursor-not-allowed disabled:opacity-60"
                    />

                    <button
                      type="button"
                      onClick={() => setShowNewPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#68736c] transition hover:text-[#173f35]"
                      aria-label={
                        showNewPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showNewPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>

                  <p className="mt-2 text-xs text-[#68736c]">
                    Minimum 8 characters.
                  </p>
                </div>

                {/* Confirm password */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="mb-2 block text-sm font-medium text-[#17231f]"
                  >
                    Confirm password
                  </label>

                  <div className="relative">
                    <Lock
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-[#68736c]"
                    />

                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm your new password"
                      disabled={loading}
                      className="w-full rounded-lg border border-[#dce5da] bg-[#f9fbf7] py-3 pl-10 pr-11 text-sm text-[#17231f] outline-none transition placeholder:text-[#9aa59f] focus:border-[#79c267] focus:ring-2 focus:ring-[#e4f2de] disabled:cursor-not-allowed disabled:opacity-60"
                    />

                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#68736c] transition hover:text-[#173f35]"
                      aria-label={
                        showConfirmPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center rounded-lg bg-[#173f35] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#102e27] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Resetting password..." : "Reset password"}
                </button>
              </form>
            )}

            {/* Back to login */}
            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="text-sm font-medium text-[#173f35] transition hover:text-[#102e27]"
              >
                Back to login
              </button>
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

export default ResetPassword;
