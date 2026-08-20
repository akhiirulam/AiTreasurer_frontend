import CashBookHeader from "./components/CashBookHeader";
import CashBookFilters from "./components/CashBookFilters";
import CashBookSummary from "./components/CashBookSummary";
import CashBookAccountCard from "./components/CashBookAccountCard";

import useCashBook from "./hooks/useCashBook";

import { formatPeriodLabel } from "./utils/cashBook.utils";

const CashBook = () => {
  const {
    cashBook,

    loading,

    error,

    from,

    to,

    selectedAccountId,

    setFrom,

    setTo,

    setSelectedAccountId,

    applyFilters,

    resetFilters,

    retry,

    visibleAccounts,

    visibleSummary,

    transactionCount,
  } = useCashBook();

  // =========================================================
  // LOADING
  // =========================================================

  if (loading && !cashBook) {
    return (
      <div className="min-h-screen bg-[#f1ffc4] px-3 py-6 text-[#17213d] sm:px-5 md:px-10">
        <div className="mx-auto max-w-7xl animate-pulse">
          <div className="h-10 w-48 rounded-lg bg-[#dce9a5]" />

          <div className="mt-3 h-5 w-72 rounded bg-[#dce9a5]" />

          <div className="mt-8 h-32 rounded-3xl bg-[#e7f0b9]" />

          <div className="mt-6 h-64 rounded-3xl bg-[#e7f0b9]" />
        </div>
      </div>
    );
  }

  // =========================================================
  // ERROR
  // =========================================================

  if (error && !cashBook) {
    return (
      <div className="min-h-screen bg-[#f1ffc4] px-3 py-6 text-[#17213d] sm:px-5 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-3xl border border-red-200 bg-red-50 p-6">
            <h2 className="text-lg font-black text-red-700">
              Unable to load Cash Book
            </h2>

            <p className="mt-2 text-sm text-red-600">{error}</p>

            <button
              type="button"
              onClick={retry}
              className="mt-4 rounded-xl bg-[#292727] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#181818]"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================
  // NO DATA
  // =========================================================

  if (!cashBook) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#f1ffc4] px-3 py-5 text-[#17213d] sm:px-5 sm:py-6 md:px-10 md:py-8">
      <div className="mx-auto max-w-7xl">
        {/* =====================================================
            HEADER
        ===================================================== */}

        <CashBookHeader
          accountCount={visibleAccounts.length}
          transactionCount={transactionCount}
        />

        {/* =====================================================
            FILTERS
        ===================================================== */}

        <CashBookFilters
          accounts={cashBook.accounts}
          selectedAccountId={selectedAccountId}
          from={from}
          to={to}
          onAccountChange={setSelectedAccountId}
          onFromChange={setFrom}
          onToChange={setTo}
          onApply={applyFilters}
          onReset={resetFilters}
          loading={loading}
        />

        {/* =====================================================
            ERROR AFTER FILTER
        ===================================================== */}

        {error && (
          <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3">
            <p className="text-sm font-bold text-red-600">{error}</p>
          </div>
        )}

        {/* =====================================================
            SUMMARY
        ===================================================== */}

        <CashBookSummary
          opening={visibleSummary.opening}
          receipts={visibleSummary.receipts}
          payments={visibleSummary.payments}
          closing={visibleSummary.closing}
        />

        {/* =====================================================
            PERIOD
        ===================================================== */}

        <div className="mb-5 flex flex-col gap-2 text-sm text-[#667697] sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-4">
            <p className="font-semibold">
              {visibleAccounts.length} account
              {visibleAccounts.length !== 1 ? "s" : ""}
            </p>

            <p className="font-semibold">
              {transactionCount} transaction
              {transactionCount !== 1 ? "s" : ""}
            </p>
          </div>

          <p className="font-semibold">
            {formatPeriodLabel(cashBook.period.from, cashBook.period.to)}
          </p>
        </div>

        {/* =====================================================
            ACCOUNT LIST
        ===================================================== */}

        {visibleAccounts.length === 0 ? (
          <div className="rounded-3xl border border-[#d8e69e] bg-[#faffdf] px-5 py-16 text-center shadow-sm">
            <h2 className="text-xl font-black">No Cash Book Accounts</h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#667697]">
              No cash or bank accounts match your current filters.
            </p>

            <button
              type="button"
              onClick={resetFilters}
              className="mt-5 rounded-xl bg-[#292727] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#181818]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-5">
            {visibleAccounts.map((account) => (
              <CashBookAccountCard key={account.account.id} account={account} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CashBook;
