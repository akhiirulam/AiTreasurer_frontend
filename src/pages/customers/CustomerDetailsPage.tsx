import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  CreditCard,
  Loader2,
  Phone,
  Receipt,
  UserRound,
  Wallet,
} from "lucide-react";

import customerApi from "../../services/customer.api";

import type { CustomerLedger } from "./types/customer.types";

// =====================================================
// HELPERS
// =====================================================

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amount);
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

// =====================================================
// CUSTOMER DETAILS PAGE
// =====================================================

const CustomerDetailsPage = () => {
  const navigate = useNavigate();

  const { customerId } = useParams<{ customerId: string }>();

  // ===================================================
  // STATE
  // ===================================================

  const [ledger, setLedger] = useState<CustomerLedger | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [from, setFrom] = useState("");

  const [to, setTo] = useState("");

  // ===================================================
  // FETCH LEDGER
  // ===================================================

  const fetchLedger = async (fromDate?: string, toDate?: string) => {
    if (!customerId) {
      setError("Customer ID is missing.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const data = await customerApi.getCustomerLedger(
        customerId,
        fromDate || undefined,
        toDate || undefined,
      );

      setLedger(data);
    } catch (err: any) {
      console.error("Failed to load customer ledger:", err);

      setError(
        err?.response?.data?.message || "Failed to load customer ledger.",
      );
    } finally {
      setLoading(false);
    }
  };

  // ===================================================
  // INITIAL LOAD
  // ===================================================

  useEffect(() => {
    fetchLedger();
  }, [customerId]);

  // ===================================================
  // APPLY DATE FILTER
  // ===================================================

  const handleApplyFilter = () => {
    fetchLedger(from, to);
  };

  // ===================================================
  // CLEAR DATE FILTER
  // ===================================================

  const handleClearFilter = () => {
    setFrom("");
    setTo("");

    fetchLedger();
  };

  // ===================================================
  // LOADING
  // ===================================================

  if (loading && !ledger) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex items-center gap-3 text-[#667697]">
          <Loader2 size={20} className="animate-spin" />

          <span className="text-sm font-semibold">
            Loading customer ledger...
          </span>
        </div>
      </div>
    );
  }

  // ===================================================
  // ERROR
  // ===================================================

  if (error && !ledger) {
    return (
      <div className="min-h-full bg-[#f8f9f1] px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1600px]">
          <button
            type="button"
            onClick={() => navigate("/owner/customers")}
            className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#667697] transition hover:text-[#17213d]"
          >
            <ArrowLeft size={18} />
            Back to Customers
          </button>

          <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4">
            <p className="text-sm font-bold text-red-700">
              Unable to load customer ledger
            </p>

            <p className="mt-1 text-sm text-red-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!ledger) {
    return null;
  }

  // ===================================================
  // RENDER
  // ===================================================

  return (
    <div className="min-h-full bg-[#f8f9f1] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1600px] space-y-6">
        {/* =================================================
            BACK
        ================================================= */}

        <button
          type="button"
          onClick={() => navigate("/owner/customers")}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#667697] transition hover:text-[#17213d]"
        >
          <ArrowLeft size={18} />
          Customers
        </button>

        {/* =================================================
            CUSTOMER HEADER
        ================================================= */}

        <div className="flex flex-col justify-between gap-4 rounded-2xl border border-[#d8e69e] bg-white p-6 shadow-sm md:flex-row md:items-center">
          <div className="flex items-center gap-4">
            {/* Avatar */}

            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#17213d] text-white">
              <UserRound size={25} />
            </div>

            {/* Customer */}

            <div>
              <h1 className="text-2xl font-black text-[#17213d]">
                {ledger.customer.name}
              </h1>

              <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-[#667697]">
                <span className="inline-flex items-center gap-2">
                  <Phone size={15} />

                  {ledger.customer.phone}
                </span>

                {ledger.customer.email && <span>{ledger.customer.email}</span>}
              </div>
            </div>
          </div>

          {/* Outstanding */}

          <div className="rounded-xl bg-[#faffdf] px-5 py-4">
            <p className="text-xs font-bold uppercase tracking-wide text-[#667697]">
              Outstanding
            </p>

            <p className="mt-1 text-xl font-black text-[#17213d]">
              {formatCurrency(ledger.outstandingBalance)}
            </p>
          </div>
        </div>

        {/* =================================================
            SUMMARY
        ================================================= */}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {/* Total Sales */}

          <div className="rounded-2xl border border-[#d8e69e] bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-[#667697]">
                  Total Sales
                </p>

                <p className="mt-2 text-2xl font-black text-[#17213d]">
                  {formatCurrency(ledger.totalSales)}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#faffdf] text-[#17213d]">
                <Receipt size={21} />
              </div>
            </div>
          </div>

          {/* Total Payments */}

          <div className="rounded-2xl border border-[#d8e69e] bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-[#667697]">
                  Total Payments
                </p>

                <p className="mt-2 text-2xl font-black text-[#17213d]">
                  {formatCurrency(ledger.totalPayments)}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#faffdf] text-[#17213d]">
                <CreditCard size={21} />
              </div>
            </div>
          </div>

          {/* Outstanding */}

          <div className="rounded-2xl border border-[#d8e69e] bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-[#667697]">
                  Outstanding Balance
                </p>

                <p className="mt-2 text-2xl font-black text-[#17213d]">
                  {formatCurrency(ledger.outstandingBalance)}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#faffdf] text-[#17213d]">
                <Wallet size={21} />
              </div>
            </div>
          </div>
        </div>

        {/* =================================================
            DATE FILTER
        ================================================= */}

        <div className="rounded-2xl border border-[#d8e69e] bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <Calendar size={18} className="text-[#667697]" />

            <h2 className="text-sm font-bold text-[#17213d]">Filter Ledger</h2>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-[1fr_1fr_auto_auto] lg:items-end">
            {/* FROM */}

            <div>
              <label className="mb-1.5 block text-xs font-bold text-[#667697]">
                From
              </label>

              <input
                type="date"
                value={from}
                onChange={(event) => setFrom(event.target.value)}
                className="w-full rounded-lg border border-[#d8e69e] bg-white px-3 py-2.5 text-sm font-medium text-[#17213d] outline-none transition focus:border-[#17213d]"
              />
            </div>

            {/* TO */}

            <div>
              <label className="mb-1.5 block text-xs font-bold text-[#667697]">
                To
              </label>

              <input
                type="date"
                value={to}
                onChange={(event) => setTo(event.target.value)}
                className="w-full rounded-lg border border-[#d8e69e] bg-white px-3 py-2.5 text-sm font-medium text-[#17213d] outline-none transition focus:border-[#17213d]"
              />
            </div>

            {/* APPLY */}

            <button
              type="button"
              onClick={handleApplyFilter}
              disabled={loading}
              className="inline-flex h-[42px] items-center justify-center gap-2 rounded-lg bg-[#17213d] px-5 text-sm font-bold text-white transition hover:bg-[#273455] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading && <Loader2 size={16} className="animate-spin" />}
              Apply
            </button>

            {/* CLEAR */}

            <button
              type="button"
              onClick={handleClearFilter}
              className="h-[42px] rounded-lg border border-[#d8e69e] px-5 text-sm font-bold text-[#667697] transition hover:bg-[#faffdf] hover:text-[#17213d]"
            >
              Clear
            </button>
          </div>
        </div>

        {/* =================================================
            LEDGER
        ================================================= */}

        <div className="overflow-hidden rounded-2xl border border-[#d8e69e] bg-white shadow-sm">
          {/* HEADER */}

          <div className="flex items-center justify-between border-b border-[#e5edc5] bg-[#faffdf] px-5 py-4">
            <div>
              <h2 className="text-base font-black text-[#17213d]">
                Customer Ledger
              </h2>

              <p className="mt-1 text-xs font-medium text-[#667697]">
                Sales and payments
              </p>
            </div>

            <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-[#667697]">
              {ledger.entries.length}{" "}
              {ledger.entries.length === 1 ? "Entry" : "Entries"}
            </span>
          </div>

          {/* DESKTOP TABLE */}

          <div className="hidden overflow-x-auto md:block">
            {ledger.entries.length === 0 ? (
              <div className="flex min-h-[220px] flex-col items-center justify-center px-6 text-center">
                <Receipt size={28} className="text-[#8995ad]" />

                <p className="mt-3 text-sm font-bold text-[#17213d]">
                  No ledger entries
                </p>

                <p className="mt-1 text-sm text-[#667697]">
                  No transactions found for this period.
                </p>
              </div>
            ) : (
              <table className="w-full min-w-[760px]">
                <thead>
                  <tr className="border-b border-[#e5edc5]">
                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-[#667697]">
                      Date
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-[#667697]">
                      Description
                    </th>

                    <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wide text-[#667697]">
                      Debit
                    </th>

                    <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wide text-[#667697]">
                      Credit
                    </th>

                    <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wide text-[#667697]">
                      Balance
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {ledger.entries.map((entry) => (
                    <tr
                      key={entry.transactionId}
                      className="border-b border-[#edf1da] last:border-b-0 hover:bg-[#fbfff0]"
                    >
                      <td className="px-5 py-4 text-sm font-medium text-[#667697]">
                        {formatDate(entry.date)}
                      </td>

                      <td className="px-5 py-4 text-sm font-semibold text-[#17213d]">
                        {entry.description}
                      </td>

                      <td className="px-5 py-4 text-right text-sm font-semibold text-[#17213d]">
                        {entry.debit > 0 ? formatCurrency(entry.debit) : "—"}
                      </td>

                      <td className="px-5 py-4 text-right text-sm font-semibold text-[#17213d]">
                        {entry.credit > 0 ? formatCurrency(entry.credit) : "—"}
                      </td>

                      <td className="px-5 py-4 text-right text-sm font-black text-[#17213d]">
                        {formatCurrency(entry.balance)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* MOBILE */}

          <div className="space-y-3 p-4 md:hidden">
            {ledger.entries.length === 0 ? (
              <div className="py-8 text-center">
                <Receipt size={28} className="mx-auto text-[#8995ad]" />

                <p className="mt-3 text-sm font-bold text-[#17213d]">
                  No ledger entries
                </p>
              </div>
            ) : (
              ledger.entries.map((entry) => (
                <div
                  key={entry.transactionId}
                  className="rounded-xl border border-[#e5edc5] p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-medium text-[#8995ad]">
                        {formatDate(entry.date)}
                      </p>

                      <p className="mt-1 text-sm font-bold text-[#17213d]">
                        {entry.description}
                      </p>
                    </div>

                    <p className="whitespace-nowrap text-sm font-black text-[#17213d]">
                      {formatCurrency(entry.balance)}
                    </p>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-4 border-t border-[#edf1da] pt-3">
                    <div>
                      <p className="text-xs font-semibold text-[#8995ad]">
                        Debit
                      </p>

                      <p className="mt-1 text-sm font-bold text-[#17213d]">
                        {entry.debit > 0 ? formatCurrency(entry.debit) : "—"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-[#8995ad]">
                        Credit
                      </p>

                      <p className="mt-1 text-sm font-bold text-[#17213d]">
                        {entry.credit > 0 ? formatCurrency(entry.credit) : "—"}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetailsPage;
