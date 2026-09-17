import ReportsHeader from "./components/ReportsHeader";
import ReportsFilters from "./components/ReportsFilters";
import ReportsSummary from "./components/ReportsSummary";
import ReportsFinancialSummary from "./components/ReportsFinancialSummary";

import useReports from "./hooks/useReports";

const Reports = () => {
  const { report, loading, error, fetchReports } = useReports();

  const handleApplyFilters = (from?: string, to?: string) => {
    fetchReports(from, to);
  };

  return (
    <div className="min-h-screen bg-[#f5f7f2] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <ReportsHeader />

        {/* Filters */}
        <ReportsFilters onApply={handleApplyFilters} loading={loading} />

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-xl border border-[#f0caca] bg-[#fff5f5] px-5 py-4 text-sm text-[#c43d3d]">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading && !report && (
          <div className="flex min-h-[300px] items-center justify-center">
            <div className="text-sm font-medium text-[#68736c]">
              Loading reports...
            </div>
          </div>
        )}

        {/* Report */}
        {report && (
          <>
            {/* Summary Cards */}
            <ReportsSummary summary={report.summary} />

            {/* Financial Summary */}
            <ReportsFinancialSummary summary={report.summary} />

            {/* Selected Period */}
            <div className="mt-6 text-center text-xs text-[#68736c]">
              {report.period.from && report.period.to ? (
                <>
                  Showing report from{" "}
                  <span className="font-technical font-medium text-[#173f35]">
                    {new Date(report.period.from).toLocaleDateString("en-IN")}
                  </span>{" "}
                  to{" "}
                  <span className="font-technical font-medium text-[#173f35]">
                    {new Date(report.period.to).toLocaleDateString("en-IN")}
                  </span>
                </>
              ) : (
                "Showing all available transactions"
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Reports;
