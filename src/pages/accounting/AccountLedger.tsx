import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Loader2,
  BookOpen,
  TrendingUp,
  TrendingDown,
  Wallet,
} from "lucide-react";
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
      setLoading(false);
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
        setLedger(null);
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
      <div className="flex min-h-[500px] items-center justify-center bg-[#f5f7f2]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 size={30} className="animate-spin text-[#173f35]" />

          <p className="text-sm font-medium text-[#68736c]">
            Loading account ledger...
          </p>
        </div>
      </div>
    );
  }

  // ==================================================
  // NOT FOUND
  // ==================================================

  if (!ledger) {
    return (
      <div className="min-h-screen bg-[#f5f7f2] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <button
            type="button"
            onClick={() => navigate("/owner/accounts")}
            className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#68736c] transition hover:text-[#173f35]"
          >
            <ArrowLeft size={18} />
            Back to Accounts
          </button>

          <div className="rounded-3xl border border-[#dce5da] bg-white px-6 py-20 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e4f2de] text-[#173f35]">
              <BookOpen size={24} />
            </div>

            <p className="mt-5 font-semibold text-[#17231f]">
              Account ledger not found
            </p>

            <p className="mt-2 text-sm text-[#68736c]">
              The requested account ledger could not be loaded.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ==================================================
  // PAGE
  // ==================================================

  return (
    <div className="min-h-screen w-full bg-[#f5f7f2] px-4 py-6 sm:px-6 md:px-8 lg:px-10">
      <div className="mx-auto w-full max-w-7xl">
        {/* ==================================================
            BACK
        ================================================== */}

        <button
          type="button"
          onClick={() => navigate("/owner/accounts")}
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#68736c] transition hover:text-[#173f35]"
        >
          <ArrowLeft size={18} />
          Back to Accounts
        </button>

        {/* ==================================================
            HEADER
        ================================================== */}

        <div className="mb-8">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#e4f2de] text-[#173f35]">
              <BookOpen size={17} />
            </div>

            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#238636]">
              Account Ledger
            </p>
          </div>

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-[#17231f] sm:text-4xl">
                {ledger.account.name}
              </h1>

              <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-[#68736c]">
                <span className="font-technical">{ledger.account.code}</span>

                <span>•</span>

                <span className="capitalize">{ledger.account.type}</span>

                {ledger.account.subCategory && (
                  <>
                    <span>•</span>

                    <span className="capitalize">
                      {ledger.account.subCategory.replace(/_/g, " ")}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ==================================================
            SUMMARY
        ================================================== */}

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <SummaryCard
            label="Opening Balance"
            value={ledger.openingBalance}
            icon={<Wallet size={18} />}
          />

          <SummaryCard
            label="Total Debit"
            value={ledger.totalDebit}
            icon={<TrendingUp size={18} />}
          />

          <SummaryCard
            label="Total Credit"
            value={ledger.totalCredit}
            icon={<TrendingDown size={18} />}
          />
        </div>

        {/* ==================================================
            LEDGER
        ================================================== */}

        <div className="overflow-hidden rounded-3xl border border-[#dce5da] bg-white shadow-sm">
          {/* DESKTOP HEADER */}

          <div className="hidden grid-cols-[130px_1fr_150px_150px_150px] border-b border-[#dce5da] bg-[#f9fbf7] px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#68736c] md:grid">
            <span>Date</span>

            <span>Description</span>

            <span className="text-right">Debit</span>

            <span className="text-right">Credit</span>

            <span className="text-right">Balance</span>
          </div>

          {/* ENTRIES */}

          {ledger.entries.length === 0 ? (
            <div className="px-6 py-20 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e4f2de] text-[#173f35]">
                <BookOpen size={22} />
              </div>

              <p className="mt-5 text-sm font-semibold text-[#17231f]">
                No transactions
              </p>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#68736c]">
                No journal entries have been recorded for this account yet.
              </p>
            </div>
          ) : (
            ledger.entries.map((entry: any) => (
              <div
                key={entry.journalEntryId}
                className="border-b border-[#edf1eb] px-4 py-4 last:border-b-0 sm:px-6"
              >
                {/* DESKTOP */}

                <div className="hidden grid-cols-[130px_1fr_150px_150px_150px] items-center gap-4 md:grid">
                  <span className="text-sm text-[#68736c]">
                    {formatDate(entry.date)}
                  </span>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-[#17231f]">
                      {entry.description}
                    </p>
                  </div>

                  <span className="font-financial text-right text-sm text-[#17231f]">
                    {entry.debit > 0 ? formatCurrency(entry.debit) : "—"}
                  </span>

                  <span className="font-financial text-right text-sm text-[#17231f]">
                    {entry.credit > 0 ? formatCurrency(entry.credit) : "—"}
                  </span>

                  <span className="font-financial text-right text-sm font-semibold text-[#173f35]">
                    {formatCurrency(entry.balance)}
                  </span>
                </div>

                {/* MOBILE */}

                <div className="space-y-4 md:hidden">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-xs text-[#68736c]">
                        {formatDate(entry.date)}
                      </p>

                      <p className="mt-1 text-sm font-semibold text-[#17231f]">
                        {entry.description}
                      </p>
                    </div>

                    <p className="font-financial shrink-0 text-sm font-semibold text-[#173f35]">
                      {formatCurrency(entry.balance)}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-[#dce5da] bg-[#f9fbf7] p-3">
                      <p className="text-xs font-medium text-[#68736c]">
                        Debit
                      </p>

                      <p className="font-financial mt-1 text-sm font-semibold text-[#17231f]">
                        {entry.debit > 0 ? formatCurrency(entry.debit) : "—"}
                      </p>
                    </div>

                    <div className="rounded-xl border border-[#dce5da] bg-[#f9fbf7] p-3">
                      <p className="text-xs font-medium text-[#68736c]">
                        Credit
                      </p>

                      <p className="font-financial mt-1 text-sm font-semibold text-[#17231f]">
                        {entry.credit > 0 ? formatCurrency(entry.credit) : "—"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* ==================================================
              CLOSING BALANCE
          ================================================== */}

          <div className="flex flex-col gap-2 bg-[#173f35] px-5 py-5 text-white sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-white/60">
                Closing Balance
              </span>

              <p className="mt-1 text-sm text-white/75">
                Current account balance
              </p>
            </div>

            <span className="font-financial text-xl font-semibold">
              {formatCurrency(ledger.closingBalance)}
            </span>
          </div>
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
  icon: React.ReactNode;
}

const SummaryCard = ({ label, value, icon }: SummaryCardProps) => {
  return (
    <div className="rounded-2xl border border-[#dce5da] bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#68736c]">
          {label}
        </p>

        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#e4f2de] text-[#173f35]">
          {icon}
        </div>
      </div>

      <p className="font-financial mt-3 text-2xl font-semibold text-[#17231f]">
        {formatCurrency(value)}
      </p>
    </div>
  );
};

export default AccountLedger;
