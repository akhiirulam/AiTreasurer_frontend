import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  CreditCard,
  FileBarChart,
  IndianRupee,
  Plus,
  Receipt,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import useDashboard from "../hooks/useDashboard";

const OwnerDashboard = () => {
  const navigate = useNavigate();

  const { dashboard, loading, error } = useDashboard();

  // ============================================================
  // Helpers
  // ============================================================

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
    switch (type) {
      case "sale":
        return ArrowUpRight;

      case "income":
        return ArrowUpRight;

      case "payment":
        return ArrowUpRight;

      case "purchase":
        return ArrowDownRight;

      case "expense":
        return ArrowDownRight;

      case "capital":
        return Wallet;

      default:
        return Receipt;
    }
  };

  const isPositiveTransaction = (type: string) => {
    return (
      type === "sale" ||
      type === "income" ||
      type === "payment" ||
      type === "capital"
    );
  };

  // ============================================================
  // Loading
  // ============================================================

  if (loading && !dashboard) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F5F7F2]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#E4F2DE] border-t-[#173F35]" />

          <p className="text-sm font-medium text-[#68736C]">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  // ============================================================
  // Dashboard
  // ============================================================

  return (
    <div className="min-h-screen w-full bg-[#F5F7F2] px-4 py-6 sm:px-6 lg:px-8 xl:px-10">
      <div className="mx-auto w-full max-w-[1600px]">
        {/* ================================================== */}
        {/* Header */}
        {/* ================================================== */}

        <header className="mb-7">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#79C267]" />

                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#68736C]">
                  Owner Dashboard
                </p>
              </div>

              <h1 className="text-3xl font-semibold tracking-tight text-[#17231F] sm:text-4xl">
                Business overview
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#68736C]">
                Monitor your business performance, transactions, cash flow and
                outstanding balances from one place.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate("/transactions/add")}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#173F35] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#102E27] focus:outline-none focus:ring-2 focus:ring-[#79C267] focus:ring-offset-2"
            >
              <Plus size={18} strokeWidth={2.2} />
              Add Transaction
            </button>
          </div>
        </header>

        {/* ================================================== */}
        {/* Error */}
        {/* ================================================== */}

        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-5 py-4">
            <div className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-[#C43D3D]" />

            <div>
              <p className="text-sm font-semibold text-[#C43D3D]">
                Unable to load dashboard
              </p>

              <p className="mt-1 text-sm text-red-700">{error}</p>
            </div>
          </div>
        )}

        {dashboard && (
          <>
            {/* ================================================== */}
            {/* Main Financial Summary */}
            {/* ================================================== */}

            <section>
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#68736C]">
                    Financial Summary
                  </p>
                </div>

                {loading && (
                  <span className="text-xs font-medium text-[#68736C]">
                    Updating...
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {/* Income */}

                <div className="rounded-2xl border border-[#DCE5DA] bg-white p-5 shadow-[0_1px_2px_rgba(23,63,53,0.04)] transition hover:-translate-y-0.5 hover:shadow-md">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-[#68736C]">
                        Income
                      </p>

                      <p className="mt-3 font-financial text-2xl font-semibold tracking-tight text-[#173F35]">
                        {formatCurrency(dashboard.summary.totalIncome)}
                      </p>
                    </div>

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E4F2DE] text-[#173F35]">
                      <ArrowUpRight size={19} strokeWidth={2} />
                    </div>
                  </div>

                  <div className="mt-5 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#79C267]" />

                    <p className="text-xs text-[#68736C]">
                      Total business income
                    </p>
                  </div>
                </div>

                {/* Expenses */}

                <div className="rounded-2xl border border-[#DCE5DA] bg-white p-5 shadow-[0_1px_2px_rgba(23,63,53,0.04)] transition hover:-translate-y-0.5 hover:shadow-md">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-[#68736C]">
                        Expenses
                      </p>

                      <p className="mt-3 font-financial text-2xl font-semibold tracking-tight text-[#17231F]">
                        {formatCurrency(dashboard.summary.totalExpenses)}
                      </p>
                    </div>

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F5F7F2] text-[#68736C]">
                      <ArrowDownRight size={19} strokeWidth={2} />
                    </div>
                  </div>

                  <div className="mt-5 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#B7791F]" />

                    <p className="text-xs text-[#68736C]">
                      Total business expenses
                    </p>
                  </div>
                </div>

                {/* Net Profit */}

                <div className="rounded-2xl border border-[#173F35] bg-[#173F35] p-5 shadow-[0_1px_2px_rgba(23,63,53,0.08)] transition hover:-translate-y-0.5 hover:bg-[#102E27] hover:shadow-md">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-white/65">
                        Net Profit
                      </p>

                      <p className="mt-3 font-financial text-2xl font-semibold tracking-tight text-white">
                        {formatCurrency(dashboard.summary.netProfit)}
                      </p>
                    </div>

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-[#79C267]">
                      <TrendingUp size={19} strokeWidth={2} />
                    </div>
                  </div>

                  <div className="mt-5 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#79C267]" />

                    <p className="text-xs text-white/60">
                      Income minus expenses
                    </p>
                  </div>
                </div>

                {/* Cash & Bank */}

                <div className="rounded-2xl border border-[#DCE5DA] bg-white p-5 shadow-[0_1px_2px_rgba(23,63,53,0.04)] transition hover:-translate-y-0.5 hover:shadow-md">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-[#68736C]">
                        Cash & Bank
                      </p>

                      <p className="mt-3 font-financial text-2xl font-semibold tracking-tight text-[#173F35]">
                        {formatCurrency(dashboard.summary.cashBankBalance)}
                      </p>
                    </div>

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E4F2DE] text-[#173F35]">
                      <Wallet size={19} strokeWidth={2} />
                    </div>
                  </div>

                  <div className="mt-5 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#79C267]" />

                    <p className="text-xs text-[#68736C]">
                      Current cash and bank movement
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* ================================================== */}
            {/* Business Overview */}
            {/* ================================================== */}

            <section className="mt-7">
              <div className="mb-3">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#68736C]">
                  Business Overview
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {/* Sales */}

                <button
                  type="button"
                  onClick={() => navigate("/owner/sales")}
                  className="group rounded-2xl border border-[#DCE5DA] bg-white p-5 text-left shadow-[0_1px_2px_rgba(23,63,53,0.04)] transition hover:-translate-y-0.5 hover:border-[#79C267] hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E4F2DE] text-[#173F35]">
                      <Receipt size={19} strokeWidth={2} />
                    </div>

                    <ArrowRight
                      size={17}
                      className="text-[#A0AAA3] transition group-hover:translate-x-1 group-hover:text-[#173F35]"
                    />
                  </div>

                  <p className="mt-5 text-sm font-medium text-[#68736C]">
                    Sales
                  </p>

                  <p className="mt-1 font-financial text-xl font-semibold text-[#17231F]">
                    {formatCurrency(dashboard.business.totalSales)}
                  </p>

                  <p className="mt-3 text-xs text-[#68736C]">
                    View sales report
                  </p>
                </button>

                {/* Purchases */}

                <button
                  type="button"
                  onClick={() => navigate("/owner/purchases")}
                  className="group rounded-2xl border border-[#DCE5DA] bg-white p-5 text-left shadow-[0_1px_2px_rgba(23,63,53,0.04)] transition hover:-translate-y-0.5 hover:border-[#79C267] hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F5F7F2] text-[#68736C]">
                      <CreditCard size={19} strokeWidth={2} />
                    </div>

                    <ArrowRight
                      size={17}
                      className="text-[#A0AAA3] transition group-hover:translate-x-1 group-hover:text-[#173F35]"
                    />
                  </div>

                  <p className="mt-5 text-sm font-medium text-[#68736C]">
                    Purchases
                  </p>

                  <p className="mt-1 font-financial text-xl font-semibold text-[#17231F]">
                    {formatCurrency(dashboard.business.totalPurchases)}
                  </p>

                  <p className="mt-3 text-xs text-[#68736C]">
                    View purchase report
                  </p>
                </button>

                {/* Receivables */}

                <button
                  type="button"
                  onClick={() => navigate("/owner/customers")}
                  className="group rounded-2xl border border-[#DCE5DA] bg-white p-5 text-left shadow-[0_1px_2px_rgba(23,63,53,0.04)] transition hover:-translate-y-0.5 hover:border-[#79C267] hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E4F2DE] text-[#173F35]">
                      <Users size={19} strokeWidth={2} />
                    </div>

                    <ArrowRight
                      size={17}
                      className="text-[#A0AAA3] transition group-hover:translate-x-1 group-hover:text-[#173F35]"
                    />
                  </div>

                  <p className="mt-5 text-sm font-medium text-[#68736C]">
                    Receivables
                  </p>

                  <p className="mt-1 font-financial text-xl font-semibold text-[#17231F]">
                    {formatCurrency(dashboard.business.totalReceivables)}
                  </p>

                  <p className="mt-3 text-xs text-[#68736C]">
                    Customer outstanding
                  </p>
                </button>

                {/* Payables */}

                <button
                  type="button"
                  onClick={() => navigate("/owner/suppliers")}
                  className="group rounded-2xl border border-[#DCE5DA] bg-white p-5 text-left shadow-[0_1px_2px_rgba(23,63,53,0.04)] transition hover:-translate-y-0.5 hover:border-[#79C267] hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F5F7F2] text-[#68736C]">
                      <IndianRupee size={19} strokeWidth={2} />
                    </div>

                    <ArrowRight
                      size={17}
                      className="text-[#A0AAA3] transition group-hover:translate-x-1 group-hover:text-[#173F35]"
                    />
                  </div>

                  <p className="mt-5 text-sm font-medium text-[#68736C]">
                    Payables
                  </p>

                  <p className="mt-1 font-financial text-xl font-semibold text-[#17231F]">
                    {formatCurrency(dashboard.business.totalPayables)}
                  </p>

                  <p className="mt-3 text-xs text-[#68736C]">
                    Supplier outstanding
                  </p>
                </button>
              </div>
            </section>

            {/* ================================================== */}
            {/* Main Dashboard Grid */}
            {/* ================================================== */}

            <div className="mt-7 grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* ================================================== */}
              {/* Financial Overview */}
              {/* ================================================== */}

              <section className="rounded-2xl border border-[#DCE5DA] bg-white p-6 shadow-[0_1px_2px_rgba(23,63,53,0.04)] sm:p-7 lg:col-span-2">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#68736C]">
                      Overview
                    </p>

                    <h2 className="mt-2 text-xl font-semibold tracking-tight text-[#17231F]">
                      Financial performance
                    </h2>

                    <p className="mt-1 text-sm text-[#68736C]">
                      A quick view of your income, expenses and profit.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => navigate("/owner/reports")}
                    className="inline-flex items-center gap-2 self-start rounded-lg px-3 py-2 text-sm font-semibold text-[#173F35] transition hover:bg-[#E4F2DE]"
                  >
                    View Reports
                    <ArrowRight size={16} />
                  </button>
                </div>

                {/* Income / Expenses */}

                <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-[#DCE5DA] bg-[#F5F7F2] p-5">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-[#68736C]">
                        Income
                      </p>

                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E4F2DE] text-[#173F35]">
                        <ArrowUpRight size={16} />
                      </div>
                    </div>

                    <p className="mt-4 font-financial text-2xl font-semibold text-[#173F35]">
                      {formatCurrency(dashboard.summary.totalIncome)}
                    </p>

                    <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[#DCE5DA]">
                      <div className="h-full w-full rounded-full bg-[#79C267]" />
                    </div>
                  </div>

                  <div className="rounded-xl border border-[#DCE5DA] bg-[#F5F7F2] p-5">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-[#68736C]">
                        Expenses
                      </p>

                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-[#68736C]">
                        <ArrowDownRight size={16} />
                      </div>
                    </div>

                    <p className="mt-4 font-financial text-2xl font-semibold text-[#17231F]">
                      {formatCurrency(dashboard.summary.totalExpenses)}
                    </p>

                    <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[#DCE5DA]">
                      <div className="h-full w-full rounded-full bg-[#B7791F]" />
                    </div>
                  </div>
                </div>

                {/* Profit */}

                <div className="mt-4 rounded-xl bg-[#173F35] p-5">
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-medium text-white/60">
                        Net Profit
                      </p>

                      <p className="mt-2 font-financial text-3xl font-semibold tracking-tight text-white">
                        {formatCurrency(dashboard.summary.netProfit)}
                      </p>

                      <p className="mt-2 text-xs text-white/50">
                        Income minus total expenses
                      </p>
                    </div>

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#79C267]/15 text-[#79C267]">
                      <TrendingUp size={22} />
                    </div>
                  </div>
                </div>
              </section>

              {/* ================================================== */}
              {/* Quick Actions */}
              {/* ================================================== */}

              <section className="rounded-2xl bg-[#173F35] p-6 text-white shadow-[0_1px_2px_rgba(23,63,53,0.08)] sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#79C267]">
                  Quick Actions
                </p>

                <h2 className="mt-2 text-xl font-semibold tracking-tight">
                  Manage your business
                </h2>

                <p className="mt-2 text-sm leading-6 text-white/55">
                  Jump directly to the tools you use most.
                </p>

                <div className="mt-6 space-y-2.5">
                  {/* Add Transaction */}

                  <button
                    type="button"
                    onClick={() => navigate("/transactions/add")}
                    className="group flex w-full items-center justify-between rounded-xl bg-white px-4 py-3.5 text-left text-[#173F35] transition hover:bg-[#E4F2DE]"
                  >
                    <span className="flex items-center gap-3 text-sm font-semibold">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E4F2DE]">
                        <Plus size={17} />
                      </span>
                      Add Transaction
                    </span>

                    <ArrowRight
                      size={17}
                      className="transition group-hover:translate-x-1"
                    />
                  </button>

                  {/* Customers */}

                  <button
                    type="button"
                    onClick={() => navigate("/owner/customers")}
                    className="group flex w-full items-center justify-between rounded-xl border border-white/10 px-4 py-3.5 text-left transition hover:bg-white/10"
                  >
                    <span className="flex items-center gap-3 text-sm font-semibold">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                        <Users size={17} />
                      </span>
                      Customers
                    </span>

                    <ArrowRight
                      size={17}
                      className="text-white/50 transition group-hover:translate-x-1 group-hover:text-white"
                    />
                  </button>

                  {/* Suppliers */}

                  <button
                    type="button"
                    onClick={() => navigate("/owner/suppliers")}
                    className="group flex w-full items-center justify-between rounded-xl border border-white/10 px-4 py-3.5 text-left transition hover:bg-white/10"
                  >
                    <span className="flex items-center gap-3 text-sm font-semibold">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                        <CreditCard size={17} />
                      </span>
                      Suppliers
                    </span>

                    <ArrowRight
                      size={17}
                      className="text-white/50 transition group-hover:translate-x-1 group-hover:text-white"
                    />
                  </button>

                  {/* Reports */}

                  <button
                    type="button"
                    onClick={() => navigate("/owner/reports")}
                    className="group flex w-full items-center justify-between rounded-xl border border-white/10 px-4 py-3.5 text-left transition hover:bg-white/10"
                  >
                    <span className="flex items-center gap-3 text-sm font-semibold">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                        <FileBarChart size={17} />
                      </span>
                      Reports
                    </span>

                    <ArrowRight
                      size={17}
                      className="text-white/50 transition group-hover:translate-x-1 group-hover:text-white"
                    />
                  </button>
                </div>
              </section>
            </div>

            {/* ================================================== */}
            {/* Recent Transactions */}
            {/* ================================================== */}

            <section className="mt-7 overflow-hidden rounded-2xl border border-[#DCE5DA] bg-white shadow-[0_1px_2px_rgba(23,63,53,0.04)]">
              <div className="flex flex-col gap-3 border-b border-[#DCE5DA] p-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#68736C]">
                    Activity
                  </p>

                  <h2 className="mt-1.5 text-xl font-semibold tracking-tight text-[#17231F]">
                    Recent Transactions
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => navigate("/owner/transactions")}
                  className="inline-flex items-center gap-2 self-start rounded-lg px-3 py-2 text-sm font-semibold text-[#173F35] transition hover:bg-[#E4F2DE]"
                >
                  View all
                  <ArrowRight size={16} />
                </button>
              </div>

              {dashboard.recentTransactions.length === 0 ? (
                <div className="px-6 py-14 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#E4F2DE] text-[#173F35]">
                    <Receipt size={21} />
                  </div>

                  <p className="mt-4 text-sm font-semibold text-[#17231F]">
                    No transactions yet
                  </p>

                  <p className="mt-1 text-sm text-[#68736C]">
                    Add your first transaction to start tracking your business.
                  </p>

                  <button
                    type="button"
                    onClick={() => navigate("/transactions/add")}
                    className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#173F35] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#102E27]"
                  >
                    <Plus size={16} />
                    Add Transaction
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-[#DCE5DA]">
                  {dashboard.recentTransactions.map((transaction) => {
                    const Icon = getTransactionIcon(transaction.type);
                    const positive = isPositiveTransaction(transaction.type);

                    return (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between gap-4 px-5 py-4 transition hover:bg-[#F5F7F2] sm:px-6"
                      >
                        {/* Left */}

                        <div className="flex min-w-0 items-center gap-3.5">
                          <div
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                              positive
                                ? "bg-[#E4F2DE] text-[#173F35]"
                                : "bg-[#F5F7F2] text-[#68736C]"
                            }`}
                          >
                            <Icon size={18} strokeWidth={2} />
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-[#17231F]">
                              {transaction.customer ||
                                transaction.supplier ||
                                getTransactionLabel(transaction.type)}
                            </p>

                            <p className="mt-0.5 truncate text-xs text-[#68736C]">
                              {transaction.description ||
                                getTransactionLabel(transaction.type)}
                            </p>

                            <p className="mt-1 text-[11px] text-[#9AA49D]">
                              {formatDate(transaction.transactionDate)}
                            </p>
                          </div>
                        </div>

                        {/* Right */}

                        <div className="shrink-0 text-right">
                          <p
                            className={`font-financial text-sm font-semibold ${
                              positive ? "text-[#238636]" : "text-[#C43D3D]"
                            }`}
                          >
                            {positive ? "+" : "-"}
                            {formatCurrency(transaction.amount).replace(
                              "₹-",
                              "₹",
                            )}
                          </p>

                          <p className="mt-1 text-[11px] font-medium text-[#9AA49D]">
                            {getTransactionLabel(transaction.type)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>

            {/* ================================================== */}
            {/* AI Assistant Banner */}
            {/* ================================================== */}

            <section className="mt-7 overflow-hidden rounded-2xl bg-[#102E27] p-6 text-white shadow-[0_1px_2px_rgba(23,63,53,0.08)] sm:p-8">
              <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#79C267]/20 bg-[#79C267]/10 px-3 py-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#79C267]" />

                    <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#79C267]">
                      AI Bookkeeping Assistant
                    </p>
                  </div>

                  <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
                    Smarter bookkeeping,
                    <br className="hidden sm:block" /> less manual work.
                  </h2>

                  <p className="mt-3 max-w-xl text-sm leading-6 text-white/55">
                    Describe your business transaction in simple language and
                    let AiTreasurer understand and categorize it for you.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => navigate("/transactions/add")}
                  className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#79C267] px-5 text-sm font-semibold text-[#102E27] transition hover:bg-[#8BD27A]"
                >
                  Add Transaction
                  <ArrowRight size={17} />
                </button>
              </div>
            </section>

            {/* ================================================== */}
            {/* Footer spacing */}
            {/* ================================================== */}

            <div className="h-4" />
          </>
        )}
      </div>
    </div>
  );
};

export default OwnerDashboard;
