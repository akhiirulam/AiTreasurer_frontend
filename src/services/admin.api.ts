import api from "../api/axios";

import type {
  AdminDashboardResponse,
  AdminUsersResponse,
  UpdateUserStatusPayload,
  UpdateUserStatusResponse,
} from "../pages/admin/types/admin.types";

// =====================================================
// ADMIN API
// =====================================================

export const adminApi = {
  // ===================================================
  // DASHBOARD
  // ===================================================

  /**
   * Get Admin Dashboard data.
   */
  getDashboard: async (): Promise<AdminDashboardResponse> => {
    const response = await api.get<AdminDashboardResponse>("/admin/dashboard");

    return response.data;
  },

  // ===================================================
  // USERS
  // ===================================================

  /**
   * Get all platform users.
   */
  getUsers: async (): Promise<AdminUsersResponse> => {
    const response = await api.get<AdminUsersResponse>("/admin/users");

    return response.data;
  },

  // ===================================================
  // UPDATE USER STATUS
  // ===================================================

  /**
   * Activate or deactivate a user.
   */
  updateUserStatus: async (
    userId: string,
    data: UpdateUserStatusPayload,
  ): Promise<UpdateUserStatusResponse> => {
    const response = await api.patch<UpdateUserStatusResponse>(
      `/admin/users/${userId}/status`,
      data,
    );

    return response.data;
  },
};
