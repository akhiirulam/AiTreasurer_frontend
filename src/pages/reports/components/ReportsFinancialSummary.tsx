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
      <div className="rounded-xl border border-[#dce5da] bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-[#173f35]">Income & Expenses</h2>

        <p className="mt-1 text-sm text-[#68736c]">
          Overview of your business income and expenses
        </p>

        <div className="mt-6 space-y-5">
          {/* Sales */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#e4f2de] text-[#173f35]">
                <ArrowUp size={18} />
              </div>

              <div>
                <p className="text-sm font-medium text-[#17231f]">Sales</p>

                <p className="text-xs text-[#68736c]">Revenue from sales</p>
              </div>
            </div>

            <p className="font-financial font-semibold text-[#173f35]">
              {formatCurrency(summary.totalSales)}
            </p>
          </div>

          {/* Other Income */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#e4f2de] text-[#173f35]">
                <TrendingUp size={18} />
              </div>

              <div>
                <p className="text-sm font-medium text-[#17231f]">
                  Other Income
                </p>

                <p className="text-xs text-[#68736c]">Income excluding sales</p>
              </div>
            </div>

            <p className="font-financial font-semibold text-[#173f35]">
              {formatCurrency(summary.otherIncome)}
            </p>
          </div>

          <div className="border-t border-[#edf1eb]" />

          {/* Purchases */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#e4f2de] text-[#173f35]">
                <ArrowDown size={18} />
              </div>

              <div>
                <p className="text-sm font-medium text-[#17231f]">Purchases</p>

                <p className="text-xs text-[#68736c]">Cost of purchases</p>
              </div>
            </div>

            <p className="font-financial font-semibold text-[#173f35]">
              {formatCurrency(summary.totalPurchases)}
            </p>
          </div>

          {/* Other Expenses */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#e4f2de] text-[#173f35]">
                <TrendingDown size={18} />
              </div>

              <div>
                <p className="text-sm font-medium text-[#17231f]">
                  Other Expenses
                </p>

                <p className="text-xs text-[#68736c]">
                  Expenses excluding purchases
                </p>
              </div>
            </div>

            <p className="font-financial font-semibold text-[#173f35]">
              {formatCurrency(summary.otherExpenses)}
            </p>
          </div>
        </div>
      </div>

      {/* Profit Summary */}
      <div className="rounded-xl border border-[#dce5da] bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-[#173f35]">Profit Summary</h2>

        <p className="mt-1 text-sm text-[#68736c]">
          Your overall financial position for the selected period
        </p>

        <div className="mt-6 space-y-5">
          {/* Total Income */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#68736c]">Total Income</span>

            <span className="font-financial font-semibold text-[#173f35]">
              {formatCurrency(summary.totalIncome)}
            </span>
          </div>

          {/* Total Expenses */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#68736c]">Total Expenses</span>

            <span className="font-financial font-semibold text-[#173f35]">
              {formatCurrency(summary.totalExpenses)}
            </span>
          </div>

          <div className="border-t border-[#edf1eb]" />

          {/* Net Profit */}
          <div className="rounded-lg bg-[#e4f2de] p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#68736c]">
                  {isProfit ? "Net Profit" : "Net Loss"}
                </p>

                <p className="mt-1 font-financial text-2xl font-bold text-[#173f35]">
                  {formatCurrency(Math.abs(summary.netProfit))}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#dce5da] bg-white text-[#173f35]">
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
            <div className="rounded-lg border border-[#edf1eb] p-4">
              <p className="text-xs text-[#68736c]">Receivables</p>

              <p className="mt-1 font-financial text-lg font-bold text-[#173f35]">
                {formatCurrency(summary.totalReceivables)}
              </p>

              <p className="mt-1 text-xs text-[#68736c]">Customers owe</p>
            </div>

            <div className="rounded-lg border border-[#edf1eb] p-4">
              <p className="text-xs text-[#68736c]">Payables</p>

              <p className="mt-1 font-financial text-lg font-bold text-[#173f35]">
                {formatCurrency(summary.totalPayables)}
              </p>

              <p className="mt-1 text-xs text-[#68736c]">Owed to suppliers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsFinancialSummary;
