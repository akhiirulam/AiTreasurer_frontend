import { useEffect, useState } from "react";
import {
  Search,
  Filter,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Loader2,
  ReceiptText,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import transactionApi from "../../services/transaction.api";

interface Transaction {
  _id: string;
  userId: string;
  rawText: string;
  type: "income" | "expense" | "purchase" | "sale" | "payment" | "capital";
  amount: number;
  description: string;
  category: string | null;
  customer: string | null;
  supplierId: string | null;
  transactionDate: string;
  paymentStatus:
    | "paid"
    | "unpaid"
    | "partial"
    | "unknown"
    | "completed"
    | "pending";
  paidAmount: number;
  outstandingAmount: number;
  debitAccount: string;
  creditAccount: string;
  debitAccountId: string;
  creditAccountId: string;
  supplierName: string | null;
  supplierOutstanding: number | null;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

interface Filters {
  search: string;
  type: string;
  paymentStatus: string;
  from: string;
  to: string;
}

const TransactionHistory = () => {
  const navigate = useNavigate();

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  });

  const [filters, setFilters] = useState<Filters>({
    search: "",
    type: "",
    paymentStatus: "",
    from: "",
    to: "",
  });

  const [appliedFilters, setAppliedFilters] = useState<Filters>({
    search: "",
    type: "",
    paymentStatus: "",
    from: "",
    to: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ==================================================
  // FETCH TRANSACTIONS
  // ==================================================

  const fetchTransactions = async (
    page = 1,
    currentFilters = appliedFilters,
  ) => {
    try {
      setLoading(true);
      setError(null);

      const result = await transactionApi.getTransactionHistory({
        search: currentFilters.search,
        type: currentFilters.type,
        paymentStatus: currentFilters.paymentStatus,
        from: currentFilters.from,
        to: currentFilters.to,
        page,
        limit: pagination.limit,
      });

      if (!result.success) {
        throw new Error(result.message || "Failed to fetch transactions");
      }

      setTransactions(result.data.transactions);
      setPagination(result.data.pagination);
    } catch (err) {
      console.error(err);

      setError(err instanceof Error ? err.message : "Something went wrong");

      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  // ==================================================
  // INITIAL LOAD
  // ==================================================

  useEffect(() => {
    fetchTransactions(1);
  }, []);

  // ==================================================
  // FILTER HANDLERS
  // ==================================================

  const handleFilterChange = (field: keyof Filters, value: string) => {
    setFilters((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleSearch = () => {
    setAppliedFilters(filters);
    fetchTransactions(1, filters);
  };

  const handleReset = () => {
    const emptyFilters: Filters = {
      search: "",
      type: "",
      paymentStatus: "",
      from: "",
      to: "",
    };

    setFilters(emptyFilters);
    setAppliedFilters(emptyFilters);

    fetchTransactions(1, emptyFilters);
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > pagination.totalPages) {
      return;
    }

    fetchTransactions(page, appliedFilters);
  };

  // ==================================================
  // FORM SUBMIT
  // ==================================================

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleSearch();
  };

  // ==================================================
  // FORMATTERS
  // ==================================================

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // ==================================================
  // TYPE HELPERS
  // ==================================================

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "sale":
        return "Sale";
      case "purchase":
        return "Purchase";
      case "expense":
        return "Expense";
      case "income":
        return "Income";
      case "payment":
        return "Payment";
      case "capital":
        return "Capital";
      default:
        return type;
    }
  };

  const getTypeClass = (type: string) => {
    switch (type) {
      case "sale":
      case "income":
        return "bg-[#e4f2de] text-[#173f35]";

      case "expense":
      case "purchase":
        return "bg-[#fbe7e7] text-[#9f3030]";

      case "payment":
        return "bg-[#e8f0ed] text-[#315b50]";

      case "capital":
        return "bg-[#e9eee8] text-[#4c5d53]";

      default:
        return "bg-[#f1f3ef] text-[#68736c]";
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "paid":
      case "completed":
        return "bg-[#e4f2de] text-[#238636]";

      case "unpaid":
      case "pending":
        return "bg-[#fbe7e7] text-[#c43d3d]";

      case "partial":
        return "bg-[#fff4dc] text-[#9a6816]";

      default:
        return "bg-[#f1f3ef] text-[#68736c]";
    }
  };

  // ==================================================
  // UI
  // ==================================================

  return (
    <div className="min-h-screen bg-[#f5f7f2] px-4 py-6 text-[#17231f] sm:px-6 md:px-8 lg:px-10">
      <div className="mx-auto w-full max-w-7xl">
        {/* ==================================================
            HEADER
        ================================================== */}

        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#238636]">
              Bookkeeping
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-[#17231f] sm:text-4xl">
              Transactions
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#68736c] md:text-base">
              Search, filter and review your business transactions in one place.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/transactions/add")}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#173f35] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#102e27] sm:w-auto"
          >
            <Plus size={18} />
            Add Transaction
          </button>
        </div>

        {/* ==================================================
            FILTER CARD
        ================================================== */}

        <form
          onSubmit={handleSubmit}
          className="mb-6 rounded-3xl border border-[#dce5da] bg-white p-5 shadow-sm sm:p-6"
        >
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e4f2de] text-[#173f35]">
              <Filter size={17} />
            </div>

            <div>
              <h2 className="text-sm font-semibold text-[#17231f]">
                Find transactions
              </h2>

              <p className="mt-0.5 text-xs text-[#68736c]">
                Search and filter your records.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {/* SEARCH */}

            <div className="xl:col-span-2">
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#68736c]">
                Search
              </label>

              <div className="relative">
                <Search
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#68736c]"
                />

                <input
                  type="text"
                  value={filters.search}
                  onChange={(event) =>
                    handleFilterChange("search", event.target.value)
                  }
                  placeholder="Search transactions..."
                  className="w-full rounded-xl border border-[#dce5da] bg-[#f9fbf7] py-3 pl-11 pr-4 text-sm text-[#17231f] outline-none transition placeholder:text-[#68736c]/70 focus:border-[#79c267] focus:bg-white focus:ring-4 focus:ring-[#e4f2de]"
                />
              </div>
            </div>

            {/* TYPE */}

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#68736c]">
                Type
              </label>

              <select
                value={filters.type}
                onChange={(event) =>
                  handleFilterChange("type", event.target.value)
                }
                className="w-full rounded-xl border border-[#dce5da] bg-[#f9fbf7] px-4 py-3 text-sm text-[#17231f] outline-none focus:border-[#79c267] focus:ring-4 focus:ring-[#e4f2de]"
              >
                <option value="">All types</option>
                <option value="sale">Sale</option>
                <option value="purchase">Purchase</option>
                <option value="expense">Expense</option>
                <option value="income">Income</option>
                <option value="payment">Payment</option>
                <option value="capital">Capital</option>
              </select>
            </div>

            {/* STATUS */}

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#68736c]">
                Status
              </label>

              <select
                value={filters.paymentStatus}
                onChange={(event) =>
                  handleFilterChange("paymentStatus", event.target.value)
                }
                className="w-full rounded-xl border border-[#dce5da] bg-[#f9fbf7] px-4 py-3 text-sm text-[#17231f] outline-none focus:border-[#79c267] focus:ring-4 focus:ring-[#e4f2de]"
              >
                <option value="">All statuses</option>
                <option value="paid">Paid</option>
                <option value="unpaid">Unpaid</option>
                <option value="partial">Partial</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            {/* FROM */}

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#68736c]">
                From
              </label>

              <input
                type="date"
                value={filters.from}
                onChange={(event) =>
                  handleFilterChange("from", event.target.value)
                }
                className="w-full rounded-xl border border-[#dce5da] bg-[#f9fbf7] px-4 py-3 text-sm text-[#17231f] outline-none focus:border-[#79c267] focus:ring-4 focus:ring-[#e4f2de]"
              />
            </div>

            {/* TO */}

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#68736c]">
                To
              </label>

              <input
                type="date"
                value={filters.to}
                onChange={(event) =>
                  handleFilterChange("to", event.target.value)
                }
                className="w-full rounded-xl border border-[#dce5da] bg-[#f9fbf7] px-4 py-3 text-sm text-[#17231f] outline-none focus:border-[#79c267] focus:ring-4 focus:ring-[#e4f2de]"
              />
            </div>
          </div>

          {/* ACTIONS */}

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#173f35] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#102e27] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              <Search size={16} />
              Search
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#dce5da] bg-white px-5 py-3 text-sm font-semibold text-[#173f35] transition hover:bg-[#f5f7f2] sm:w-auto"
            >
              <RotateCcw size={16} />
              Reset
            </button>
          </div>
        </form>

        {/* ==================================================
            ERROR
        ================================================== */}

        {error && (
          <div className="mb-6 rounded-2xl border border-[#f0caca] bg-[#fbe7e7] px-5 py-4 text-sm font-medium text-[#c43d3d]">
            {error}
          </div>
        )}

        {/* ==================================================
            TRANSACTIONS
        ================================================== */}

        <div className="overflow-hidden rounded-3xl border border-[#dce5da] bg-white shadow-sm">
          {/* HEADER */}

          <div className="flex flex-col gap-3 border-b border-[#dce5da] px-5 py-5 sm:px-6 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <ReceiptText size={19} className="text-[#173f35]" />

                <h2 className="text-xl font-bold text-[#17231f]">
                  Transaction history
                </h2>
              </div>

              <p className="mt-1 text-xs text-[#68736c]">
                {pagination.total} transaction
                {pagination.total !== 1 ? "s" : ""} found
              </p>
            </div>

            <div className="w-fit rounded-full bg-[#e4f2de] px-3 py-2 text-xs font-semibold text-[#173f35]">
              Page {pagination.page} of {pagination.totalPages || 1}
            </div>
          </div>

          {/* LOADING */}

          {loading ? (
            <div className="flex min-h-[350px] items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <Loader2 size={28} className="animate-spin text-[#173f35]" />

                <p className="text-sm font-medium text-[#68736c]">
                  Loading transactions...
                </p>
              </div>
            </div>
          ) : transactions.length === 0 ? (
            /* EMPTY */

            <div className="flex min-h-[350px] flex-col items-center justify-center px-6 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e4f2de] text-[#173f35]">
                <ReceiptText size={22} />
              </div>

              <h3 className="text-lg font-bold text-[#17231f]">
                No transactions found
              </h3>

              <p className="mt-2 max-w-md text-sm leading-6 text-[#68736c]">
                Try changing your search or filters, or add your first
                transaction.
              </p>

              <button
                type="button"
                onClick={() => navigate("/transactions/add")}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#173f35] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#102e27]"
              >
                <Plus size={16} />
                Add Transaction
              </button>
            </div>
          ) : (
            <>
              {/* ==================================================
                  DESKTOP TABLE
              ================================================== */}

              <div className="hidden overflow-x-auto lg:block">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#dce5da] text-left">
                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#68736c]">
                        Date
                      </th>

                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#68736c]">
                        Description
                      </th>

                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#68736c]">
                        Type
                      </th>

                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#68736c]">
                        Status
                      </th>

                      <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-[#68736c]">
                        Amount
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {transactions.map((transaction) => (
                      <tr
                        key={transaction._id}
                        className="border-b border-[#edf1eb] transition last:border-0 hover:bg-[#f9fbf7]"
                      >
                        {/* DATE */}

                        <td className="whitespace-nowrap px-6 py-5">
                          <span className="text-sm font-medium text-[#17231f]">
                            {formatDate(transaction.transactionDate)}
                          </span>
                        </td>

                        {/* DESCRIPTION */}

                        <td className="max-w-[420px] px-6 py-5">
                          <div>
                            <p className="truncate text-sm font-semibold text-[#17231f]">
                              {transaction.description}
                            </p>

                            <p className="mt-1 truncate text-xs text-[#68736c]">
                              {transaction.customer
                                ? `Customer: ${transaction.customer}`
                                : transaction.supplierName
                                  ? `Supplier: ${transaction.supplierName}`
                                  : transaction.category ||
                                    `${transaction.debitAccount} → ${transaction.creditAccount}`}
                            </p>
                          </div>
                        </td>

                        {/* TYPE */}

                        <td className="px-6 py-5">
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold ${getTypeClass(
                              transaction.type,
                            )}`}
                          >
                            {transaction.type === "sale" ||
                            transaction.type === "income" ? (
                              <ArrowUpRight size={13} />
                            ) : (
                              <ArrowDownRight size={13} />
                            )}

                            {getTypeLabel(transaction.type)}
                          </span>
                        </td>

                        {/* STATUS */}

                        <td className="px-6 py-5">
                          <span
                            className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold capitalize ${getStatusClass(
                              transaction.paymentStatus,
                            )}`}
                          >
                            {transaction.paymentStatus}
                          </span>
                        </td>

                        {/* AMOUNT */}

                        <td className="whitespace-nowrap px-6 py-5 text-right">
                          <p className="font-financial text-base font-semibold text-[#17231f]">
                            {formatCurrency(transaction.amount)}
                          </p>

                          {transaction.outstandingAmount > 0 && (
                            <p className="mt-1 text-xs font-medium text-[#b7791f]">
                              Outstanding{" "}
                              {formatCurrency(transaction.outstandingAmount)}
                            </p>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* ==================================================
                  MOBILE CARDS
              ================================================== */}

              <div className="space-y-3 p-3 sm:p-4 lg:hidden">
                {transactions.map((transaction) => (
                  <div
                    key={transaction._id}
                    className="rounded-2xl border border-[#dce5da] bg-[#f9fbf7] p-4"
                  >
                    <div className="flex min-w-0 items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-[#68736c]">
                          {formatDate(transaction.transactionDate)}
                        </p>

                        <h3 className="mt-2 break-words text-sm font-semibold text-[#17231f]">
                          {transaction.description}
                        </h3>
                      </div>

                      <div className="text-right">
                        <p className="font-financial text-base font-semibold text-[#17231f]">
                          {formatCurrency(transaction.amount)}
                        </p>

                        {transaction.outstandingAmount > 0 && (
                          <p className="mt-1 text-xs text-[#b7791f]">
                            Outstanding{" "}
                            {formatCurrency(transaction.outstandingAmount)}
                          </p>
                        )}

                        {transaction.type === "payment" &&
                          transaction.supplierOutstanding !== null &&
                          transaction.supplierOutstanding > 0 && (
                            <p className="mt-1 text-xs text-[#b7791f]">
                              Remaining payable{" "}
                              {formatCurrency(transaction.supplierOutstanding)}
                            </p>
                          )}
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${getTypeClass(
                          transaction.type,
                        )}`}
                      >
                        {transaction.type === "sale" ||
                        transaction.type === "income" ? (
                          <ArrowUpRight size={12} />
                        ) : (
                          <ArrowDownRight size={12} />
                        )}

                        {getTypeLabel(transaction.type)}
                      </span>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${getStatusClass(
                          transaction.paymentStatus,
                        )}`}
                      >
                        {transaction.paymentStatus}
                      </span>
                    </div>

                    <div className="mt-3 text-xs text-[#68736c]">
                      {transaction.customer ? (
                        <>Customer: {transaction.customer}</>
                      ) : transaction.supplierName ? (
                        <>Supplier: {transaction.supplierName}</>
                      ) : (
                        transaction.category ||
                        `${transaction.debitAccount} → ${transaction.creditAccount}`
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ==================================================
              PAGINATION
          ================================================== */}

          {!loading && transactions.length > 0 && (
            <div className="flex flex-col gap-4 border-t border-[#dce5da] px-4 py-4 sm:px-6 sm:py-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-center text-xs font-medium text-[#68736c] sm:text-left">
                Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
                {Math.min(pagination.page * pagination.limit, pagination.total)}{" "}
                of {pagination.total}
              </p>

              <div className="flex items-center justify-center gap-2">
                <button
                  type="button"
                  disabled={!pagination.hasPreviousPage}
                  onClick={() => handlePageChange(pagination.page - 1)}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#dce5da] bg-white text-[#173f35] transition hover:bg-[#e4f2de] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft size={17} />
                </button>

                <div className="flex h-10 min-w-10 items-center justify-center rounded-xl bg-[#173f35] px-3 text-xs font-semibold text-white">
                  {pagination.page}
                </div>

                <button
                  type="button"
                  disabled={!pagination.hasNextPage}
                  onClick={() => handlePageChange(pagination.page + 1)}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#dce5da] bg-white text-[#173f35] transition hover:bg-[#e4f2de] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronRight size={17} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
