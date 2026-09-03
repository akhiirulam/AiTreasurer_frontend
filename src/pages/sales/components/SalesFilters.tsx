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
    <div className="rounded-xl border border-[#e5edc5] bg-white p-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
        {/* From Date */}
        <div className="flex-1">
          <label
            htmlFor="sales-from-date"
            className="mb-2 block text-sm font-medium text-[#17213d]"
          >
            From Date
          </label>

          <div className="relative">
            <CalendarDays
              size={18}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#667697]"
            />

            <input
              id="sales-from-date"
              type="date"
              value={from}
              onChange={(event) => setFrom(event.target.value)}
              className="w-full rounded-lg border border-[#d8e69e] bg-[#faffdf] py-2.5 pl-10 pr-3 text-sm text-[#17213d] outline-none transition focus:border-[#17213d]"
            />
          </div>
        </div>

        {/* To Date */}
        <div className="flex-1">
          <label
            htmlFor="sales-to-date"
            className="mb-2 block text-sm font-medium text-[#17213d]"
          >
            To Date
          </label>

          <div className="relative">
            <CalendarDays
              size={18}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#667697]"
            />

            <input
              id="sales-to-date"
              type="date"
              value={to}
              onChange={(event) => setTo(event.target.value)}
              className="w-full rounded-lg border border-[#d8e69e] bg-[#faffdf] py-2.5 pl-10 pr-3 text-sm text-[#17213d] outline-none transition focus:border-[#17213d]"
            />
          </div>
        </div>

        {/* Apply */}
        <button
          type="button"
          onClick={handleApply}
          disabled={loading}
          className="rounded-lg bg-[#17213d] px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Loading..." : "Apply"}
        </button>

        {/* Reset */}
        <button
          type="button"
          onClick={handleReset}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#d8e69e] bg-white px-5 py-2.5 text-sm font-semibold text-[#17213d] transition hover:bg-[#faffdf] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <RotateCcw size={16} />
          Reset
        </button>
      </div>
    </div>
  );
};

export default SalesFilters;
