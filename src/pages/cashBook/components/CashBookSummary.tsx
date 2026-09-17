import type { ReactNode } from "react";

import { ArrowDownLeft, ArrowUpRight, Wallet } from "lucide-react";

import { formatCurrency } from "../utils/cashBook.utils";

interface CashBookSummaryProps {
  opening: number;
  receipts: number;
  payments: number;
  closing: number;
}

interface SummaryCardProps {
  label: string;
  value: number;
  icon: ReactNode;
  dark?: boolean;
}

const SummaryCard = ({
  label,
  value,
  icon,
  dark = false,
}: SummaryCardProps) => {
  return (
    <div
      className={`rounded-2xl border p-4 ${
        dark
          ? "border-[#173f35] bg-[#173f35] text-white"
          : "border-[#dce5da] bg-white"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <p
          className={`text-xs font-bold uppercase tracking-wide ${
            dark ? "text-[#cfe4c9]" : "text-[#68736c]"
          }`}
        >
          {label}
        </p>

        <div
          className={`flex h-8 w-8 items-center justify-center rounded-lg ${
            dark ? "bg-white/10 text-[#e4f2de]" : "bg-[#e4f2de] text-[#173f35]"
          }`}
        >
          {icon}
        </div>
      </div>

      <p
        className={`mt-3 text-xl font-black font-financial ${
          dark ? "text-white" : "text-[#17231f]"
        }`}
      >
        {formatCurrency(value)}
      </p>
    </div>
  );
};

const CashBookSummary = ({
  opening,
  receipts,
  payments,
  closing,
}: CashBookSummaryProps) => {
  return (
    <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <SummaryCard
        label="Opening Balance"
        value={opening}
        icon={<Wallet size={17} />}
      />

      <SummaryCard
        label="Total Receipts"
        value={receipts}
        icon={<ArrowDownLeft size={17} />}
      />

      <SummaryCard
        label="Total Payments"
        value={payments}
        icon={<ArrowUpRight size={17} />}
      />

      <SummaryCard
        label="Closing Balance"
        value={closing}
        icon={<Wallet size={17} />}
        dark
      />
    </div>
  );
};

export default CashBookSummary;
