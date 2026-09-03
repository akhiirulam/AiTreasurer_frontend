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
      <div className="rounded-xl border border-[#e5edc5] bg-white p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-[#667697]">Total Sales</p>

            <p className="mt-2 text-2xl font-bold text-[#17213d]">
              {formatCurrency(totalSales)}
            </p>

            <p className="mt-1 text-xs text-[#667697]">
              Total sales value for the selected period
            </p>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#faffdf] text-[#17213d]">
            <CircleDollarSign size={22} />
          </div>
        </div>
      </div>

      {/* Total Paid */}
      <div className="rounded-xl border border-[#e5edc5] bg-white p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-[#667697]">Total Paid</p>

            <p className="mt-2 text-2xl font-bold text-[#17213d]">
              {formatCurrency(totalPaid)}
            </p>

            <p className="mt-1 text-xs text-[#667697]">
              Amount received against sales
            </p>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#faffdf] text-[#17213d]">
            <CircleCheckBig size={22} />
          </div>
        </div>
      </div>

      {/* Outstanding */}
      <div className="rounded-xl border border-[#e5edc5] bg-white p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-[#667697]">Outstanding</p>

            <p className="mt-2 text-2xl font-bold text-[#17213d]">
              {formatCurrency(totalOutstanding)}
            </p>

            <p className="mt-1 text-xs text-[#667697]">
              Amount still receivable from customers
            </p>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#faffdf] text-[#17213d]">
            <Clock3 size={22} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesSummary;
