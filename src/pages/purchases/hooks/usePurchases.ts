import { useCallback, useEffect, useState } from "react";

import { purchasesApi } from "../../../services/purchases.api";

import type { PurchasesReport } from "../types/purchases.types";

interface UsePurchasesResult {
  purchases: PurchasesReport | null;
  loading: boolean;
  error: string | null;
  fetchPurchases: (from?: string, to?: string) => Promise<void>;
}

const usePurchases = (
  initialFrom?: string,
  initialTo?: string,
): UsePurchasesResult => {
  const [purchases, setPurchases] = useState<PurchasesReport | null>(null);

  const [loading, setLoading] = useState<boolean>(true);

  const [error, setError] = useState<string | null>(null);

  const fetchPurchases = useCallback(async (from?: string, to?: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await purchasesApi.getPurchases(from, to);

      if (!response.success) {
        throw new Error("Failed to fetch purchases");
      }

      setPurchases(response.data);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to fetch purchases";

      setError(message);
      setPurchases(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPurchases(initialFrom, initialTo);
  }, [fetchPurchases, initialFrom, initialTo]);

  return {
    purchases,
    loading,
    error,
    fetchPurchases,
  };
};

export default usePurchases;
