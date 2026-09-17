import { RotateCcw, Search } from "lucide-react";

interface CustomerFiltersProps {
  search: string;

  status: "all" | "active" | "inactive";

  onSearchChange: (value: string) => void;

  onStatusChange: (value: "all" | "active" | "inactive") => void;

  onSearch: () => void;

  onReset: () => void;

  loading: boolean;
}

const CustomerFilters = ({
  search,
  status,
  onSearchChange,
  onStatusChange,
  onSearch,
  onReset,
  loading,
}: CustomerFiltersProps) => {
  return (
    <div className="mb-6 rounded-2xl border border-[#dce5da] bg-white p-4 shadow-sm sm:p-5">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_200px_auto_auto] md:items-end">
        {/* =====================================================
            SEARCH
        ===================================================== */}

        <div>
          <label
            htmlFor="customer-search"
            className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#68736c]"
          >
            Search Customer
          </label>

          <div className="relative">
            <Search
              size={18}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#a0aaa3]"
            />

            <input
              id="customer-search"
              type="text"
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  onSearch();
                }
              }}
              placeholder="Search by name, phone or email..."
              className="w-full rounded-xl border border-[#dce5da] bg-[#f9fbf7] py-3 pl-10 pr-4 text-sm font-medium text-[#17231f] outline-none transition placeholder:text-[#9aa49e] focus:border-[#173f35] focus:ring-2 focus:ring-[#e4f2de]"
            />
          </div>
        </div>

        {/* =====================================================
            STATUS
        ===================================================== */}

        <div>
          <label
            htmlFor="customer-status"
            className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#68736c]"
          >
            Status
          </label>

          <select
            id="customer-status"
            value={status}
            onChange={(event) =>
              onStatusChange(
                event.target.value as "all" | "active" | "inactive",
              )
            }
            className="w-full rounded-xl border border-[#dce5da] bg-[#f9fbf7] px-4 py-3 text-sm font-semibold text-[#17231f] outline-none transition focus:border-[#173f35] focus:ring-2 focus:ring-[#e4f2de]"
          >
            <option value="all">All Customers</option>

            <option value="active">Active</option>

            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* =====================================================
            SEARCH BUTTON
        ===================================================== */}

        <button
          type="button"
          onClick={onSearch}
          disabled={loading}
          className="inline-flex h-[46px] items-center justify-center gap-2 rounded-xl bg-[#173f35] px-5 text-sm font-bold text-white transition hover:bg-[#102e27] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Search size={17} />
          Search
        </button>

        {/* =====================================================
            RESET
        ===================================================== */}

        <button
          type="button"
          onClick={onReset}
          disabled={loading}
          className="inline-flex h-[46px] items-center justify-center gap-2 rounded-xl border border-[#dce5da] bg-white px-5 text-sm font-bold text-[#173f35] transition hover:bg-[#e4f2de] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <RotateCcw size={16} />
          Reset
        </button>
      </div>
    </div>
  );
};

export default CustomerFilters;
