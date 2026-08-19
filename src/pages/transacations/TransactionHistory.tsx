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
        return "bg-[#e9f7b8] text-[#24345f]";

      case "expense":
      case "purchase":
        return "bg-[#f4dddd] text-[#6d3030]";

      case "payment":
        return "bg-[#e8e4f5] text-[#44386d]";

      case "capital":
        return "bg-[#dce9f5] text-[#294766]";

      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "paid":
      case "completed":
        return "bg-[#e9f7b8] text-[#26385d]";

      case "unpaid":
      case "pending":
        return "bg-[#f4dddd] text-[#713434]";

      case "partial":
        return "bg-[#f5edc9] text-[#665522]";

      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  // ==================================================
  // UI
  // ==================================================

  return (
    <div className="min-h-screen bg-[#f1ffc4] px-3 py-5 text-[#17213d] sm:px-5 sm:py-6 md:px-10 md:py-8">
      {/* ============================================ */}
      {/* HEADER */}
      {/* ============================================ */}

      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.35em] text-[#334b79]">
            Transactions
          </p>

          <h1 className="text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">
            Your transactions.
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#40537b] md:text-base">
            Search, filter and review your business transactions in one place.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/transactions/add")}
          className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#292727] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#181818] sm:w-auto"
        >
          <Plus size={18} />
          Add Transaction
        </button>
      </div>

      {/* ============================================ */}
      {/* FILTER CARD */}
      {/* ============================================ */}

      <form
        onSubmit={handleSubmit}
        className="mb-6 rounded-3xl border border-[#d8e69e] bg-[#f4ffc9] p-5 shadow-sm"
      >
        <div className="mb-5 flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#292727] text-white">
            <Filter size={16} />
          </div>

          <div>
            <h2 className="text-sm font-bold">Find transactions</h2>

            <p className="text-xs text-[#526387]">
              Search and filter your records.
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {/* SEARCH */}

          <div className="xl:col-span-2">
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#526387]">
              Search
            </label>

            <div className="relative">
              <Search
                size={17}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#667697]"
              />

              <input
                type="text"
                value={filters.search}
                onChange={(event) =>
                  handleFilterChange("search", event.target.value)
                }
                placeholder="Search transactions..."
                className="w-full rounded-xl border border-[#d5e29f] bg-[#faffdf] py-3 pl-11 pr-4 text-sm font-medium outline-none transition placeholder:text-[#71809b] focus:border-[#292727]"
              />
            </div>
          </div>

          {/* TYPE */}

          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#526387]">
              Type
            </label>

            <select
              value={filters.type}
              onChange={(event) =>
                handleFilterChange("type", event.target.value)
              }
              className="w-full rounded-xl border border-[#d5e29f] bg-[#faffdf] px-4 py-3 text-sm font-medium outline-none focus:border-[#292727]"
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
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#526387]">
              Status
            </label>

            <select
              value={filters.paymentStatus}
              onChange={(event) =>
                handleFilterChange("paymentStatus", event.target.value)
              }
              className="w-full rounded-xl border border-[#d5e29f] bg-[#faffdf] px-4 py-3 text-sm font-medium outline-none focus:border-[#292727]"
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
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#526387]">
              From
            </label>

            <input
              type="date"
              value={filters.from}
              onChange={(event) =>
                handleFilterChange("from", event.target.value)
              }
              className="w-full rounded-xl border border-[#d5e29f] bg-[#faffdf] px-4 py-3 text-sm font-medium outline-none focus:border-[#292727]"
            />
          </div>

          {/* TO */}

          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#526387]">
              To
            </label>

            <input
              type="date"
              value={filters.to}
              onChange={(event) => handleFilterChange("to", event.target.value)}
              className="w-full rounded-xl border border-[#d5e29f] bg-[#faffdf] px-4 py-3 text-sm font-medium outline-none focus:border-[#292727]"
            />
          </div>
        </div>

        {/* ACTIONS */}

        <div className="mt-5 grid grid-cols-1 gap-3 sm:flex">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#292727] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#181818] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            <Search size={16} />
            Search
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#292727] bg-transparent px-5 py-3 text-sm font-bold text-[#292727] transition hover:bg-[#292727] hover:text-white sm:w-auto"
          >
            <RotateCcw size={16} />
            Reset
          </button>
        </div>
      </form>

      {/* ============================================ */}
      {/* ERROR */}
      {/* ============================================ */}

      {error && (
        <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
          {error}
        </div>
      )}

      {/* ============================================ */}
      {/* TRANSACTIONS CARD */}
      {/* ============================================ */}

      <div className="overflow-hidden rounded-3xl border border-[#d8e69e] bg-[#f4ffc9] shadow-sm">
        {/* TABLE HEADER */}

        <div className="flex flex-col gap-3 border-b border-[#d8e69e] px-4 py-4 sm:px-6 sm:py-5 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-black">Transaction history</h2>

            <p className="mt-1 text-xs text-[#526387]">
              {pagination.total} transaction
              {pagination.total !== 1 ? "s" : ""} found
            </p>
          </div>

          <div className="w-fit rounded-full bg-[#292727] px-3 py-2 text-xs font-bold text-white">
            Page {pagination.page} of {pagination.totalPages || 1}
          </div>
        </div>

        {/* LOADING */}

        {loading ? (
          <div className="flex min-h-[350px] items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <Loader2 size={28} className="animate-spin text-[#292727]" />

              <p className="text-sm font-bold text-[#526387]">
                Loading transactions...
              </p>
            </div>
          </div>
        ) : transactions.length === 0 ? (
          /* EMPTY */

          <div className="flex min-h-[350px] flex-col items-center justify-center px-6 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#292727] text-white">
              <Search size={22} />
            </div>

            <h3 className="text-lg font-black">No transactions found</h3>

            <p className="mt-2 max-w-md text-sm text-[#526387]">
              Try changing your search or filters, or add your first
              transaction.
            </p>

            <button
              type="button"
              onClick={() => navigate("/transactions/add")}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#292727] px-5 py-3 text-sm font-bold text-white"
            >
              <Plus size={16} />
              Add Transaction
            </button>
          </div>
        ) : (
          <>
            {/* DESKTOP TABLE */}

            <div className="hidden overflow-x-auto lg:block">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#d8e69e] text-left">
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#667697]">
                      Date
                    </th>

                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#667697]">
                      Description
                    </th>

                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#667697]">
                      Type
                    </th>

                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#667697]">
                      Status
                    </th>

                    <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-[#667697]">
                      Amount
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {transactions.map((transaction) => (
                    <tr
                      key={transaction._id}
                      className="border-b border-[#dfe9b4] transition last:border-0 hover:bg-[#edfac0]"
                    >
                      {/* DATE */}

                      <td className="whitespace-nowrap px-6 py-5">
                        <span className="text-sm font-bold">
                          {formatDate(transaction.transactionDate)}
                        </span>
                      </td>

                      {/* DESCRIPTION */}

                      <td className="max-w-[420px] px-6 py-5">
                        <div>
                          <p className="truncate text-sm font-bold">
                            {transaction.description}
                          </p>

                          <p className="mt-1 truncate text-xs text-[#657493]">
                            {transaction.customer
                              ? `Customer: ${transaction.customer}`
                              : transaction.category ||
                                `${transaction.debitAccount} → ${transaction.creditAccount}`}
                          </p>
                        </div>
                      </td>

                      {/* TYPE */}

                      <td className="px-6 py-5">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold ${getTypeClass(
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
                          className={`inline-flex rounded-full px-3 py-1.5 text-xs font-bold capitalize ${getStatusClass(
                            transaction.paymentStatus,
                          )}`}
                        >
                          {transaction.paymentStatus}
                        </span>
                      </td>

                      {/* AMOUNT */}

                      <td className="whitespace-nowrap px-6 py-5 text-right">
                        <p className="text-base font-black">
                          {formatCurrency(transaction.amount)}
                        </p>

                        {transaction.outstandingAmount > 0 && (
                          <p className="mt-1 text-xs font-medium text-[#765555]">
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

            {/* MOBILE CARDS */}

            <div className="space-y-3 p-3 sm:p-4 lg:hidden">
              {transactions.map((transaction) => (
                <div
                  key={transaction._id}
                  className="rounded-2xl border border-[#d8e69e] bg-[#faffdf] p-3 sm:p-4"
                >
                  <div className="flex min-w-0 items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-[#667697]">
                        {formatDate(transaction.transactionDate)}
                      </p>

                      <h3 className="mt-2 break-words text-sm font-black">
                        {transaction.description}
                      </h3>
                    </div>

                    <div className="text-right">
                      <p className="text-base font-black">
                        {formatCurrency(transaction.amount)}
                      </p>

                      {transaction.outstandingAmount > 0 && (
                        <p className="mt-1 text-xs text-[#765555]">
                          Outstanding{" "}
                          {formatCurrency(transaction.outstandingAmount)}
                        </p>
                      )}

                      {transaction.type === "payment" &&
                        transaction.supplierOutstanding !== null &&
                        transaction.supplierOutstanding > 0 && (
                          <p className="mt-1 text-xs font-medium text-[#765555]">
                            Remaining payable{" "}
                            {formatCurrency(transaction.supplierOutstanding)}
                          </p>
                        )}
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${getTypeClass(
                        transaction.type,
                      )}`}
                    >
                      {getTypeLabel(transaction.type)}
                    </span>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${getStatusClass(
                        transaction.paymentStatus,
                      )}`}
                    >
                      {transaction.paymentStatus}
                    </span>
                  </div>

                  <div className="mt-1 text-xs text-[#667697]">
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

        {/* ======================================== */}
        {/* PAGINATION */}
        {/* ======================================== */}

        {!loading && transactions.length > 0 && (
          <div className="flex flex-col gap-4 border-t border-[#d8e69e] px-4 py-4 sm:px-6 sm:py-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-center text-xs font-bold text-[#667697] sm:text-left">
              Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
              {Math.min(pagination.page * pagination.limit, pagination.total)}{" "}
              of {pagination.total}
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={!pagination.hasPreviousPage}
                onClick={() => handlePageChange(pagination.page - 1)}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#292727] bg-transparent text-[#292727] transition hover:bg-[#292727] hover:text-white disabled:cursor-not-allowed disabled:border-[#c7d29b] disabled:text-[#aab38c]"
              >
                <ChevronLeft size={17} />
              </button>

              <div className="flex h-10 min-w-10 items-center justify-center rounded-xl bg-[#292727] px-3 text-xs font-bold text-white">
                {pagination.page}
              </div>

              <button
                type="button"
                disabled={!pagination.hasNextPage}
                onClick={() => handlePageChange(pagination.page + 1)}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#292727] bg-transparent text-[#292727] transition hover:bg-[#292727] hover:text-white disabled:cursor-not-allowed disabled:border-[#c7d29b] disabled:text-[#aab38c]"
              >
                <ChevronRight size={17} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;
