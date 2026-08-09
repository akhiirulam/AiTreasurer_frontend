import { createContext, useState, type ReactNode } from "react";

interface User {
  id: string;
  fullName: string;
  email: string;
  role: string;
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

  const [accessToken, setAccessToken] = useState<string | null>(null);

  const setAuth = (user: User, accessToken: string) => {
    setUser(user);
    setAccessToken(accessToken);
  };

  console.log("user: ", user);

  const clearAuth = () => {
    setUser(null);
    setAccessToken(null);
  };

  const isAuthenticated = user !== null && accessToken !== null;

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        isAuthenticated,
        isLoading: false,
        setAuth,
        clearAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
