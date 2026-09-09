import { useCallback, useEffect, useState } from "react";

import { adminApi } from "../../../services/admin.api";

import type { AdminUser, UpdateUserStatusPayload } from "../types/admin.types";

const useUsers = () => {
  // =====================================================
  // STATE
  // =====================================================

  const [users, setUsers] = useState<AdminUser[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  // =====================================================
  // FETCH USERS
  // =====================================================

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);

      setError(null);

      const response = await adminApi.getUsers();

      setUsers(response.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);

      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  }, []);

  // =====================================================
  // UPDATE USER STATUS
  // =====================================================

  const updateUserStatus = async (
    userId: string,
    accountStatus: UpdateUserStatusPayload["accountStatus"],
  ) => {
    try {
      const response = await adminApi.updateUserStatus(userId, {
        accountStatus,
      });

      // Update local state

      setUsers((previousUsers) =>
        previousUsers.map((user) =>
          user.id === userId ? response.data : user,
        ),
      );

      return response.data;
    } catch (error) {
      console.error("Failed to update user status:", error);

      throw error;
    }
  };

  // =====================================================
  // LOAD ON MOUNT
  // =====================================================

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // =====================================================
  // RETURN
  // =====================================================

  return {
    users,
    loading,
    error,
    refetch: fetchUsers,
    updateUserStatus,
  };
};

export default useUsers;
