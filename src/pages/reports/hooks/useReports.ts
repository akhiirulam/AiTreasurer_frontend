import { useCallback, useEffect, useState } from "react";

import reportsApi from "../../../services/reports.api";

import type { ReportsData } from "../types/reports.types";

const useReports = () => {
  const [report, setReport] = useState<ReportsData | null>(null);

  const [loading, setLoading] = useState<boolean>(true);

  const [error, setError] = useState<string | null>(null);

  const fetchReports = useCallback(async (from?: string, to?: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await reportsApi.getReports(from, to);

      if (!response.success) {
        throw new Error("Unable to fetch reports");
      }

      setReport(response.data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to load reports";

      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  return {
    report,
    loading,
    error,
    fetchReports,
  };
};

export default useReports;
