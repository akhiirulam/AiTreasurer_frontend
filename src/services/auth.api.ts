import api from "../api/axios";

// ==========================================
// LOGIN
// ==========================================

interface LoginData {
  email: string;
  password: string;
}

export const loginUser = async (data: LoginData) => {
  const response = await api.post("/auth/login", data);

  return response.data;
};

// ==========================================
// REGISTER
// ==========================================

interface RegisterData {
  fullName: string;
  email: string;
  mobileNumber: string;
  password: string;
  role?: "owner" | "accountant" | "staff" | "viewer" | "admin";
}

export const registerUser = async (data: RegisterData) => {
  const response = await api.post("/auth/register", {
    ...data,
    role: data.role ?? "owner",
  });

  return response.data;
};

// ==========================================
// LOGOUT
// ==========================================

export const logout = async () => {
  const response = await api.post("/auth/logout");

  return response.data;
};

// ==========================================
// AUTH API
// ==========================================

export const authApi = {
  loginUser,
  registerUser,
  logout,
};
