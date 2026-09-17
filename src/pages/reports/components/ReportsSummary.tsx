import {
  ArrowDownToLine,
  ArrowUpFromLine,
  CircleDollarSign,
  CreditCard,
  ShoppingCart,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";

import type { ReportsSummary as ReportsSummaryType } from "../types/reports.types";

interface ReportsSummaryProps {
  summary: ReportsSummaryType;
}

const ReportsSummary = ({ summary }: ReportsSummaryProps) => {
  const formatCurrency = (value: number) =>
    `₹${value.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  const cards = [
    {
      title: "Total Sales",
      value: summary.totalSales,
      icon: ShoppingCart,
      description: "Revenue from sales",
    },
    {
      title: "Total Purchases",
      value: summary.totalPurchases,
      icon: CreditCard,
      description: "Cost of purchases",
    },
    {
      title: "Total Income",
      value: summary.totalIncome,
      icon: ArrowUpFromLine,
      description: "Sales + other income",
    },
    {
      title: "Total Expenses",
      value: summary.totalExpenses,
      icon: ArrowDownToLine,
      description: "Purchases + expenses",
    },
    {
      title: "Net Profit",
      value: summary.netProfit,
      icon: TrendingUp,
      description: summary.netProfit >= 0 ? "Business profit" : "Business loss",
    },
    {
      title: "Receivables",
      value: summary.totalReceivables,
      icon: Users,
      description: "Amount customers owe",
    },
    {
      title: "Payables",
      value: summary.totalPayables,
      icon: Wallet,
      description: "Amount owed to suppliers",
    },
    {
      title: "Other Income",
      value: summary.otherIncome,
      icon: CircleDollarSign,
      description: "Income excluding sales",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-xl border border-[#dce5da] bg-white p-5 shadow-sm transition hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-[#68736c]">
                  {card.title}
                </p>

                <p className="mt-2 font-financial text-2xl font-bold text-[#173f35]">
                  {formatCurrency(card.value)}
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#e4f2de] text-[#173f35]">
                <Icon size={20} />
              </div>
            </div>

            <p className="mt-3 text-xs text-[#68736c]">{card.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ReportsSummary;
