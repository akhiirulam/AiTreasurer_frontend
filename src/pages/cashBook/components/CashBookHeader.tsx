import { Wallet } from "lucide-react";

interface CashBookHeaderProps {
  accountCount: number;
  transactionCount: number;
}

const CashBookHeader = ({
  accountCount,
  transactionCount,
}: CashBookHeaderProps) => {
  return (
    <div className="mb-6">
      {/* Breadcrumb */}
      <div className="mb-3 flex items-center gap-2 text-sm font-bold text-[#68736c]">
        <Wallet size={18} className="text-[#173f35]" />

        <span>Accounting</span>

        <span className="text-[#a0aaa3]">/</span>

        <span className="text-[#173f35]">Cash Book</span>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-black tracking-tight text-[#173f35] sm:text-4xl md:text-5xl">
        Cash Book
      </h1>

      {/* Description */}
      <p className="mt-2 max-w-2xl text-sm leading-6 text-[#68736c] sm:text-base">
        Track money received and paid through your cash and bank accounts.
      </p>

      {/* Counts */}
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <div className="rounded-full border border-[#dce5da] bg-[#e4f2de] px-3 py-1.5 text-xs font-bold text-[#173f35]">
          {accountCount} account
          {accountCount !== 1 ? "s" : ""}
        </div>

        <div className="rounded-full border border-[#dce5da] bg-[#e4f2de] px-3 py-1.5 text-xs font-bold text-[#173f35]">
          {transactionCount} transaction
          {transactionCount !== 1 ? "s" : ""}
        </div>
      </div>
    </div>
  );
};

export default CashBookHeader;
