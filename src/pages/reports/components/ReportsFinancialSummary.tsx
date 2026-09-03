import { ArrowDown, ArrowUp, TrendingDown, TrendingUp } from "lucide-react";

import type { ReportsSummary } from "../types/reports.types";

interface ReportsFinancialSummaryProps {
  summary: ReportsSummary;
}

const ReportsFinancialSummary = ({ summary }: ReportsFinancialSummaryProps) => {
  const formatCurrency = (value: number) =>
    `₹${value.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  const isProfit = summary.netProfit >= 0;

  return (
    <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Income & Expenses */}
      <div className="rounded-xl border border-[#e5edc5] bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-[#17213d]">Income & Expenses</h2>

        <p className="mt-1 text-sm text-[#667697]">
          Overview of your business income and expenses
        </p>

        <div className="mt-6 space-y-5">
          {/* Sales */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#faffdf] text-[#17213d]">
                <ArrowUp size={18} />
              </div>

              <div>
                <p className="text-sm font-medium text-[#17213d]">Sales</p>

                <p className="text-xs text-[#667697]">Revenue from sales</p>
              </div>
            </div>

            <p className="font-semibold text-[#17213d]">
              {formatCurrency(summary.totalSales)}
            </p>
          </div>

          {/* Other Income */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#faffdf] text-[#17213d]">
                <TrendingUp size={18} />
              </div>

              <div>
                <p className="text-sm font-medium text-[#17213d]">
                  Other Income
                </p>

                <p className="text-xs text-[#667697]">Income excluding sales</p>
              </div>
            </div>

            <p className="font-semibold text-[#17213d]">
              {formatCurrency(summary.otherIncome)}
            </p>
          </div>

          <div className="border-t border-[#edf1da]" />

          {/* Purchases */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#faffdf] text-[#17213d]">
                <ArrowDown size={18} />
              </div>

              <div>
                <p className="text-sm font-medium text-[#17213d]">Purchases</p>

                <p className="text-xs text-[#667697]">Cost of purchases</p>
              </div>
            </div>

            <p className="font-semibold text-[#17213d]">
              {formatCurrency(summary.totalPurchases)}
            </p>
          </div>

          {/* Other Expenses */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#faffdf] text-[#17213d]">
                <TrendingDown size={18} />
              </div>

              <div>
                <p className="text-sm font-medium text-[#17213d]">
                  Other Expenses
                </p>

                <p className="text-xs text-[#667697]">
                  Expenses excluding purchases
                </p>
              </div>
            </div>

            <p className="font-semibold text-[#17213d]">
              {formatCurrency(summary.otherExpenses)}
            </p>
          </div>
        </div>
      </div>

      {/* Profit Summary */}
      <div className="rounded-xl border border-[#e5edc5] bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-[#17213d]">Profit Summary</h2>

        <p className="mt-1 text-sm text-[#667697]">
          Your overall financial position for the selected period
        </p>

        <div className="mt-6 space-y-5">
          {/* Total Income */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#667697]">Total Income</span>

            <span className="font-semibold text-[#17213d]">
              {formatCurrency(summary.totalIncome)}
            </span>
          </div>

          {/* Total Expenses */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#667697]">Total Expenses</span>

            <span className="font-semibold text-[#17213d]">
              {formatCurrency(summary.totalExpenses)}
            </span>
          </div>

          <div className="border-t border-[#edf1da]" />

          {/* Net Profit */}
          <div className="rounded-lg bg-[#faffdf] p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#667697]">
                  {isProfit ? "Net Profit" : "Net Loss"}
                </p>

                <p className="mt-1 text-2xl font-bold text-[#17213d]">
                  {formatCurrency(Math.abs(summary.netProfit))}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d8e69e] bg-white text-[#17213d]">
                {isProfit ? (
                  <TrendingUp size={21} />
                ) : (
                  <TrendingDown size={21} />
                )}
              </div>
            </div>
          </div>

          {/* Receivables / Payables */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg border border-[#edf1da] p-4">
              <p className="text-xs text-[#667697]">Receivables</p>

              <p className="mt-1 text-lg font-bold text-[#17213d]">
                {formatCurrency(summary.totalReceivables)}
              </p>

              <p className="mt-1 text-xs text-[#667697]">Customers owe</p>
            </div>

            <div className="rounded-lg border border-[#edf1da] p-4">
              <p className="text-xs text-[#667697]">Payables</p>

              <p className="mt-1 text-lg font-bold text-[#17213d]">
                {formatCurrency(summary.totalPayables)}
              </p>

              <p className="mt-1 text-xs text-[#667697]">Owed to suppliers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsFinancialSummary;
