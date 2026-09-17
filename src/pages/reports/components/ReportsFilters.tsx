import { RotateCcw, Search } from "lucide-react";
import { useState } from "react";

interface ReportsFiltersProps {
  onApply: (from?: string, to?: string) => void;
  loading?: boolean;
}

const ReportsFilters = ({ onApply, loading = false }: ReportsFiltersProps) => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const handleApply = () => {
    onApply(from || undefined, to || undefined);
  };

  const handleReset = () => {
    setFrom("");
    setTo("");
    onApply(undefined, undefined);
  };

  return (
    <div className="mb-6 rounded-xl border border-[#dce5da] bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
        {/* From Date */}
        <div className="flex-1">
          <label
            htmlFor="reports-from"
            className="mb-2 block text-sm font-medium text-[#68736c]"
          >
            From Date
          </label>

          <input
            id="reports-from"
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="w-full rounded-lg border border-[#dce5da] bg-[#f9fbf7] px-4 py-2.5 text-sm text-[#17231f] outline-none transition focus:border-[#173f35] focus:ring-1 focus:ring-[#173f35]"
          />
        </div>

        {/* To Date */}
        <div className="flex-1">
          <label
            htmlFor="reports-to"
            className="mb-2 block text-sm font-medium text-[#68736c]"
          >
            To Date
          </label>

          <input
            id="reports-to"
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="w-full rounded-lg border border-[#dce5da] bg-[#f9fbf7] px-4 py-2.5 text-sm text-[#17231f] outline-none transition focus:border-[#173f35] focus:ring-1 focus:ring-[#173f35]"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleApply}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#173f35] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#102e27] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Search size={17} />

            {loading ? "Loading..." : "Apply"}
          </button>

          <button
            type="button"
            onClick={handleReset}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#dce5da] bg-white px-5 py-2.5 text-sm font-semibold text-[#173f35] transition hover:bg-[#e4f2de] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RotateCcw size={17} />
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportsFilters;
