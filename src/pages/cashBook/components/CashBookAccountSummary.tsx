import { ArrowDownLeft, ArrowUpRight, Wallet } from "lucide-react";

import { formatCurrency } from "../utils/cashBook.utils";

interface CashBookAccountSummaryProps {
  openingBalance: number;
  totalReceipts: number;
  totalPayments: number;
}

interface SummaryItemProps {
  label: string;
  value: number;
  icon: React.ReactNode;
}

const SummaryItem = ({ label, value, icon }: SummaryItemProps) => {
  return (
    <div className="px-4 py-4 sm:px-6">
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#e4f2de] text-[#173f35]">
          {icon}
        </div>

        <p className="text-xs font-semibold uppercase tracking-wider text-[#68736c]">
          {label}
        </p>
      </div>

      <p className="font-financial mt-2 text-lg font-semibold text-[#17231f]">
        {formatCurrency(value)}
      </p>
    </div>
  );
};

const CashBookAccountSummary = ({
  openingBalance,
  totalReceipts,
  totalPayments,
}: CashBookAccountSummaryProps) => {
  return (
    <div className="grid grid-cols-1 border-b border-[#dce5da] bg-white sm:grid-cols-3">
      <SummaryItem
        label="Opening Balance"
        value={openingBalance}
        icon={<Wallet size={15} />}
      />

      <div className="border-t border-[#dce5da] sm:border-l sm:border-t-0">
        <SummaryItem
          label="Receipts"
          value={totalReceipts}
          icon={<ArrowDownLeft size={15} />}
        />
      </div>

      <div className="border-t border-[#dce5da] sm:border-l sm:border-t-0">
        <SummaryItem
          label="Payments"
          value={totalPayments}
          icon={<ArrowUpRight size={15} />}
        />
      </div>
    </div>
  );
};

export default CashBookAccountSummary;
