import { useState } from "react";

import PurchasesHeader from "./components/PurchasesHeader";
import PurchasesFilters from "./components/PurchasesFilters";
import PurchasesSummary from "./components/PurchasesSummary";
import PurchasesTable from "./components/PurchasesTable";

import usePurchases from "./hooks/usePurchases";

const Purchases = () => {
  const [fromDate, setFromDate] = useState<string | undefined>();
  const [toDate, setToDate] = useState<string | undefined>();

  const { purchases, loading, error, fetchPurchases } = usePurchases();

  const handleApplyFilters = async (from?: string, to?: string) => {
    setFromDate(from);
    setToDate(to);

    await fetchPurchases(from, to);
  };

  return (
    <div className="min-h-screen bg-[#f8f9f1]">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <PurchasesHeader />

        {/* Filters */}
        <div className="mt-6">
          <PurchasesFilters onApply={handleApplyFilters} loading={loading} />
        </div>

        {/* Error */}
        {error && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4">
            <p className="text-sm font-medium text-red-700">{error}</p>
          </div>
        )}

        {/* Initial Loading */}
        {loading && !purchases && (
          <div className="mt-6 rounded-xl border border-[#e5edc5] bg-white px-6 py-12 text-center">
            <p className="text-sm text-[#667697]">Loading purchases...</p>
          </div>
        )}

        {/* Purchase Content */}
        {purchases && (
          <>
            {/* Summary */}
            <div className="mt-6">
              <PurchasesSummary
                totalPurchases={purchases.totalPurchases}
                totalPaid={purchases.totalPaid}
                totalOutstanding={purchases.totalOutstanding}
              />
            </div>

            {/* Selected Period */}
            {(fromDate || toDate) && (
              <div className="mt-6">
                <p className="text-sm text-[#667697]">
                  Showing purchases
                  {fromDate && (
                    <>
                      {" "}
                      from{" "}
                      <span className="font-medium text-[#17213d]">
                        {fromDate}
                      </span>
                    </>
                  )}
                  {toDate && (
                    <>
                      {" "}
                      to{" "}
                      <span className="font-medium text-[#17213d]">
                        {toDate}
                      </span>
                    </>
                  )}
                </p>
              </div>
            )}

            {/* Purchase Table */}
            <div className="mt-4">
              <PurchasesTable purchases={purchases.purchases} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Purchases;
