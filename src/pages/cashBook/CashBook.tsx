import { useEffect, useMemo, useState } from "react";
import {
  ArrowDownLeft,
  ArrowUpRight,
  CalendarDays,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Wallet,
  X,
} from "lucide-react";

import cashBookApi from "../../services/cashBook.api";

import type {
  CashBookAccount,
  CashBookData,
} from "../../services/cashBook.api";

const CashBook = () => {
  const [cashBook, setCashBook] = useState<CashBookData | null>(null);

  // =========================================================
  // FILTERS
  // =========================================================

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const [selectedAccountId, setSelectedAccountId] = useState("all");

  // =========================================================
  // UI STATE
  // =========================================================

  const [collapsedAccounts, setCollapsedAccounts] = useState<
    Record<string, boolean>
  >({});

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  // =========================================================
  // FETCH CASH BOOK
  // =========================================================

  const fetchCashBook = async (
    filters: {
      from?: string;
      to?: string;
    } = {},
  ) => {
    try {
      setLoading(true);
      setError(null);

      const response = await cashBookApi.getCashBook({
        from: filters.from,
        to: filters.to,
      });

      if (!response.success) {
        throw new Error(response.message || "Failed to load cash book");
      }

      setCashBook(response.data);
    } catch (err) {
      console.error(err);

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
  // CURRENCY
  // =========================================================

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // =========================================================
  // DATE
  // =========================================================

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // =========================================================
  // FILTER SUBMIT
  // =========================================================

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

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
  // RESET
  // =========================================================

  const handleReset = () => {
    setFrom("");
    setTo("");
    setSelectedAccountId("all");
    setError(null);

    fetchCashBook({});
  };

  // =========================================================
  // CLEAR ACCOUNT FILTER
  // =========================================================

  const clearAccountFilter = () => {
    setSelectedAccountId("all");
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
  // TOGGLE ACCOUNT
  // =========================================================

  const toggleAccount = (accountId: string) => {
    setCollapsedAccounts((previous) => ({
      ...previous,
      [accountId]: !previous[accountId],
    }));
  };

  // =========================================================
  // PERIOD LABEL
  // =========================================================

  const periodLabel = useMemo(() => {
    if (!cashBook) {
      return "All transactions";
    }

    const periodFrom = cashBook.period.from;
    const periodTo = cashBook.period.to;

    if (periodFrom && periodTo) {
      return `${formatDate(periodFrom)} – ${formatDate(periodTo)}`;
    }

    if (periodFrom) {
      return `From ${formatDate(periodFrom)}`;
    }

    if (periodTo) {
      return `Until ${formatDate(periodTo)}`;
    }

    return "All transactions";
  }, [cashBook]);

  // =========================================================
  // ACCOUNT CARD
  // =========================================================

  const renderAccount = (account: CashBookAccount) => {
    const accountId = account.account.id;

    const isCollapsed = collapsedAccounts[accountId] ?? false;

    return (
      <div
        key={accountId}
        className="overflow-hidden rounded-3xl border border-[#d8e69e] bg-[#faffdf] shadow-sm"
      >
        {/* =====================================================
            ACCOUNT HEADER
        ===================================================== */}

        <button
          type="button"
          onClick={() => toggleAccount(accountId)}
          className="flex w-full flex-col gap-4 border-b border-[#d8e69e] px-4 py-5 text-left transition hover:bg-[#f5fbdc] sm:flex-row sm:items-center sm:justify-between sm:px-6"
        >
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#292727] text-white">
              <Wallet size={20} />
            </div>

            <div className="min-w-0">
              <h2 className="truncate text-lg font-black sm:text-xl">
                {account.account.name}
              </h2>

              <div className="mt-1 flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-[#667697]">
                  {account.account.code}
                </span>

                <span className="text-[#9aaa70]">•</span>

                <span className="text-xs font-bold capitalize text-[#667697]">
                  {account.account.category?.replaceAll("_", " ") ||
                    account.account.type}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 sm:justify-end">
            <div className="rounded-full bg-[#292727] px-3 py-2 text-xs font-bold capitalize text-white">
              {account.account.category?.replaceAll("_", " ") ||
                account.account.type}
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#cbd99a] bg-white">
              {isCollapsed ? (
                <ChevronDown size={17} />
              ) : (
                <ChevronUp size={17} />
              )}
            </div>
          </div>
        </button>

        {/* =====================================================
            ACCOUNT CONTENT
        ===================================================== */}

        {!isCollapsed && (
          <>
            {/* ACCOUNT SUMMARY */}

            <div className="grid grid-cols-1 border-b border-[#d8e69e] sm:grid-cols-3">
              <div className="px-4 py-4 sm:px-6">
                <p className="text-xs font-bold text-[#667697]">
                  Opening Balance
                </p>

                <p className="mt-1 text-lg font-black">
                  {formatCurrency(account.openingBalance)}
                </p>
              </div>

              <div className="border-t border-[#d8e69e] px-4 py-4 sm:border-l sm:border-t-0 sm:px-6">
                <p className="text-xs font-bold text-[#667697]">Receipts</p>

                <p className="mt-1 text-lg font-black">
                  {formatCurrency(account.totalReceipts)}
                </p>
              </div>

              <div className="border-t border-[#d8e69e] px-4 py-4 sm:border-l sm:border-t-0 sm:px-6">
                <p className="text-xs font-bold text-[#667697]">Payments</p>

                <p className="mt-1 text-lg font-black">
                  {formatCurrency(account.totalPayments)}
                </p>
              </div>
            </div>

            {/* =================================================
                TRANSACTIONS
            ================================================= */}

            {account.entries.length === 0 ? (
              <div className="px-4 py-10 text-center sm:px-6">
                <p className="text-sm font-bold text-[#667697]">
                  No transactions for this period.
                </p>
              </div>
            ) : (
              <>
                {/* DESKTOP */}

                <div className="hidden overflow-x-auto lg:block">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#d8e69e] text-left">
                        <th className="px-6 py-4 text-xs font-black uppercase tracking-wide text-[#667697]">
                          Date
                        </th>

                        <th className="px-6 py-4 text-xs font-black uppercase tracking-wide text-[#667697]">
                          Description
                        </th>

                        <th className="px-6 py-4 text-right text-xs font-black uppercase tracking-wide text-[#667697]">
                          Receipt
                        </th>

                        <th className="px-6 py-4 text-right text-xs font-black uppercase tracking-wide text-[#667697]">
                          Payment
                        </th>

                        <th className="px-6 py-4 text-right text-xs font-black uppercase tracking-wide text-[#667697]">
                          Balance
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {account.entries.map((entry) => (
                        <tr
                          key={entry.journalEntryId}
                          className="border-b border-[#e1e9bd] last:border-0 hover:bg-[#f5fbdc]"
                        >
                          <td className="whitespace-nowrap px-6 py-4 text-sm font-bold">
                            {formatDate(entry.date)}
                          </td>

                          <td className="max-w-[420px] px-6 py-4">
                            <p className="truncate text-sm font-bold">
                              {entry.description}
                            </p>
                          </td>

                          <td className="px-6 py-4 text-right text-sm font-black">
                            {entry.receipt > 0
                              ? formatCurrency(entry.receipt)
                              : "—"}
                          </td>

                          <td className="px-6 py-4 text-right text-sm font-black">
                            {entry.payment > 0
                              ? formatCurrency(entry.payment)
                              : "—"}
                          </td>

                          <td
                            className={`px-6 py-4 text-right text-sm font-black ${
                              entry.balance < 0
                                ? "text-red-600"
                                : "text-[#17213d]"
                            }`}
                          >
                            {formatCurrency(entry.balance)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* MOBILE */}

                <div className="space-y-3 p-3 lg:hidden sm:p-4">
                  {account.entries.map((entry) => (
                    <div
                      key={entry.journalEntryId}
                      className="rounded-2xl border border-[#d8e69e] bg-[#f5fbdc] p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-[#667697]">
                            {formatDate(entry.date)}
                          </p>

                          <p className="mt-2 break-words text-sm font-black">
                            {entry.description}
                          </p>
                        </div>

                        <div className="shrink-0 text-right">
                          <p className="text-xs font-bold text-[#667697]">
                            Balance
                          </p>

                          <p
                            className={`mt-1 text-sm font-black ${
                              entry.balance < 0 ? "text-red-600" : ""
                            }`}
                          >
                            {formatCurrency(entry.balance)}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-3">
                        <div className="rounded-xl bg-[#eaf4bd] p-3">
                          <div className="flex items-center gap-1 text-xs font-bold text-[#667697]">
                            <ArrowDownLeft size={14} />
                            Receipt
                          </div>

                          <p className="mt-1 text-sm font-black">
                            {entry.receipt > 0
                              ? formatCurrency(entry.receipt)
                              : "—"}
                          </p>
                        </div>

                        <div className="rounded-xl bg-[#eaf4bd] p-3">
                          <div className="flex items-center gap-1 text-xs font-bold text-[#667697]">
                            <ArrowUpRight size={14} />
                            Payment
                          </div>

                          <p className="mt-1 text-sm font-black">
                            {entry.payment > 0
                              ? formatCurrency(entry.payment)
                              : "—"}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* CLOSING BALANCE */}

            <div className="flex flex-col gap-2 border-t border-[#d8e69e] bg-[#edf6c5] px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <p className="text-sm font-bold text-[#667697]">
                Closing Balance
              </p>

              <p
                className={`text-xl font-black ${
                  account.closingBalance < 0 ? "text-red-600" : ""
                }`}
              >
                {formatCurrency(account.closingBalance)}
              </p>
            </div>
          </>
        )}
      </div>
    );
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f1ffc4] px-3 py-6 text-[#17213d] sm:px-5 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="animate-pulse">
            <div className="h-10 w-48 rounded-lg bg-[#dce9a5]" />

            <div className="mt-3 h-5 w-72 rounded bg-[#dce9a5]" />

            <div className="mt-8 h-32 rounded-3xl bg-[#e7f0b9]" />

            <div className="mt-6 h-64 rounded-3xl bg-[#e7f0b9]" />
          </div>
        </div>
      </div>
    );
  }

  // =========================================================
  // ERROR
  // =========================================================

  if (error) {
    return (
      <div className="min-h-screen bg-[#f1ffc4] px-3 py-6 text-[#17213d] sm:px-5 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-3xl border border-red-200 bg-red-50 p-6">
            <h2 className="text-lg font-black text-red-700">
              Unable to load Cash Book
            </h2>

            <p className="mt-2 text-sm text-red-600">{error}</p>

            <div className="mt-4 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() =>
                  fetchCashBook({
                    from: from || undefined,
                    to: to || undefined,
                  })
                }
                className="inline-flex items-center gap-2 rounded-xl bg-[#292727] px-4 py-3 text-sm font-bold text-white"
              >
                <RefreshCw size={16} />
                Try again
              </button>

              <button
                type="button"
                onClick={() => setError(null)}
                className="inline-flex items-center gap-2 rounded-xl border border-red-300 px-4 py-3 text-sm font-bold text-red-700"
              >
                <X size={16} />
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!cashBook) {
    return null;
  }

  // =========================================================
  // MAIN UI
  // =========================================================

  return (
    <div className="min-h-screen bg-[#f1ffc4] px-3 py-5 text-[#17213d] sm:px-5 sm:py-6 md:px-10 md:py-8">
      <div className="mx-auto max-w-7xl">
        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="mb-6">
          <div className="mb-3 flex items-center gap-2 text-sm font-bold text-[#667697]">
            <Wallet size={18} />

            <span>Accounting</span>

            <span>/</span>

            <span>Cash Book</span>
          </div>

          <h1 className="text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">
            Cash Book
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#667697] sm:text-base">
            Track money received and paid through your cash and bank accounts.
          </p>
        </div>

        {/* =====================================================
            FILTERS
        ===================================================== */}

        <form
          onSubmit={handleSubmit}
          className="mb-6 rounded-3xl border border-[#d8e69e] bg-[#faffdf] p-4 shadow-sm sm:p-6"
        >
          <div className="grid gap-4 md:grid-cols-3">
            {/* ACCOUNT */}

            <div>
              <label
                htmlFor="cash-book-account"
                className="mb-2 block text-xs font-black uppercase tracking-wide text-[#667697]"
              >
                Account
              </label>

              <select
                id="cash-book-account"
                value={selectedAccountId}
                onChange={(event) => setSelectedAccountId(event.target.value)}
                className="w-full rounded-xl border border-[#cbd99a] bg-white px-4 py-3 text-sm font-semibold outline-none transition focus:border-[#292727] focus:ring-2 focus:ring-[#dce9a5]"
              >
                <option value="all">All accounts</option>

                {cashBook.accounts.map((account) => (
                  <option key={account.account.id} value={account.account.id}>
                    {account.account.name} ({account.account.code})
                  </option>
                ))}
              </select>
            </div>

            {/* FROM */}

            <div>
              <label
                htmlFor="cash-book-from"
                className="mb-2 block text-xs font-black uppercase tracking-wide text-[#667697]"
              >
                From
              </label>

              <div className="relative">
                <CalendarDays
                  size={17}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#667697]"
                />

                <input
                  id="cash-book-from"
                  type="date"
                  value={from}
                  onChange={(event) => setFrom(event.target.value)}
                  className="w-full rounded-xl border border-[#cbd99a] bg-white px-10 py-3 text-sm font-semibold outline-none transition focus:border-[#292727] focus:ring-2 focus:ring-[#dce9a5]"
                />
              </div>
            </div>

            {/* TO */}

            <div>
              <label
                htmlFor="cash-book-to"
                className="mb-2 block text-xs font-black uppercase tracking-wide text-[#667697]"
              >
                To
              </label>

              <div className="relative">
                <CalendarDays
                  size={17}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#667697]"
                />

                <input
                  id="cash-book-to"
                  type="date"
                  value={to}
                  min={from || undefined}
                  onChange={(event) => setTo(event.target.value)}
                  className="w-full rounded-xl border border-[#cbd99a] bg-white px-10 py-3 text-sm font-semibold outline-none transition focus:border-[#292727] focus:ring-2 focus:ring-[#dce9a5]"
                />
              </div>
            </div>
          </div>

          {/* BUTTONS */}

          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#292727] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#181818] disabled:opacity-60 sm:w-auto"
            >
              <CalendarDays size={16} />
              Apply Filter
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#292727] bg-transparent px-5 py-3 text-sm font-bold text-[#292727] transition hover:bg-[#292727] hover:text-white sm:w-auto"
            >
              <RefreshCw size={16} />
              Reset
            </button>
          </div>
        </form>

        {/* =====================================================
            ACTIVE FILTER
        ===================================================== */}

        {selectedAccountId !== "all" && (
          <div className="mb-5 flex items-center justify-between rounded-2xl border border-[#d8e69e] bg-[#faffdf] px-4 py-3">
            <div className="text-sm font-bold text-[#667697]">
              Showing:
              <span className="ml-2 text-[#17213d]">
                {
                  cashBook.accounts.find(
                    (account) => account.account.id === selectedAccountId,
                  )?.account.name
                }
              </span>
            </div>

            <button
              type="button"
              onClick={clearAccountFilter}
              className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-xs font-bold text-[#667697] transition hover:bg-[#eaf4bd] hover:text-[#17213d]"
            >
              <X size={14} />
              Clear
            </button>
          </div>
        )}

        {/* =====================================================
            SUMMARY
        ===================================================== */}

        <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-[#d8e69e] bg-[#faffdf] p-4">
            <p className="text-xs font-bold text-[#667697]">Opening Balance</p>

            <p className="mt-2 text-xl font-black">
              {formatCurrency(visibleSummary.opening)}
            </p>
          </div>

          <div className="rounded-2xl border border-[#d8e69e] bg-[#faffdf] p-4">
            <p className="text-xs font-bold text-[#667697]">Total Receipts</p>

            <p className="mt-2 text-xl font-black">
              {formatCurrency(visibleSummary.receipts)}
            </p>
          </div>

          <div className="rounded-2xl border border-[#d8e69e] bg-[#faffdf] p-4">
            <p className="text-xs font-bold text-[#667697]">Total Payments</p>

            <p className="mt-2 text-xl font-black">
              {formatCurrency(visibleSummary.payments)}
            </p>
          </div>

          <div className="rounded-2xl bg-[#292727] p-4 text-white">
            <p className="text-xs font-bold text-[#cbd99a]">Closing Balance</p>

            <p className="mt-2 text-xl font-black">
              {formatCurrency(visibleSummary.closing)}
            </p>
          </div>
        </div>

        {/* =====================================================
            PERIOD / COUNTS
        ===================================================== */}

        <div className="mb-5 flex flex-col gap-2 text-sm text-[#667697] sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-4">
            <p className="font-semibold">
              {visibleAccounts.length} account
              {visibleAccounts.length !== 1 ? "s" : ""}
            </p>

            <p className="font-semibold">
              {transactionCount} transaction
              {transactionCount !== 1 ? "s" : ""}
            </p>
          </div>

          <p className="font-semibold">{periodLabel}</p>
        </div>

        {/* =====================================================
            ACCOUNTS
        ===================================================== */}

        {visibleAccounts.length === 0 ? (
          <div className="rounded-3xl border border-[#d8e69e] bg-[#faffdf] px-5 py-16 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#292727] text-white">
              <Wallet size={24} />
            </div>

            <h2 className="mt-5 text-xl font-black">No Cash Book Accounts</h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#667697]">
              No cash or bank accounts match your current filters.
            </p>

            <button
              type="button"
              onClick={handleReset}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#292727] px-5 py-3 text-sm font-bold text-white"
            >
              <RefreshCw size={16} />
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-5">{visibleAccounts.map(renderAccount)}</div>
        )}
      </div>
    </div>
  );
};

export default CashBook;
