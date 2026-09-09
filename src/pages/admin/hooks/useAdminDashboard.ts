import { useEffect, useState } from "react";

import { adminApi } from "../../../services/admin.api";

import type { AdminDashboardData } from "../types/admin.types";

const useAdminDashboard = () => {
  // =====================================================
  // STATE
  // =====================================================

  const [data, setData] = useState<AdminDashboardData | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  // =====================================================
  // FETCH DASHBOARD
  // =====================================================

  const fetchDashboard = async () => {
    try {
      setLoading(true);

      setError(null);

      const response = await adminApi.getDashboard();

      setData(response.data);
    } catch (error) {
      console.error("Failed to fetch admin dashboard:", error);

      setError("Failed to load admin dashboard");
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // LOAD ON MOUNT
  // =====================================================

  useEffect(() => {
    fetchDashboard();
  }, []);

  // =====================================================
  // RETURN
  // =====================================================

  return {
    data,
    loading,
    error,
    refetch: fetchDashboard,
  };
};

export default useAdminDashboard;
