import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock, Mail, ArrowLeft } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";

import { loginUser } from "../../services/auth.api";
import api from "../../api/axios";

import { loginSchema, type LoginFormData } from "../../schemas/auth.schema";

import loginImage from "../../assets/login-image.webp";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const googleButtonRef = useRef<HTMLDivElement | null>(null);

  const { setAuth } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);

      const response = await loginUser(data);

      setAuth(response.data.user, response.data.accessToken);

      console.log(response);

      const role = response.data.user.role;

      if (role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/owner/dashboard");
      }
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!window.google || !googleButtonRef.current) {
      return;
    }

    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,

      callback: async (response: GoogleCredentialResponse) => {
        try {
          const result = await api.post("/auth/google", {
            credential: response.credential,
          });

          const user = result.data.data.user;
          const accessToken = result.data.data.accessToken;

          setAuth(
            {
              id: user.id,
              fullName: user.fullName,
              email: user.email,
              role: user.role,
              profileImage: user.profileImage ?? null,
            },
            accessToken,
          );

          if (user.role === "admin") {
            navigate("/admin/dashboard");
          } else {
            navigate("/owner/dashboard");
          }
        } catch (error: unknown) {
          console.error("Google login failed:", error);
        }
      },
    });

    window.google.accounts.id.renderButton(googleButtonRef.current, {
      theme: "outline",
      size: "large",
      width: 300,
    });
  }, [navigate, setAuth]);

  return (
    <div className="min-h-screen bg-[#f5f7f2] px-4 py-5 sm:px-6 lg:px-8">
      {/* Back to Home */}
      <div className="mx-auto max-w-6xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium text-[#68736c] transition hover:bg-[#e4f2de] hover:text-[#173f35]"
        >
          <ArrowLeft size={16} />
          Back to home
        </Link>
      </div>

      {/* Main */}
      <div className="mx-auto flex min-h-[calc(100vh-80px)] max-w-6xl items-center justify-center py-8">
        <div className="grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* ================= IMAGE ================= */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative">
              {/* Soft background decoration */}
              <div className="absolute inset-0 scale-90 rounded-full bg-[#e4f2de] blur-2xl" />

              <div className="relative h-56 w-56 overflow-hidden rounded-full border-8 border-white shadow-lg sm:h-72 sm:w-72 lg:h-[390px] lg:w-[390px]">
                <img
                  src={loginImage}
                  alt="AI Treasurer"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* ================= LOGIN CARD ================= */}
          <div className="w-full max-w-md mx-auto lg:mx-0">
            <div className="rounded-2xl border border-[#dce5da] bg-white p-6 shadow-sm sm:p-8">
              {/* Logo / Brand */}
              <div className="mb-7">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#173f35] shadow-sm">
                    <span className="text-lg font-bold text-white">Ai</span>
                  </div>

                  <div>
                    <h1 className="text-lg font-bold tracking-tight text-[#173f35]">
                      AiTreasurer
                    </h1>

                    <p className="text-xs text-[#68736c]">Smart accounting</p>
                  </div>
                </div>

                <h2 className="text-2xl font-bold tracking-tight text-[#17231f]">
                  Welcome back
                </h2>

                <p className="mt-2 text-sm leading-6 text-[#68736c]">
                  Sign in to manage your business finances.
                </p>
              </div>

              {/* ================= FORM ================= */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Email */}
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
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#68736c]"
                    />

                    <input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      {...register("email")}
                      className="w-full rounded-xl border border-[#dce5da] bg-[#f9fbf7] py-3 pl-11 pr-4 text-sm text-[#17231f] outline-none transition placeholder:text-[#9aa59f] focus:border-[#173f35] focus:bg-white focus:ring-2 focus:ring-[#e4f2de]"
                    />
                  </div>

                  {errors.email && (
                    <p className="mt-1.5 text-xs text-[#c43d3d]">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-[#17231f]"
                    >
                      Password
                    </label>

                    <Link
                      to="/forgot-password"
                      className="text-sm font-medium text-[#173f35] transition hover:text-[#102e27]"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <div className="relative">
                    <Lock
                      size={18}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#68736c]"
                    />

                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      {...register("password")}
                      className="w-full rounded-xl border border-[#dce5da] bg-[#f9fbf7] py-3 pl-11 pr-12 text-sm text-[#17231f] outline-none transition placeholder:text-[#9aa59f] focus:border-[#173f35] focus:bg-white focus:ring-2 focus:ring-[#e4f2de]"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#68736c] transition hover:text-[#173f35]"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>

                  {errors.password && (
                    <p className="mt-1.5 text-xs text-[#c43d3d]">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Sign In */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full rounded-xl bg-[#173f35] py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#102e27] focus:outline-none focus:ring-2 focus:ring-[#79c267] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </button>
              </form>

              {/* ================= DIVIDER ================= */}
              <div className="my-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-[#dce5da]" />

                <span className="text-xs font-medium text-[#9aa59f]">OR</span>

                <div className="h-px flex-1 bg-[#dce5da]" />
              </div>

              {/* ================= GOOGLE ================= */}
              <div className="flex w-full justify-center overflow-hidden">
                <div
                  ref={googleButtonRef}
                  className="flex min-h-[42px] w-full justify-center"
                />
              </div>

              {/* ================= REGISTER ================= */}
              <div className="mt-7 border-t border-[#edf1eb] pt-6 text-center">
                <p className="text-sm text-[#68736c]">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="font-semibold text-[#173f35] transition hover:text-[#102e27]"
                  >
                    Create account
                  </Link>
                </p>
              </div>
            </div>

            {/* Footer */}
            <p className="mt-5 text-center text-xs text-[#9aa59f]">
              Secure access to your business finances
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
