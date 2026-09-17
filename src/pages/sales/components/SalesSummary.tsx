import { CircleDollarSign, CircleCheckBig, Clock3 } from "lucide-react";

interface SalesSummaryProps {
  totalSales: number;
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

const SalesSummary = ({
  totalSales,
  totalPaid,
  totalOutstanding,
}: SalesSummaryProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {/* Total Sales */}
      <div className="rounded-xl border border-[#dce5da] bg-white p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-[#68736c]">Total Sales</p>

            <p className="mt-2 font-financial text-2xl font-bold text-[#173f35]">
              {formatCurrency(totalSales)}
            </p>

            <p className="mt-1 text-xs text-[#68736c]">
              Total sales value for the selected period
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
              Amount received against sales
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
              Amount still receivable from customers
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

export default SalesSummary;
