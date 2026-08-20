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
        <p className="text-sm font-bold text-[#667697]">
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
            {entries.map((entry) => (
              <tr
                key={entry.journalEntryId}
                className="border-b border-[#e1e9bd] last:border-0 hover:bg-[#f5fbdc]"
              >
                {/* DATE */}

                <td className="whitespace-nowrap px-6 py-4 text-sm font-bold">
                  {formatDate(entry.date)}
                </td>

                {/* DESCRIPTION */}

                <td className="max-w-[420px] px-6 py-4">
                  <p className="truncate text-sm font-bold">
                    {entry.description}
                  </p>
                </td>

                {/* RECEIPT */}

                <td className="px-6 py-4 text-right text-sm font-black">
                  {entry.receipt > 0 ? formatCurrency(entry.receipt) : "—"}
                </td>

                {/* PAYMENT */}

                <td className="px-6 py-4 text-right text-sm font-black">
                  {entry.payment > 0 ? formatCurrency(entry.payment) : "—"}
                </td>

                {/* BALANCE */}

                <td
                  className={`px-6 py-4 text-right text-sm font-black ${
                    entry.balance < 0 ? "text-red-600" : "text-[#17213d]"
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

      <div className="space-y-3 p-3 lg:hidden sm:p-4">
        {entries.map((entry) => (
          <div
            key={entry.journalEntryId}
            className="rounded-2xl border border-[#d8e69e] bg-[#f5fbdc] p-4"
          >
            {/* DATE + BALANCE */}

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
                <p className="text-xs font-bold text-[#667697]">Balance</p>

                <p
                  className={`mt-1 text-sm font-black ${
                    entry.balance < 0 ? "text-red-600" : "text-[#17213d]"
                  }`}
                >
                  {formatCurrency(entry.balance)}
                </p>
              </div>
            </div>

            {/* RECEIPT / PAYMENT */}

            <div className="mt-4 grid grid-cols-2 gap-3">
              {/* RECEIPT */}

              <div className="rounded-xl bg-[#eaf4bd] p-3">
                <div className="flex items-center gap-1 text-xs font-bold text-[#667697]">
                  <ArrowDownLeft size={14} />

                  <span>Receipt</span>
                </div>

                <p className="mt-1 text-sm font-black">
                  {entry.receipt > 0 ? formatCurrency(entry.receipt) : "—"}
                </p>
              </div>

              {/* PAYMENT */}

              <div className="rounded-xl bg-[#eaf4bd] p-3">
                <div className="flex items-center gap-1 text-xs font-bold text-[#667697]">
                  <ArrowUpRight size={14} />

                  <span>Payment</span>
                </div>

                <p className="mt-1 text-sm font-black">
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
