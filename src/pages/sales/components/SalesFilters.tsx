import { CalendarDays, RotateCcw } from "lucide-react";
import { useState } from "react";

interface SalesFiltersProps {
  onApply: (from?: string, to?: string) => void;
  loading?: boolean;
}

const SalesFilters = ({ onApply, loading = false }: SalesFiltersProps) => {
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");

  const handleApply = () => {
    onApply(from || undefined, to || undefined);
  };

  const handleReset = () => {
    setFrom("");
    setTo("");
    onApply(undefined, undefined);
  };

  return (
    <div className="rounded-xl border border-[#dce5da] bg-white p-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
        {/* From Date */}
        <div className="flex-1">
          <label
            htmlFor="sales-from-date"
            className="mb-2 block text-sm font-medium text-[#68736c]"
          >
            From Date
          </label>

          <div className="relative">
            <CalendarDays
              size={18}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#68736c]"
            />

            <input
              id="sales-from-date"
              type="date"
              value={from}
              onChange={(event) => setFrom(event.target.value)}
              className="w-full rounded-lg border border-[#dce5da] bg-[#f9fbf7] py-2.5 pl-10 pr-3 text-sm text-[#17231f] outline-none transition placeholder:text-[#a0aaa3] focus:border-[#173f35] focus:ring-2 focus:ring-[#e4f2de]"
            />
          </div>
        </div>

        {/* To Date */}
        <div className="flex-1">
          <label
            htmlFor="sales-to-date"
            className="mb-2 block text-sm font-medium text-[#68736c]"
          >
            To Date
          </label>

          <div className="relative">
            <CalendarDays
              size={18}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#68736c]"
            />

            <input
              id="sales-to-date"
              type="date"
              value={to}
              onChange={(event) => setTo(event.target.value)}
              className="w-full rounded-lg border border-[#dce5da] bg-[#f9fbf7] py-2.5 pl-10 pr-3 text-sm text-[#17231f] outline-none transition focus:border-[#173f35] focus:ring-2 focus:ring-[#e4f2de]"
            />
          </div>
        </div>

        {/* Apply */}
        <button
          type="button"
          onClick={handleApply}
          disabled={loading}
          className="rounded-lg bg-[#173f35] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#102e27] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Loading..." : "Apply"}
        </button>

        {/* Reset */}
        <button
          type="button"
          onClick={handleReset}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#dce5da] bg-white px-5 py-2.5 text-sm font-semibold text-[#173f35] transition hover:bg-[#e4f2de] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <RotateCcw size={16} />
          Reset
        </button>
      </div>
    </div>
  );
};

export default SalesFilters;
