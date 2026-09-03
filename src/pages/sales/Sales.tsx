import { useState } from "react";

import SalesHeader from "./components/SalesHeader";
import SalesFilters from "./components/SalesFilters";
import SalesSummary from "./components/SalesSummary";
import SalesTable from "./components/SalesTable";

import useSales from "./hooks/useSales";

const Sales = () => {
  const [fromDate, setFromDate] = useState<string | undefined>();
  const [toDate, setToDate] = useState<string | undefined>();

  const { sales, loading, error, fetchSales } = useSales();

  const handleApplyFilters = async (from?: string, to?: string) => {
    setFromDate(from);
    setToDate(to);

    await fetchSales(from, to);
  };

  return (
    <div className="min-h-screen bg-[#f8f9f1]">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <SalesHeader />

        {/* Filters */}
        <div className="mt-6">
          <SalesFilters onApply={handleApplyFilters} loading={loading} />
        </div>

        {/* Error */}
        {error && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4">
            <p className="text-sm font-medium text-red-700">{error}</p>
          </div>
        )}

        {/* Loading */}
        {loading && !sales && (
          <div className="mt-6 rounded-xl border border-[#e5edc5] bg-white px-6 py-12 text-center">
            <p className="text-sm text-[#667697]">Loading sales...</p>
          </div>
        )}

        {/* Sales Content */}
        {sales && (
          <>
            {/* Summary */}
            <div className="mt-6">
              <SalesSummary
                totalSales={sales.totalSales}
                totalPaid={sales.totalPaid}
                totalOutstanding={sales.totalOutstanding}
              />
            </div>

            {/* Selected Period */}
            {(fromDate || toDate) && (
              <div className="mt-6">
                <p className="text-sm text-[#667697]">
                  Showing sales
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

            {/* Sales Table */}
            <div className="mt-4">
              <SalesTable sales={sales.sales} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Sales;
