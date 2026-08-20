import { useEffect, useMemo, useState } from "react";

import cashBookApi from "../../../services/cashBook.api";

import type {
  CashBookAccount,
  CashBookData,
  CashBookFilters,
} from "../types/cashBook.types";

interface UseCashBookReturn {
  cashBook: CashBookData | null;

  loading: boolean;

  error: string | null;

  from: string;

  to: string;

  selectedAccountId: string;

  setFrom: (value: string) => void;

  setTo: (value: string) => void;

  setSelectedAccountId: (value: string) => void;

  applyFilters: () => void;

  resetFilters: () => void;

  retry: () => void;

  visibleAccounts: CashBookAccount[];

  visibleSummary: {
    opening: number;
    receipts: number;
    payments: number;
    closing: number;
  };

  transactionCount: number;
}

/**
 * Cash Book page state and business logic.
 *
 * Responsible for:
 * - Loading Cash Book data
 * - Date filters
 * - Account filtering
 * - Summary calculations
 * - Loading/error state
 */
const useCashBook = (): UseCashBookReturn => {
  // =========================================================
  // DATA
  // =========================================================

  const [cashBook, setCashBook] = useState<CashBookData | null>(null);

  // =========================================================
  // FILTER STATE
  // =========================================================

  const [from, setFrom] = useState("");

  const [to, setTo] = useState("");

  const [selectedAccountId, setSelectedAccountId] = useState("all");

  // =========================================================
  // REQUEST STATE
  // =========================================================

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  // =========================================================
  // FETCH CASH BOOK
  // =========================================================

  const fetchCashBook = async (filters: CashBookFilters = {}) => {
    try {
      setLoading(true);
      setError(null);

      const response = await cashBookApi.getCashBook(filters);

      if (!response.success) {
        throw new Error(response.message || "Failed to load cash book");
      }

      setCashBook(response.data);
    } catch (err) {
      console.error("Cash Book error:", err);

      setError(err instanceof Error ? err.message : "Failed to load cash book");
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // INITIAL LOAD
  // =========================================================

  useEffect(() => {
    fetchCashBook();
  }, []);

  // =========================================================
  // APPLY FILTERS
  // =========================================================

  const applyFilters = () => {
    // -----------------------------------------
    // Validate date range
    // -----------------------------------------

    if (from && to && from > to) {
      setError("The From date cannot be after the To date.");
      return;
    }

    fetchCashBook({
      from: from || undefined,
      to: to || undefined,
    });
  };

  // =========================================================
  // RESET FILTERS
  // =========================================================

  const resetFilters = () => {
    setFrom("");

    setTo("");

    setSelectedAccountId("all");

    setError(null);

    fetchCashBook();
  };

  // =========================================================
  // RETRY
  // =========================================================

  const retry = () => {
    fetchCashBook({
      from: from || undefined,
      to: to || undefined,
    });
  };

  // =========================================================
  // VISIBLE ACCOUNTS
  // =========================================================

  const visibleAccounts = useMemo(() => {
    if (!cashBook) {
      return [];
    }

    if (selectedAccountId === "all") {
      return cashBook.accounts;
    }

    return cashBook.accounts.filter(
      (account) => account.account.id === selectedAccountId,
    );
  }, [cashBook, selectedAccountId]);

  // =========================================================
  // VISIBLE SUMMARY
  // =========================================================

  const visibleSummary = useMemo(() => {
    return visibleAccounts.reduce(
      (summary, account) => {
        summary.opening += account.openingBalance;

        summary.receipts += account.totalReceipts;

        summary.payments += account.totalPayments;

        summary.closing += account.closingBalance;

        return summary;
      },
      {
        opening: 0,
        receipts: 0,
        payments: 0,
        closing: 0,
      },
    );
  }, [visibleAccounts]);

  // =========================================================
  // TRANSACTION COUNT
  // =========================================================

  const transactionCount = useMemo(() => {
    return visibleAccounts.reduce(
      (total, account) => total + account.entries.length,
      0,
    );
  }, [visibleAccounts]);

  // =========================================================
  // RETURN
  // =========================================================

  return {
    cashBook,

    loading,

    error,

    from,

    to,

    selectedAccountId,

    setFrom,

    setTo,

    setSelectedAccountId,

    applyFilters,

    resetFilters,

    retry,

    visibleAccounts,

    visibleSummary,

    transactionCount,
  };
};

export default useCashBook;
