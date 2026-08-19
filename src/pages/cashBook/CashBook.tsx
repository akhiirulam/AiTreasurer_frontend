import { useEffect, useState } from "react";
import {
  ArrowDownLeft,
  ArrowUpRight,
  CalendarDays,
  RefreshCw,
  Wallet,
} from "lucide-react";

import cashBookApi from "../../services/cashBook.api";
import type {
  CashBookAccount,
  CashBookData,
} from "../../services/cashBook.api";

const CashBook = () => {
  const [cashBook, setCashBook] = useState<CashBookData | null>(null);

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  // ==========================================
  // FETCH CASH BOOK
  // ==========================================

  const fetchCashBook = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await cashBookApi.getCashBook({
        from: from || undefined,
        to: to || undefined,
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

  // ==========================================
  // INITIAL LOAD
  // ==========================================

  useEffect(() => {
    fetchCashBook();
  }, []);

  // ==========================================
  // FORMAT CURRENCY
  // ==========================================

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // ==========================================
  // FORMAT DATE
  // ==========================================

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // ==========================================
  // APPLY FILTER
  // ==========================================

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    fetchCashBook();
  };

  // ==========================================
  // RESET FILTER
  // ==========================================

  const handleReset = () => {
    setFrom("");
    setTo("");

    setTimeout(() => {
      fetchCashBook();
    }, 0);
  };

  // ==========================================
  // LOADING
  // ==========================================

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

  // ==========================================
  // ERROR
  // ==========================================

  if (error) {
    return (
      <div className="min-h-screen bg-[#f1ffc4] px-3 py-6 text-[#17213d] sm:px-5 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-3xl border border-red-200 bg-red-50 p-6">
            <h2 className="text-lg font-black text-red-700">
              Unable to load Cash Book
            </h2>

            <p className="mt-2 text-sm text-red-600">{error}</p>

            <button
              type="button"
              onClick={fetchCashBook}
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#292727] px-4 py-3 text-sm font-bold text-white"
            >
              <RefreshCw size={16} />
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!cashBook) {
    return null;
  }

  // ==========================================
  // ACCOUNT CARD
  // ==========================================

  const renderAccount = (account: CashBookAccount) => {
    return (
      <div
        key={account.account.id}
        className="overflow-hidden rounded-3xl border border-[#d8e69e] bg-[#faffdf] shadow-sm"
      >
        {/* Account Header */}

        <div className="flex flex-col gap-4 border-b border-[#d8e69e] px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#292727] text-white">
              <Wallet size={20} />
            </div>

            <div className="min-w-0">
              <h2 className="truncate text-lg font-black sm:text-xl">
                {account.account.name}
              </h2>

              <p className="mt-1 text-xs font-bold text-[#667697]">
                {account.account.code}
              </p>
            </div>
          </div>

          <div className="w-fit rounded-full bg-[#292727] px-3 py-2 text-xs font-bold text-white">
            {account.account.category?.replaceAll("_", " ") ||
              account.account.type}
          </div>
        </div>

        {/* Opening Balance */}

        <div className="grid grid-cols-1 border-b border-[#d8e69e] sm:grid-cols-3">
          <div className="px-4 py-4 sm:px-6">
            <p className="text-xs font-bold text-[#667697]">Opening Balance</p>

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

        {/* Entries */}

        {account.entries.length === 0 ? (
          <div className="px-4 py-10 text-center sm:px-6">
            <p className="text-sm font-bold text-[#667697]">
              No transactions for this period.
            </p>
          </div>
        ) : (
          <>
            {/* Desktop */}

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
                      className="border-b border-[#e1e9bd] last:border-0"
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

                      <td className="px-6 py-4 text-right text-sm font-black">
                        {formatCurrency(entry.balance)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile */}

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

                      <p className="mt-1 text-sm font-black">
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

        {/* Account Closing Balance */}

        <div className="flex flex-col gap-2 border-t border-[#d8e69e] bg-[#edf6c5] px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p className="text-sm font-bold text-[#667697]">Closing Balance</p>

          <p className="text-xl font-black">
            {formatCurrency(account.closingBalance)}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#f1ffc4] px-3 py-5 text-[#17213d] sm:px-5 sm:py-6 md:px-10 md:py-8">
      <div className="mx-auto max-w-7xl">
        {/* ========================================
            HEADER
        ======================================== */}

        <div className="mb-6 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
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
              Track receipts, payments, opening balances, and closing balances
              for your cash and bank accounts.
            </p>
          </div>
        </div>

        {/* ========================================
            DATE FILTER
        ======================================== */}

        <form
          onSubmit={handleSubmit}
          className="mb-6 rounded-3xl border border-[#d8e69e] bg-[#faffdf] p-4 shadow-sm sm:p-6"
        >
          <div className="grid gap-4 md:grid-cols-2">
            {/* From */}

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

            {/* To */}

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
                  onChange={(event) => setTo(event.target.value)}
                  className="w-full rounded-xl border border-[#cbd99a] bg-white px-10 py-3 text-sm font-semibold outline-none transition focus:border-[#292727] focus:ring-2 focus:ring-[#dce9a5]"
                />
              </div>
            </div>
          </div>

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

        {/* ========================================
            SUMMARY
        ======================================== */}

        <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-[#d8e69e] bg-[#faffdf] p-4">
            <p className="text-xs font-bold text-[#667697]">Opening Balance</p>

            <p className="mt-2 text-xl font-black">
              {formatCurrency(cashBook.totalOpeningBalance)}
            </p>
          </div>

          <div className="rounded-2xl border border-[#d8e69e] bg-[#faffdf] p-4">
            <p className="text-xs font-bold text-[#667697]">Total Receipts</p>

            <p className="mt-2 text-xl font-black">
              {formatCurrency(cashBook.totalReceipts)}
            </p>
          </div>

          <div className="rounded-2xl border border-[#d8e69e] bg-[#faffdf] p-4">
            <p className="text-xs font-bold text-[#667697]">Total Payments</p>

            <p className="mt-2 text-xl font-black">
              {formatCurrency(cashBook.totalPayments)}
            </p>
          </div>

          <div className="rounded-2xl bg-[#292727] p-4 text-white">
            <p className="text-xs font-bold text-[#cbd99a]">Closing Balance</p>

            <p className="mt-2 text-xl font-black">
              {formatCurrency(cashBook.totalClosingBalance)}
            </p>
          </div>
        </div>

        {/* ========================================
            PERIOD
        ======================================== */}

        <div className="mb-5 flex flex-col gap-1 text-sm text-[#667697] sm:flex-row sm:items-center sm:justify-between">
          <p className="font-semibold">
            {cashBook.accounts.length} account
            {cashBook.accounts.length !== 1 ? "s" : ""} included
          </p>

          <p className="font-semibold">
            {cashBook.period.from && cashBook.period.to
              ? `${formatDate(cashBook.period.from)} – ${formatDate(
                  cashBook.period.to,
                )}`
              : "All transactions"}
          </p>
        </div>

        {/* ========================================
            ACCOUNTS
        ======================================== */}

        {cashBook.accounts.length === 0 ? (
          <div className="rounded-3xl border border-[#d8e69e] bg-[#faffdf] px-5 py-16 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#292727] text-white">
              <Wallet size={24} />
            </div>

            <h2 className="mt-5 text-xl font-black">No Cash Book Accounts</h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#667697]">
              No active cash or bank accounts are currently available for this
              business.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {cashBook.accounts.map(renderAccount)}
          </div>
        )}
      </div>
    </div>
  );
};

export default CashBook;
