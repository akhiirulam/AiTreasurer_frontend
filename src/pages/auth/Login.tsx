import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
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
    <div className="min-h-screen w-full bg-[#f5ffc2] p-3 font-mono">
      {/* Outer Frame */}
      <div className="min-h-[calc(100vh-24px)] bg-[#f5ffc2] flex items-center justify-center">
        <div className="w-full max-w-6xl px-6 md:px-12">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
            {/* ================= IMAGE ================= */}
            <div className="flex items-center justify-center md:-translate-x-8 lg:-translate-x-12">
              <div className="relative h-[320px] w-[320px] overflow-hidden rounded-full md:h-[390px] md:w-[390px]">
                <img
                  src={loginImage}
                  alt="AI Treasurer"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            {/* ================= LOGIN ================= */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8">
              {/* Heading */}
              <div className="mb-7">
                <h2 className="text-2xl font-semibold text-slate-900">
                  AiTreasurer
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Sign in to manage your business finances.
                </p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Email
                  </label>

                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      {...register("email")}
                      className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                    />
                  </div>

                  {errors.email && (
                    <p className="mt-1.5 text-xs text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Password
                  </label>

                  <div className="relative">
                    <Lock
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      {...register("password")}
                      className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-11 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>

                  {errors.password && (
                    <p className="mt-1.5 text-xs text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full rounded-lg bg-emerald-600 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </button>
              </form>

              {/* Divider */}
              <div className="flex items-center gap-3 my-6">
                <div className="h-px flex-1 bg-slate-200" />

                <span className="text-xs text-slate-400">OR</span>

                <div className="h-px flex-1 bg-slate-200" />
              </div>

              {/* Google Login */}
              <div
                className="w-full flex items-center justify-center gap-3 rounded-lg border border-slate-300 bg-white py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                ref={googleButtonRef}
              />
              {/* Register */}
              <p className="mt-7 text-center text-sm text-slate-500">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-medium text-emerald-600 hover:text-emerald-700"
                >
                  Create account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
