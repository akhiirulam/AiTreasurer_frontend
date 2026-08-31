import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";

// =====================================================
// ACCESS TOKEN
// =====================================================

let accessToken: string | null = null;

let refreshPromise: Promise<string> | null = null;

// =====================================================
// TOKEN MANAGEMENT
// =====================================================

export const setAccessToken = (token: string | null) => {
  accessToken = token;

  console.log("ACCESS TOKEN SET:", token ? "YES" : "NO");
};

export const getAccessToken = () => {
  return accessToken;
};

export const clearAccessToken = () => {
  accessToken = null;

  console.log("ACCESS TOKEN CLEARED");
};

// =====================================================
// AXIOS INSTANCE
// =====================================================

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5500/api",

  withCredentials: true,
});

// =====================================================
// REQUEST INTERCEPTOR
// =====================================================

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    console.log("API REQUEST:", config.method?.toUpperCase(), config.url);

    console.log("HAS ACCESS TOKEN:", !!accessToken);

    /*
     * Do not attach an access token to
     * the refresh endpoint.
     */

    const isRefreshRequest = config.url?.includes("/auth/refresh");

    if (accessToken && !isRefreshRequest) {
      config.headers.Authorization = `Bearer ${accessToken}`;

      console.log("AUTHORIZATION HEADER ATTACHED");
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// =====================================================
// REFRESH ACCESS TOKEN
// =====================================================

const refreshAccessToken = async (): Promise<string> => {
  // ================================================
  // PREVENT MULTIPLE REFRESH REQUESTS
  // ================================================

  if (refreshPromise) {
    return refreshPromise;
  }

  refreshPromise = axios
    .post(
      `${
        import.meta.env.VITE_API_URL || "http://localhost:5500/api"
      }/auth/refresh`,
      {},
      {
        withCredentials: true,
      },
    )
    .then((response) => {
      const newAccessToken = response.data?.data?.accessToken;

      if (!newAccessToken) {
        throw new Error("Access token missing from refresh response");
      }

      // ============================================
      // UPDATE AXIOS TOKEN
      // ============================================

      setAccessToken(newAccessToken);

      console.log("ACCESS TOKEN REFRESHED");

      return newAccessToken;
    })
    .finally(() => {
      refreshPromise = null;
    });

  return refreshPromise;
};

// =====================================================
// RESPONSE INTERCEPTOR
// =====================================================

api.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error: AxiosError) => {
    const originalRequest = error.config as
      | (InternalAxiosRequestConfig & {
          _retry?: boolean;
        })
      | undefined;

    // ================================================
    // NO RESPONSE / REQUEST
    // ================================================

    if (!error.response || !originalRequest) {
      return Promise.reject(error);
    }

    // ================================================
    // ONLY HANDLE 401
    // ================================================

    if (error.response.status !== 401) {
      return Promise.reject(error);
    }

    // ================================================
    // DON'T RETRY TWICE
    // ================================================

    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    // ================================================
    // NEVER REFRESH REFRESH REQUEST
    // ================================================

    if (originalRequest.url?.includes("/auth/refresh")) {
      clearAccessToken();

      return Promise.reject(error);
    }

    // ================================================
    // MARK REQUEST FOR RETRY
    // ================================================

    originalRequest._retry = true;

    try {
      console.log("ACCESS TOKEN EXPIRED. REFRESHING...");

      const newAccessToken = await refreshAccessToken();

      // ============================================
      // RETRY ORIGINAL REQUEST
      // ============================================

      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      console.log("RETRYING:", originalRequest.url);

      return api(originalRequest);
    } catch (refreshError) {
      console.error("TOKEN REFRESH FAILED", refreshError);

      clearAccessToken();

      return Promise.reject(refreshError);
    }
  },
);

export default api;
