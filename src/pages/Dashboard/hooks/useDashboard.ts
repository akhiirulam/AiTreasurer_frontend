import { useCallback, useEffect, useState } from "react";

import dashboardApi from "../../../services/dashboard.api";

import type { DashboardData } from "../../../services/dashboard.api";

const useDashboard = () => {
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);

  const [loading, setLoading] = useState<boolean>(true);

  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = useCallback(async (from?: string, to?: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await dashboardApi.getDashboard(from, to);

      if (!response.success) {
        throw new Error("Unable to fetch dashboard");
      }

      setDashboard(response.data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to load dashboard";

      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return {
    dashboard,
    loading,
    error,
    fetchDashboard,
  };
};

export default useDashboard;
