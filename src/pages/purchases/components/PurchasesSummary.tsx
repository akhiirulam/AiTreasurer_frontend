import { CircleCheckBig, CircleDollarSign, Clock3 } from "lucide-react";

interface PurchasesSummaryProps {
  totalPurchases: number;
  totalPaid: number;
  totalOutstanding: number;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amount);
};

const PurchasesSummary = ({
  totalPurchases,
  totalPaid,
  totalOutstanding,
}: PurchasesSummaryProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {/* Total Purchases */}
      <div className="rounded-xl border border-[#dce5da] bg-white p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-[#68736c]">
              Total Purchases
            </p>

            <p className="mt-2 font-financial text-2xl font-bold text-[#173f35]">
              {formatCurrency(totalPurchases)}
            </p>

            <p className="mt-1 text-xs text-[#68736c]">
              Total purchase value for the selected period
            </p>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e4f2de] text-[#173f35]">
            <CircleDollarSign size={22} />
          </div>
        </div>
      </div>

      {/* Total Paid */}
      <div className="rounded-xl border border-[#dce5da] bg-white p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-[#68736c]">Total Paid</p>

            <p className="mt-2 font-financial text-2xl font-bold text-[#173f35]">
              {formatCurrency(totalPaid)}
            </p>

            <p className="mt-1 text-xs text-[#68736c]">
              Amount paid to suppliers
            </p>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e4f2de] text-[#173f35]">
            <CircleCheckBig size={22} />
          </div>
        </div>
      </div>

      {/* Outstanding */}
      <div className="rounded-xl border border-[#dce5da] bg-white p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-[#68736c]">Outstanding</p>

            <p className="mt-2 font-financial text-2xl font-bold text-[#173f35]">
              {formatCurrency(totalOutstanding)}
            </p>

            <p className="mt-1 text-xs text-[#68736c]">
              Amount still payable to suppliers
            </p>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e4f2de] text-[#173f35]">
            <Clock3 size={22} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchasesSummary;
