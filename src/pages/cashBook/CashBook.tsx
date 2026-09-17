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
      <div className="min-h-screen bg-[#f5f7f2] px-4 py-6 text-[#17231f] sm:px-6 md:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl animate-pulse">
          <div className="h-4 w-28 rounded bg-[#dce5da]" />

          <div className="mt-4 h-10 w-56 rounded-xl bg-[#dce5da]" />

          <div className="mt-3 h-5 w-80 max-w-full rounded bg-[#dce5da]" />

          <div className="mt-8 h-32 rounded-3xl bg-white" />

          <div className="mt-6 h-64 rounded-3xl bg-white" />
        </div>
      </div>
    );
  }

  // =========================================================
  // ERROR
  // =========================================================

  if (error && !cashBook) {
    return (
      <div className="min-h-screen bg-[#f5f7f2] px-4 py-6 text-[#17231f] sm:px-6 md:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-3xl border border-[#f0caca] bg-white p-6 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#fbe8e8] text-[#c43d3d]">
              !
            </div>

            <h2 className="mt-4 text-lg font-bold text-[#17231f]">
              Unable to load Cash Book
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#68736c]">{error}</p>

            <button
              type="button"
              onClick={retry}
              className="mt-5 rounded-xl bg-[#173f35] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#102e27]"
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
    <div className="min-h-screen w-full bg-[#f5f7f2] px-4 py-6 text-[#17231f] sm:px-6 md:px-8 lg:px-10">
      <div className="mx-auto w-full max-w-7xl">
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
          <div className="mb-5 rounded-2xl border border-[#f0caca] bg-[#fbe8e8] px-4 py-3">
            <p className="text-sm font-semibold text-[#c43d3d]">{error}</p>
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

        <div className="mb-5 flex flex-col gap-2 text-sm text-[#68736c] sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-4">
            <p className="font-semibold">
              <span className="font-financial">{visibleAccounts.length}</span>{" "}
              account
              {visibleAccounts.length !== 1 ? "s" : ""}
            </p>

            <p className="font-semibold">
              <span className="font-financial">{transactionCount}</span>{" "}
              transaction
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
          <div className="rounded-3xl border border-[#dce5da] bg-white px-5 py-20 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e4f2de] text-[#173f35]">
              <span className="text-lg font-bold">₹</span>
            </div>

            <h2 className="mt-5 text-xl font-bold text-[#17231f]">
              No Cash Book Accounts
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#68736c]">
              No cash or bank accounts match your current filters.
            </p>

            <button
              type="button"
              onClick={resetFilters}
              className="mt-5 rounded-xl bg-[#173f35] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#102e27]"
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
