import { useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GoogleLogin = () => {
  const googleButtonRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!window.google || !googleButtonRef.current) {
      return;
    }

    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,

      callback: async (response: GoogleCredentialResponse) => {
        try {
          const result = await axios.post(
            "http://localhost:5500/api/auth/google",
            {
              credential: response.credential,
            },
            {
              withCredentials: true,
            },
          );

          console.log("Google login successful:", result.data);
          const accessToken = result.data.data.accessToken;
          localStorage.setItem("accessToken", accessToken);

          navigate("/dashboard");
        } catch (error: unknown) {
          if (axios.isAxiosError(error)) {
            console.error(
              "Google login failed:",
              error.response?.data || error.message,
            );
          } else {
            console.error("Google login failed:", error);
          }
        }
      },
    });

    window.google.accounts.id.renderButton(googleButtonRef.current, {
      theme: "outline",
      size: "large",
      width: 300,
    });
  }, [navigate]);

  return <div ref={googleButtonRef}></div>;
};

export default GoogleLogin;
