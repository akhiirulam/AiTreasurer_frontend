import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle2, Loader2, MailX } from "lucide-react";

import api from "../../api/axios";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();

  const [status, setStatus] = useState<"verifying" | "success" | "error">(
    "verifying",
  );

  const [message, setMessage] = useState("Verifying your email address...");

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setStatus("error");
      setMessage("Verification token is missing.");
      return;
    }

    const verifyEmail = async () => {
      try {
        const response = await api.post("/auth/verify-email", {
          token,
        });

        setStatus("success");
        setMessage(
          response.data?.message ||
            "Your email has been verified successfully.",
        );
      } catch (error: any) {
        setStatus("error");

        setMessage(
          error?.response?.data?.message ||
            "This verification link is invalid or has expired.",
        );
      }
    };

    verifyEmail();
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-[#f5f7f2] px-4 py-10">
      <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center">
        <div className="w-full max-w-md rounded-2xl border border-[#dce5da] bg-white p-8 text-center shadow-sm sm:p-10">
          {/* Logo */}
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-[#173f35] text-xl font-bold text-white">
            AT
          </div>

          {/* Verifying */}
          {status === "verifying" && (
            <>
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#e4f2de]">
                <Loader2 size={28} className="animate-spin text-[#173f35]" />
              </div>

              <h1 className="text-2xl font-semibold text-[#17231f]">
                Verifying your email
              </h1>

              <p className="mt-3 text-sm leading-6 text-[#68736c]">
                Please wait while we verify your email address.
              </p>
            </>
          )}

          {/* Success */}
          {status === "success" && (
            <>
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#e4f2de]">
                <CheckCircle2 size={30} className="text-[#238636]" />
              </div>

              <h1 className="text-2xl font-semibold text-[#17231f]">
                Email verified
              </h1>

              <p className="mt-3 text-sm leading-6 text-[#68736c]">{message}</p>

              <Link
                to="/login"
                className="mt-7 inline-flex w-full items-center justify-center rounded-lg bg-[#173f35] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#102e27]"
              >
                Continue to Login
              </Link>
            </>
          )}

          {/* Error */}
          {status === "error" && (
            <>
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
                <MailX size={30} className="text-[#c43d3d]" />
              </div>

              <h1 className="text-2xl font-semibold text-[#17231f]">
                Verification failed
              </h1>

              <p className="mt-3 text-sm leading-6 text-[#68736c]">{message}</p>

              <div className="mt-7 flex flex-col gap-3">
                <Link
                  to="/login"
                  className="inline-flex w-full items-center justify-center rounded-lg bg-[#173f35] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#102e27]"
                >
                  Go to Login
                </Link>

                <Link
                  to="/forgot-password"
                  className="inline-flex w-full items-center justify-center rounded-lg border border-[#dce5da] bg-[#f9fbf7] px-5 py-3 text-sm font-semibold text-[#173f35] transition hover:bg-[#e4f2de]"
                >
                  Back to Account Recovery
                </Link>
              </div>
            </>
          )}

          <p className="mt-8 text-xs text-[#68736c]">
            AiTreasurer · Secure Accounting
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
