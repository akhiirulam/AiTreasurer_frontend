import {
  ArrowDownRight,
  ArrowUpRight,
  ArrowRight,
  CreditCard,
  IndianRupee,
  Plus,
  Receipt,
  Users,
  Wallet,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const OwnerDashboard = () => {
  const navigate = useNavigate();

  const summaryCards = [
    {
      title: "Income",
      value: "₹85,400",
      change: "+12.5%",
      icon: ArrowUpRight,
    },
    {
      title: "Expenses",
      value: "₹42,300",
      change: "-8.2%",
      icon: ArrowDownRight,
    },
    {
      title: "Balance",
      value: "₹43,100",
      change: "+18.4%",
      icon: Wallet,
    },
    {
      title: "Receivables",
      value: "₹18,500",
      change: "12 pending",
      icon: CreditCard,
    },
  ];

  const transactions = [
    {
      name: "Raju Traders",
      description: "Product sale",
      amount: "+₹2,500",
      type: "income",
    },
    {
      name: "ABC Suppliers",
      description: "Stock purchase",
      amount: "-₹1,200",
      type: "expense",
    },
    {
      name: "Office Rent",
      description: "Monthly rent",
      amount: "-₹15,000",
      type: "expense",
    },
    {
      name: "Anil",
      description: "Customer payment",
      amount: "+₹5,000",
      type: "income",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f3ffc1] px-4 py-8 sm:px-6 lg:px-10 w-full">
      <div className="w-full">
        {/* Header */}
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

        {/* Summary */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {summaryCards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.title}
                className="rounded-3xl border border-black/10 bg-[#f3ffc1] p-6"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-[#526040]">
                      {card.title}
                    </p>

                    <h2 className="mt-3 text-3xl font-bold text-[#111827]">
                      {card.value}
                    </h2>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#292727] text-white">
                    <Icon size={19} />
                  </div>
                </div>

                <p className="mt-6 text-xs font-semibold text-[#43506b]">
                  {card.change}
                </p>
              </div>
            );
          })}
        </div>

        {/* Main Grid */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Chart */}
          <div className="rounded-3xl border border-black/10 bg-[#f3ffc1] p-6 sm:p-8 lg:col-span-2">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#526040]">
                  Overview
                </p>

                <h2 className="mt-2 text-2xl font-bold">Income & Expenses</h2>
              </div>

              <select className="rounded-lg border border-black/10 bg-transparent px-3 py-2 text-sm outline-none">
                <option>This Month</option>
                <option>This Week</option>
                <option>This Year</option>
              </select>
            </div>

            {/* Chart */}
            <div className="mt-10 flex h-64 items-end gap-2 border-b border-black/10 px-2 sm:gap-4">
              {[45, 65, 50, 75, 60, 85, 70, 95, 65, 80, 72, 90].map(
                (height, index) => (
                  <div key={index} className="flex h-full flex-1 items-end">
                    <div
                      style={{ height: `${height}%` }}
                      className="w-full rounded-t-lg bg-[#292727] transition hover:bg-black"
                    />
                  </div>
                ),
              )}
            </div>

            <div className="mt-4 flex justify-between text-xs text-[#526040]">
              <span>Aug 01</span>
              <span>Aug 07</span>
              <span>Aug 14</span>
              <span>Aug 21</span>
              <span>Aug 31</span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="rounded-3xl bg-[#292727] p-6 text-white sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f3ffc1]">
              Quick Actions
            </p>

            <h2 className="mt-3 text-2xl font-bold">Manage your business.</h2>

            <div className="mt-8 space-y-3">
              <button
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
                onClick={() => navigate("/owner/customers")}
                className="flex w-full items-center justify-between rounded-xl border border-white/20 px-4 py-4 text-left transition hover:bg-white/10"
              >
                <span className="flex items-center gap-3 text-sm font-semibold">
                  <Users size={19} />
                  Add Customer
                </span>

                <ArrowRight size={18} />
              </button>

              <button className="flex w-full items-center justify-between rounded-xl border border-white/20 px-4 py-4 text-left transition hover:bg-white/10">
                <span className="flex items-center gap-3 text-sm font-semibold">
                  <IndianRupee size={19} />
                  Record Payment
                </span>

                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="mt-6 rounded-3xl border border-black/10 bg-[#f3ffc1]">
          <div className="flex flex-col gap-3 border-b border-black/10 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#526040]">
                Activity
              </p>

              <h2 className="mt-2 text-2xl font-bold">Recent Transactions</h2>
            </div>

            <button
              onClick={() => navigate("/owner/transactions")}
              className="flex items-center gap-2 text-sm font-semibold"
            >
              View all
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="divide-y divide-black/10">
            {transactions.map((transaction, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-4 p-5 sm:px-8"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#292727] text-white">
                    {transaction.type === "income" ? (
                      <ArrowUpRight size={18} />
                    ) : (
                      <ArrowDownRight size={18} />
                    )}
                  </div>

                  <div>
                    <p className="text-sm font-bold">{transaction.name}</p>

                    <p className="mt-1 text-xs text-[#526040]">
                      {transaction.description}
                    </p>
                  </div>
                </div>

                <p
                  className={`text-sm font-bold ${
                    transaction.type === "income"
                      ? "text-[#17233d]"
                      : "text-[#292727]"
                  }`}
                >
                  {transaction.amount}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* AI Banner */}
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
                Send a simple message through WhatsApp and let AI understand,
                categorize and record your business transaction.
              </p>
            </div>

            <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#f3ffc1] px-5 py-3 text-sm font-bold text-[#292727] transition hover:bg-white">
              Open AI Assistant
              <ArrowRight size={17} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;
