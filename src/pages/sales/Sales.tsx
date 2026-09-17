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
    <div className="min-h-screen bg-[#f5f7f2]">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <SalesHeader />

        {/* Filters */}
        <div className="mt-6">
          <SalesFilters onApply={handleApplyFilters} loading={loading} />
        </div>

        {/* Error */}
        {error && (
          <div className="mt-6 rounded-xl border border-[#f0caca] bg-[#fff5f5] px-5 py-4">
            <p className="text-sm font-medium text-[#c43d3d]">{error}</p>
          </div>
        )}

        {/* Loading */}
        {loading && !sales && (
          <div className="mt-6 rounded-xl border border-[#dce5da] bg-white px-6 py-12 text-center">
            <p className="text-sm text-[#68736c]">Loading sales...</p>
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
                <p className="text-sm text-[#68736c]">
                  Showing sales
                  {fromDate && (
                    <>
                      {" "}
                      from{" "}
                      <span className="font-technical font-medium text-[#173f35]">
                        {fromDate}
                      </span>
                    </>
                  )}
                  {toDate && (
                    <>
                      {" "}
                      to{" "}
                      <span className="font-technical font-medium text-[#173f35]">
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
