import { useEffect, useState } from "react";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import accountApi from "../../services/account.api";

import type { AccountLedger as AccountLedgerData } from "../../services/account.api";

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(value);
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const AccountLedger = () => {
  const navigate = useNavigate();

  const { accountId } = useParams<{
    accountId: string;
  }>();

  const [ledger, setLedger] = useState<AccountLedgerData | null>(null);

  const [loading, setLoading] = useState(true);

  // ==================================================
  // LOAD LEDGER
  // ==================================================

  useEffect(() => {
    if (!accountId) {
      return;
    }

    const loadLedger = async () => {
      try {
        setLoading(true);

        const response = await accountApi.getAccountLedger(accountId);

        console.log("Ledger response:", response);

        setLedger(response.data ?? null);
      } catch (error) {
        console.error("Failed to load account ledger:", error);
      } finally {
        setLoading(false);
      }
    };

    loadLedger();
  }, [accountId]);

  // ==================================================
  // LOADING
  // ==================================================

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 size={28} className="animate-spin text-slate-700" />
      </div>
    );
  }

  // ==================================================
  // NOT FOUND
  // ==================================================

  if (!ledger) {
    return (
      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => navigate("/owner/accounts")}
          className="mb-6 flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-950"
        >
          <ArrowLeft size={18} />
          Back to Accounts
        </button>

        <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center">
          <p className="font-semibold text-slate-900">
            Account ledger not found
          </p>
        </div>
      </div>
    );
  }

  // ==================================================
  // PAGE
  // ==================================================

  return (
    <div className="w-full px-4 py-6 sm:px-6 lg:px-8">
      {/* BACK */}

      <button
        type="button"
        onClick={() => navigate("/owner/accounts")}
        className="mb-6 flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-950"
      >
        <ArrowLeft size={18} />
        Back to Accounts
      </button>

      {/* HEADER */}

      <div className="mb-8">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
          Account Ledger
        </p>

        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              {ledger.account.name}
            </h1>

            <div className="mt-2 flex flex-wrap gap-3 text-sm text-slate-500">
              <span>{ledger.account.code}</span>

              <span>•</span>

              <span className="capitalize">{ledger.account.type}</span>

              {ledger.account.subCategory && (
                <>
                  <span>•</span>

                  <span>{ledger.account.subCategory.replace(/_/g, " ")}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* SUMMARY */}

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <SummaryCard label="Opening Balance" value={ledger.openingBalance} />

        <SummaryCard label="Total Debit" value={ledger.totalDebit} />

        <SummaryCard label="Total Credit" value={ledger.totalCredit} />
      </div>

      {/* LEDGER */}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        {/* DESKTOP HEADER */}

        <div className="hidden grid-cols-[130px_1fr_150px_150px_150px] border-b border-slate-200 bg-slate-50 px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 md:grid">
          <span>Date</span>

          <span>Description</span>

          <span className="text-right">Debit</span>

          <span className="text-right">Credit</span>

          <span className="text-right">Balance</span>
        </div>

        {/* ENTRIES */}

        {ledger.entries.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <p className="text-sm font-semibold text-slate-900">
              No transactions
            </p>

            <p className="mt-2 text-sm text-slate-500">
              No journal entries have been recorded for this account yet.
            </p>
          </div>
        ) : (
          ledger.entries.map((entry: any) => (
            <div
              key={entry.journalEntryId}
              className="border-b border-slate-100 px-4 py-4 last:border-b-0 sm:px-6"
            >
              {/* DESKTOP */}

              <div className="hidden grid-cols-[130px_1fr_150px_150px_150px] items-center gap-4 md:grid">
                <span className="text-sm text-slate-600">
                  {formatDate(entry.date)}
                </span>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-900">
                    {entry.description}
                  </p>
                </div>

                <span className="text-right text-sm font-medium text-slate-900">
                  {entry.debit > 0 ? formatCurrency(entry.debit) : "—"}
                </span>

                <span className="text-right text-sm font-medium text-slate-900">
                  {entry.credit > 0 ? formatCurrency(entry.credit) : "—"}
                </span>

                <span className="text-right text-sm font-bold text-slate-950">
                  {formatCurrency(entry.balance)}
                </span>
              </div>

              {/* MOBILE */}

              <div className="space-y-3 md:hidden">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-xs text-slate-500">
                      {formatDate(entry.date)}
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-900">
                      {entry.description}
                    </p>
                  </div>

                  <p className="shrink-0 text-sm font-bold text-slate-950">
                    {formatCurrency(entry.balance)}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg bg-slate-50 p-3">
                    <p className="text-xs text-slate-500">Debit</p>

                    <p className="mt-1 text-sm font-semibold text-slate-900">
                      {entry.debit > 0 ? formatCurrency(entry.debit) : "—"}
                    </p>
                  </div>

                  <div className="rounded-lg bg-slate-50 p-3">
                    <p className="text-xs text-slate-500">Credit</p>

                    <p className="mt-1 text-sm font-semibold text-slate-900">
                      {entry.credit > 0 ? formatCurrency(entry.credit) : "—"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}

        {/* CLOSING */}

        <div className="flex flex-col gap-2 bg-slate-50 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <span className="text-sm font-semibold text-slate-700">
            Closing Balance
          </span>

          <span className="text-xl font-bold text-slate-950">
            {formatCurrency(ledger.closingBalance)}
          </span>
        </div>
      </div>
    </div>
  );
};

// ==================================================
// SUMMARY CARD
// ==================================================

interface SummaryCardProps {
  label: string;
  value: number;
}

const SummaryCard = ({ label, value }: SummaryCardProps) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </p>

      <p className="mt-2 text-2xl font-bold text-slate-950">
        {formatCurrency(value)}
      </p>
    </div>
  );
};

export default AccountLedger;
