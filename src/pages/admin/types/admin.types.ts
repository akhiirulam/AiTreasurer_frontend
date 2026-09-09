// =====================================================
// ADMIN STATISTICS
// =====================================================

export interface AdminStatistics {
  totalUsers: number;

  activeUsers: number;

  inactiveUsers: number;
}

// =====================================================
// ADMIN USER
// =====================================================

export interface AdminUser {
  id: string;

  fullName: string;

  email: string;

  mobileNumber?: string | null;

  role: string;

  accountStatus: "active" | "inactive";

  profileImage: string | null;

  createdAt: string;
}

// =====================================================
// ADMIN DASHBOARD
// =====================================================

export interface AdminDashboardData {
  statistics: AdminStatistics;

  recentUsers: AdminUser[];
}

export interface AdminDashboardResponse {
  success: boolean;

  message: string;

  data: AdminDashboardData;
}

// =====================================================
// ADMIN USERS RESPONSE
// =====================================================

export interface AdminUsersResponse {
  success: boolean;

  message: string;

  data: AdminUser[];
}

// =====================================================
// UPDATE USER STATUS
// =====================================================

export interface UpdateUserStatusPayload {
  accountStatus: "active" | "inactive";
}

export interface UpdateUserStatusResponse {
  success: boolean;

  message: string;

  data: AdminUser;
}
