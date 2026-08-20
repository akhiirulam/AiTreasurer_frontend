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
      <div className="mb-3 flex items-center gap-2 text-sm font-bold text-[#667697]">
        <Wallet size={18} />

        <span>Accounting</span>

        <span>/</span>

        <span>Cash Book</span>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">
        Cash Book
      </h1>

      {/* Description */}
      <p className="mt-2 max-w-2xl text-sm leading-6 text-[#667697] sm:text-base">
        Track money received and paid through your cash and bank accounts.
      </p>

      {/* Counts */}
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <div className="rounded-full border border-[#d8e69e] bg-[#faffdf] px-3 py-1.5 text-xs font-bold text-[#667697]">
          {accountCount} account
          {accountCount !== 1 ? "s" : ""}
        </div>

        <div className="rounded-full border border-[#d8e69e] bg-[#faffdf] px-3 py-1.5 text-xs font-bold text-[#667697]">
          {transactionCount} transaction
          {transactionCount !== 1 ? "s" : ""}
        </div>
      </div>
    </div>
  );
};

export default CashBookHeader;
