import { createContext, useEffect, useState, type ReactNode } from "react";

import api, { setAccessToken, clearAccessToken } from "../api/axios";

interface User {
  id: string;
  fullName: string;
  email: string;
  role: string;
  profileImage?: string | null;
}

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  setAuth: (user: User, accessToken: string) => void;

  clearAuth: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const [accessToken, setToken] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  // =====================================================
  // SET AUTH
  // =====================================================

  const setAuth = (user: User, token: string) => {
    setUser(user);
    setToken(token);

    // Keep Axios synchronized
    setAccessToken(token);
  };

  // =====================================================
  // CLEAR AUTH
  // =====================================================

  const clearAuth = () => {
    setUser(null);
    setToken(null);

    // Remove token from Axios memory
    clearAccessToken();
  };

  // =====================================================
  // RESTORE AUTHENTICATION
  // =====================================================

  useEffect(() => {
    const restoreAuthentication = async () => {
      try {
        const response = await api.post("/auth/refresh");

        const data = response.data?.data;

        if (!data?.user || !data?.accessToken) {
          throw new Error("Invalid refresh response");
        }

        // Use the same authentication
        // mechanism as normal login.
        setAuth(data.user, data.accessToken);
      } catch (error) {
        console.log("No active authentication session");

        clearAuth();
      } finally {
        setIsLoading(false);
      }
    };

    restoreAuthentication();
  }, []);

  // =====================================================
  // AUTHENTICATED STATE
  // =====================================================

  const isAuthenticated = user !== null && accessToken !== null;

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        isAuthenticated,
        isLoading,
        setAuth,
        clearAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
