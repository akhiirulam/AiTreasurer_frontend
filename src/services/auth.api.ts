import api from "../api/axios";

interface LoginData {
  email: string;
  password: string;
}

export const loginUser = async (data: LoginData) => {
  const response = await api.post("/auth/login", data);

  return response.data;
};

export const logout = async () => {
  const response = await api.post("/auth/logout");

  return response.data;
};

export const authApi = {
  logout,
};
