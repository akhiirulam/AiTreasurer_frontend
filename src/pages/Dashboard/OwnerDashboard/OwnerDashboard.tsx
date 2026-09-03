import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  CreditCard,
  IndianRupee,
  Plus,
  Receipt,
  TrendingUp,
  Users,
  Wallet,
  FileBarChart,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import useDashboard from "../hooks/useDashboard";

const OwnerDashboard = () => {
  const navigate = useNavigate();

  const { dashboard, loading, error } = useDashboard();

  const formatCurrency = (value: number) =>
    `₹${value.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const getTransactionLabel = (type: string) => {
    switch (type) {
      case "sale":
        return "Sale";

      case "purchase":
        return "Purchase";

      case "income":
        return "Income";

      case "expense":
        return "Expense";

      case "payment":
        return "Payment";

      case "capital":
        return "Capital";

      default:
        return "Transaction";
    }
  };

  const getTransactionIcon = (type: string) => {
    if (type === "sale" || type === "income" || type === "payment") {
      return ArrowUpRight;
    }

    return ArrowDownRight;
  };

  const getTransactionColor = (type: string) => {
    if (type === "sale" || type === "income" || type === "payment") {
      return "text-[#17233d]";
    }

    return "text-[#292727]";
  };

  if (loading && !dashboard) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f3ffc1]">
        <div className="text-sm font-medium text-[#526040]">
          Loading dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#f3ffc1] px-4 py-8 sm:px-6 lg:px-10">
      <div className="w-full">
        {/* ================================================== */}
        {/* Header */}
        {/* ================================================== */}

        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.25em] text-[#526040]">
              Owner Dashboard
            </p>

            <h1 className="text-4xl font-bold tracking-tight text-[#111827] sm:text-5xl">
              Your business
              <br />
              at a glance.
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-6 text-[#43506b] sm:text-base">
              Keep track of your income, expenses, customers and everyday
              business transactions in one place.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/transactions/add")}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#292727] px-5 py-3 text-sm font-semibold text-white transition hover:bg-black"
          >
            <Plus size={18} />
            Add Transaction
          </button>
        </div>

        {/* ================================================== */}
        {/* Error */}
        {/* ================================================== */}

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {dashboard && (
          <>
            {/* ================================================== */}
            {/* Main Financial Summary */}
            {/* ================================================== */}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {/* Income */}
              <div className="rounded-3xl border border-black/10 bg-[#f3ffc1] p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-[#526040]">Income</p>

                    <h2 className="mt-3 text-3xl font-bold text-[#111827]">
                      {formatCurrency(dashboard.summary.totalIncome)}
                    </h2>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#292727] text-white">
                    <ArrowUpRight size={19} />
                  </div>
                </div>

                <p className="mt-6 text-xs font-semibold text-[#43506b]">
                  Total business income
                </p>
              </div>

              {/* Expenses */}
              <div className="rounded-3xl border border-black/10 bg-[#f3ffc1] p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-[#526040]">
                      Expenses
                    </p>

                    <h2 className="mt-3 text-3xl font-bold text-[#111827]">
                      {formatCurrency(dashboard.summary.totalExpenses)}
                    </h2>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#292727] text-white">
                    <ArrowDownRight size={19} />
                  </div>
                </div>

                <p className="mt-6 text-xs font-semibold text-[#43506b]">
                  Total business expenses
                </p>
              </div>

              {/* Net Profit */}
              <div className="rounded-3xl border border-black/10 bg-[#f3ffc1] p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-[#526040]">
                      Net Profit
                    </p>

                    <h2 className="mt-3 text-3xl font-bold text-[#111827]">
                      {formatCurrency(dashboard.summary.netProfit)}
                    </h2>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#292727] text-white">
                    <TrendingUp size={19} />
                  </div>
                </div>

                <p className="mt-6 text-xs font-semibold text-[#43506b]">
                  Income minus expenses
                </p>
              </div>

              {/* Cash / Bank */}
              <div className="rounded-3xl border border-black/10 bg-[#f3ffc1] p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-[#526040]">
                      Cash & Bank
                    </p>

                    <h2 className="mt-3 text-3xl font-bold text-[#111827]">
                      {formatCurrency(dashboard.summary.cashBankBalance)}
                    </h2>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#292727] text-white">
                    <Wallet size={19} />
                  </div>
                </div>

                <p className="mt-6 text-xs font-semibold text-[#43506b]">
                  Current cash and bank movement
                </p>
              </div>
            </div>

            {/* ================================================== */}
            {/* Business Overview */}
            {/* ================================================== */}

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {/* Sales */}
              <button
                type="button"
                onClick={() => navigate("/owner/sales")}
                className="rounded-3xl border border-black/10 bg-[#f3ffc1] p-6 text-left transition hover:bg-white"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-[#526040]">Sales</p>

                    <h3 className="mt-2 text-2xl font-bold text-[#111827]">
                      {formatCurrency(dashboard.business.totalSales)}
                    </h3>
                  </div>

                  <Receipt size={21} className="text-[#292727]" />
                </div>

                <p className="mt-4 text-xs text-[#526040]">View sales report</p>
              </button>

              {/* Purchases */}
              <button
                type="button"
                onClick={() => navigate("/owner/purchases")}
                className="rounded-3xl border border-black/10 bg-[#f3ffc1] p-6 text-left transition hover:bg-white"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-[#526040]">
                      Purchases
                    </p>

                    <h3 className="mt-2 text-2xl font-bold text-[#111827]">
                      {formatCurrency(dashboard.business.totalPurchases)}
                    </h3>
                  </div>

                  <CreditCard size={21} className="text-[#292727]" />
                </div>

                <p className="mt-4 text-xs text-[#526040]">
                  View purchase report
                </p>
              </button>

              {/* Receivables */}
              <button
                type="button"
                onClick={() => navigate("/owner/customers")}
                className="rounded-3xl border border-black/10 bg-[#f3ffc1] p-6 text-left transition hover:bg-white"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-[#526040]">
                      Receivables
                    </p>

                    <h3 className="mt-2 text-2xl font-bold text-[#111827]">
                      {formatCurrency(dashboard.business.totalReceivables)}
                    </h3>
                  </div>

                  <Users size={21} className="text-[#292727]" />
                </div>

                <p className="mt-4 text-xs text-[#526040]">
                  Customer outstanding
                </p>
              </button>

              {/* Payables */}
              <button
                type="button"
                onClick={() => navigate("/owner/suppliers")}
                className="rounded-3xl border border-black/10 bg-[#f3ffc1] p-6 text-left transition hover:bg-white"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-[#526040]">
                      Payables
                    </p>

                    <h3 className="mt-2 text-2xl font-bold text-[#111827]">
                      {formatCurrency(dashboard.business.totalPayables)}
                    </h3>
                  </div>

                  <IndianRupee size={21} className="text-[#292727]" />
                </div>

                <p className="mt-4 text-xs text-[#526040]">
                  Supplier outstanding
                </p>
              </button>
            </div>

            {/* ================================================== */}
            {/* Main Grid */}
            {/* ================================================== */}

            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* Financial Overview */}
              <div className="rounded-3xl border border-black/10 bg-[#f3ffc1] p-6 sm:p-8 lg:col-span-2">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#526040]">
                      Overview
                    </p>

                    <h2 className="mt-2 text-2xl font-bold text-[#111827]">
                      Financial Overview
                    </h2>
                  </div>

                  <button
                    type="button"
                    onClick={() => navigate("/owner/reports")}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#292727]"
                  >
                    View Reports
                    <ArrowRight size={16} />
                  </button>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {/* Income */}
                  <div className="rounded-2xl border border-black/10 bg-white p-5">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-[#526040]">
                        Income
                      </p>

                      <ArrowUpRight size={18} className="text-[#17233d]" />
                    </div>

                    <p className="mt-4 text-2xl font-bold text-[#111827]">
                      {formatCurrency(dashboard.summary.totalIncome)}
                    </p>
                  </div>

                  {/* Expenses */}
                  <div className="rounded-2xl border border-black/10 bg-white p-5">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-[#526040]">
                        Expenses
                      </p>

                      <ArrowDownRight size={18} className="text-[#292727]" />
                    </div>

                    <p className="mt-4 text-2xl font-bold text-[#111827]">
                      {formatCurrency(dashboard.summary.totalExpenses)}
                    </p>
                  </div>
                </div>

                <div className="mt-4 rounded-2xl bg-[#292727] p-5 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-white/60">Net Profit</p>

                      <p className="mt-2 text-3xl font-bold">
                        {formatCurrency(dashboard.summary.netProfit)}
                      </p>
                    </div>

                    <TrendingUp size={25} />
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="rounded-3xl bg-[#292727] p-6 text-white sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f3ffc1]">
                  Quick Actions
                </p>

                <h2 className="mt-3 text-2xl font-bold">
                  Manage your business.
                </h2>

                <div className="mt-8 space-y-3">
                  <button
                    type="button"
                    onClick={() => navigate("/transactions/add")}
                    className="flex w-full items-center justify-between rounded-xl bg-[#f3ffc1] px-4 py-4 text-left text-[#292727] transition hover:bg-white"
                  >
                    <span className="flex items-center gap-3 text-sm font-semibold">
                      <Receipt size={19} />
                      Add Transaction
                    </span>

                    <ArrowRight size={18} />
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate("/owner/customers")}
                    className="flex w-full items-center justify-between rounded-xl border border-white/20 px-4 py-4 text-left transition hover:bg-white/10"
                  >
                    <span className="flex items-center gap-3 text-sm font-semibold">
                      <Users size={19} />
                      Customers
                    </span>

                    <ArrowRight size={18} />
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate("/owner/suppliers")}
                    className="flex w-full items-center justify-between rounded-xl border border-white/20 px-4 py-4 text-left transition hover:bg-white/10"
                  >
                    <span className="flex items-center gap-3 text-sm font-semibold">
                      <IndianRupee size={19} />
                      Suppliers
                    </span>

                    <ArrowRight size={18} />
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate("/owner/reports")}
                    className="flex w-full items-center justify-between rounded-xl border border-white/20 px-4 py-4 text-left transition hover:bg-white/10"
                  >
                    <span className="flex items-center gap-3 text-sm font-semibold">
                      <FileBarChart size={19} />
                      Reports
                    </span>

                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* ================================================== */}
            {/* Recent Transactions */}
            {/* ================================================== */}

            <div className="mt-6 rounded-3xl border border-black/10 bg-[#f3ffc1]">
              <div className="flex flex-col gap-3 border-b border-black/10 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#526040]">
                    Activity
                  </p>

                  <h2 className="mt-2 text-2xl font-bold text-[#111827]">
                    Recent Transactions
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => navigate("/owner/transactions")}
                  className="flex items-center gap-2 text-sm font-semibold text-[#292727]"
                >
                  View all
                  <ArrowRight size={16} />
                </button>
              </div>

              {dashboard.recentTransactions.length === 0 ? (
                <div className="p-10 text-center text-sm text-[#526040]">
                  No transactions found.
                </div>
              ) : (
                <div className="divide-y divide-black/10">
                  {dashboard.recentTransactions.map((transaction) => {
                    const Icon = getTransactionIcon(transaction.type);

                    return (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between gap-4 p-5 sm:px-8"
                      >
                        <div className="flex min-w-0 items-center gap-4">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#292727] text-white">
                            <Icon size={18} />
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-sm font-bold text-[#111827]">
                              {transaction.customer ||
                                transaction.supplier ||
                                getTransactionLabel(transaction.type)}
                            </p>

                            <p className="mt-1 truncate text-xs text-[#526040]">
                              {transaction.description ||
                                getTransactionLabel(transaction.type)}
                            </p>

                            <p className="mt-1 text-[11px] text-[#667697]">
                              {formatDate(transaction.transactionDate)}
                            </p>
                          </div>
                        </div>

                        <div className="shrink-0 text-right">
                          <p
                            className={`text-sm font-bold ${getTransactionColor(
                              transaction.type,
                            )}`}
                          >
                            {formatCurrency(transaction.amount)}
                          </p>

                          <p className="mt-1 text-[11px] capitalize text-[#667697]">
                            {getTransactionLabel(transaction.type)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* ================================================== */}
            {/* AI Banner */}
            {/* ================================================== */}

            <div className="mt-6 rounded-3xl bg-[#292727] p-7 text-white sm:p-10">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#f3ffc1]">
                    AI Bookkeeping Assistant
                  </p>

                  <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
                    Record transactions
                    <br />
                    without the paperwork.
                  </h2>

                  <p className="mt-3 max-w-xl text-sm leading-6 text-white/60">
                    Describe a transaction in simple language and let AI
                    understand, categorize and record it for you.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => navigate("/transactions/add")}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#f3ffc1] px-5 py-3 text-sm font-bold text-[#292727] transition hover:bg-white"
                >
                  Add Transaction
                  <ArrowRight size={17} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OwnerDashboard;
