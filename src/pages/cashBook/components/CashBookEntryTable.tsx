import { ArrowDownLeft, ArrowUpRight } from "lucide-react";

import type { CashBookEntry } from "../types/cashBook.types";

import { formatCurrency, formatDate } from "../utils/cashBook.utils";

interface CashBookEntryTableProps {
  entries: CashBookEntry[];
}

const CashBookEntryTable = ({ entries }: CashBookEntryTableProps) => {
  // =========================================================
  // EMPTY STATE
  // =========================================================

  if (entries.length === 0) {
    return (
      <div className="px-4 py-10 text-center sm:px-6">
        <p className="text-sm font-semibold text-[#68736c]">
          No transactions for this period.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* =====================================================
          DESKTOP TABLE
      ===================================================== */}

      <div className="hidden overflow-x-auto lg:block">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#dce5da] bg-[#f9fbf7] text-left">
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#68736c]">
                Date
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#68736c]">
                Description
              </th>

              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-[#68736c]">
                Receipt
              </th>

              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-[#68736c]">
                Payment
              </th>

              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-[#68736c]">
                Balance
              </th>
            </tr>
          </thead>

          <tbody>
            {entries.map((entry) => (
              <tr
                key={entry.journalEntryId}
                className="border-b border-[#edf1eb] last:border-0 transition hover:bg-[#f9fbf7]"
              >
                {/* DATE */}

                <td className="whitespace-nowrap px-6 py-4 text-sm text-[#68736c]">
                  {formatDate(entry.date)}
                </td>

                {/* DESCRIPTION */}

                <td className="max-w-[420px] px-6 py-4">
                  <p className="truncate text-sm font-semibold text-[#17231f]">
                    {entry.description}
                  </p>
                </td>

                {/* RECEIPT */}

                <td className="font-financial px-6 py-4 text-right text-sm font-semibold text-[#17231f]">
                  {entry.receipt > 0 ? formatCurrency(entry.receipt) : "—"}
                </td>

                {/* PAYMENT */}

                <td className="font-financial px-6 py-4 text-right text-sm font-semibold text-[#17231f]">
                  {entry.payment > 0 ? formatCurrency(entry.payment) : "—"}
                </td>

                {/* BALANCE */}

                <td
                  className={`font-financial px-6 py-4 text-right text-sm font-semibold ${
                    entry.balance < 0 ? "text-[#c43d3d]" : "text-[#173f35]"
                  }`}
                >
                  {formatCurrency(entry.balance)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* =====================================================
          MOBILE TRANSACTIONS
      ===================================================== */}

      <div className="space-y-3 bg-[#f9fbf7] p-3 lg:hidden sm:p-4">
        {entries.map((entry) => (
          <div
            key={entry.journalEntryId}
            className="rounded-2xl border border-[#dce5da] bg-white p-4 shadow-sm"
          >
            {/* DATE + BALANCE */}

            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs font-medium text-[#68736c]">
                  {formatDate(entry.date)}
                </p>

                <p className="mt-2 break-words text-sm font-semibold text-[#17231f]">
                  {entry.description}
                </p>
              </div>

              <div className="shrink-0 text-right">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#68736c]">
                  Balance
                </p>

                <p
                  className={`font-financial mt-1 text-sm font-semibold ${
                    entry.balance < 0 ? "text-[#c43d3d]" : "text-[#173f35]"
                  }`}
                >
                  {formatCurrency(entry.balance)}
                </p>
              </div>
            </div>

            {/* RECEIPT / PAYMENT */}

            <div className="mt-4 grid grid-cols-2 gap-3">
              {/* RECEIPT */}

              <div className="rounded-xl border border-[#dce5da] bg-[#e4f2de] p-3">
                <div className="flex items-center gap-1 text-xs font-semibold text-[#173f35]">
                  <ArrowDownLeft size={14} />

                  <span>Receipt</span>
                </div>

                <p className="font-financial mt-1 text-sm font-semibold text-[#17231f]">
                  {entry.receipt > 0 ? formatCurrency(entry.receipt) : "—"}
                </p>
              </div>

              {/* PAYMENT */}

              <div className="rounded-xl border border-[#dce5da] bg-[#e4f2de] p-3">
                <div className="flex items-center gap-1 text-xs font-semibold text-[#173f35]">
                  <ArrowUpRight size={14} />

                  <span>Payment</span>
                </div>

                <p className="font-financial mt-1 text-sm font-semibold text-[#17231f]">
                  {entry.payment > 0 ? formatCurrency(entry.payment) : "—"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CashBookEntryTable;
