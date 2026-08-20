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
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#eaf4bd] text-[#292727]">
          {icon}
        </div>

        <p className="text-xs font-bold text-[#667697]">{label}</p>
      </div>

      <p className="mt-2 text-lg font-black">{formatCurrency(value)}</p>
    </div>
  );
};

const CashBookAccountSummary = ({
  openingBalance,
  totalReceipts,
  totalPayments,
}: CashBookAccountSummaryProps) => {
  return (
    <div className="grid grid-cols-1 border-b border-[#d8e69e] sm:grid-cols-3">
      <SummaryItem
        label="Opening Balance"
        value={openingBalance}
        icon={<Wallet size={15} />}
      />

      <div className="border-t border-[#d8e69e] sm:border-l sm:border-t-0">
        <SummaryItem
          label="Receipts"
          value={totalReceipts}
          icon={<ArrowDownLeft size={15} />}
        />
      </div>

      <div className="border-t border-[#d8e69e] sm:border-l sm:border-t-0">
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
