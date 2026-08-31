import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../api/axios";
import { useAuth } from "../../hooks/useAuth";

const GoogleLogin = () => {
  const googleButtonRef = useRef<HTMLDivElement | null>(null);

  const navigate = useNavigate();

  const { setAuth } = useAuth();

  useEffect(() => {
    if (!window.google || !googleButtonRef.current) {
      return;
    }

    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,

      callback: async (response: GoogleCredentialResponse) => {
        try {
          // ==================================================
          // GOOGLE LOGIN
          // ==================================================

          const result = await api.post("/auth/google", {
            credential: response.credential,
          });

          console.log("Google login successful:", result.data);

          // ==================================================
          // GET USER + ACCESS TOKEN
          // ==================================================

          const user = result.data.data.user;

          const accessToken = result.data.data.accessToken;

          // ==================================================
          // STORE AUTHENTICATION
          // ==================================================
          //
          // This updates:
          //
          // 1. AuthContext user
          // 2. AuthContext accessToken
          // 3. Axios accessToken
          //
          // ==================================================

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

          console.log("Authenticated Google user ID:", user.id);

          // ==================================================
          // NAVIGATION
          // ==================================================

          if (user.role === "admin") {
            navigate("/admin/dashboard");
          } else {
            navigate("/owner/dashboard");
          }
        } catch (error: unknown) {
          // ==================================================
          // ERROR HANDLING
          // ==================================================

          if (error instanceof Error) {
            console.error("Google login failed:", error.message);
          } else {
            console.error("Google login failed:", error);
          }
        }
      },
    });

    // ==================================================
    // RENDER GOOGLE BUTTON
    // ==================================================

    window.google.accounts.id.renderButton(googleButtonRef.current, {
      theme: "outline",
      size: "large",
      width: 300,
    });
  }, [navigate, setAuth]);

  return <div ref={googleButtonRef}></div>;
};

export default GoogleLogin;
