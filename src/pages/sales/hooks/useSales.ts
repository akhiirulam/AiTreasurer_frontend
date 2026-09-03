import { useCallback, useEffect, useState } from "react";

import { salesApi } from "../../../services/sales.api";

import type { SalesReport } from "../types/sales.types";

interface UseSalesResult {
  sales: SalesReport | null;
  loading: boolean;
  error: string | null;
  fetchSales: (from?: string, to?: string) => Promise<void>;
}

const useSales = (initialFrom?: string, initialTo?: string): UseSalesResult => {
  const [sales, setSales] = useState<SalesReport | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSales = useCallback(async (from?: string, to?: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await salesApi.getSales(from, to);

      if (!response.success) {
        throw new Error("Failed to fetch sales");
      }

      setSales(response.data);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to fetch sales";

      setError(message);
      setSales(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSales(initialFrom, initialTo);
  }, [fetchSales, initialFrom, initialTo]);

  return {
    sales,
    loading,
    error,
    fetchSales,
  };
};

export default useSales;
