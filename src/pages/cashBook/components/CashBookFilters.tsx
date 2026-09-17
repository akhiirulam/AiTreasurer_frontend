import { CalendarDays, RefreshCw } from "lucide-react";

interface CashBookFilterAccount {
  account: {
    id: string;
    name: string;
    code: string;
  };
}

interface CashBookFiltersProps {
  accounts: CashBookFilterAccount[];

  selectedAccountId: string;

  from: string;

  to: string;

  onAccountChange: (accountId: string) => void;

  onFromChange: (value: string) => void;

  onToChange: (value: string) => void;

  onApply: () => void;

  onReset: () => void;

  loading?: boolean;
}

const CashBookFilters = ({
  accounts,
  selectedAccountId,
  from,
  to,
  onAccountChange,
  onFromChange,
  onToChange,
  onApply,
  onReset,
  loading = false,
}: CashBookFiltersProps) => {
  return (
    <div className="mb-6 rounded-3xl border border-[#dce5da] bg-white p-4 shadow-sm sm:p-6">
      <div className="grid gap-4 md:grid-cols-3">
        {/* =====================================================
            ACCOUNT
        ===================================================== */}

        <div>
          <label
            htmlFor="cash-book-account"
            className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#68736c]"
          >
            Account
          </label>

          <select
            id="cash-book-account"
            value={selectedAccountId}
            onChange={(event) => onAccountChange(event.target.value)}
            className="h-12 w-full rounded-xl border border-[#dce5da] bg-[#f9fbf7] px-4 text-sm font-medium text-[#17231f] outline-none transition focus:border-[#173f35] focus:bg-white focus:ring-2 focus:ring-[#e4f2de]"
          >
            <option value="all">All accounts</option>

            {accounts.map((account) => (
              <option key={account.account.id} value={account.account.id}>
                {account.account.name} ({account.account.code})
              </option>
            ))}
          </select>
        </div>

        {/* =====================================================
            FROM DATE
        ===================================================== */}

        <div>
          <label
            htmlFor="cash-book-from"
            className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#68736c]"
          >
            From
          </label>

          <div className="relative">
            <CalendarDays
              size={17}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#68736c]"
            />

            <input
              id="cash-book-from"
              type="date"
              value={from}
              onChange={(event) => onFromChange(event.target.value)}
              className="h-12 w-full rounded-xl border border-[#dce5da] bg-[#f9fbf7] px-10 py-3 text-sm font-medium text-[#17231f] outline-none transition focus:border-[#173f35] focus:bg-white focus:ring-2 focus:ring-[#e4f2de]"
            />
          </div>
        </div>

        {/* =====================================================
            TO DATE
        ===================================================== */}

        <div>
          <label
            htmlFor="cash-book-to"
            className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#68736c]"
          >
            To
          </label>

          <div className="relative">
            <CalendarDays
              size={17}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#68736c]"
            />

            <input
              id="cash-book-to"
              type="date"
              value={to}
              min={from || undefined}
              onChange={(event) => onToChange(event.target.value)}
              className="h-12 w-full rounded-xl border border-[#dce5da] bg-[#f9fbf7] px-10 py-3 text-sm font-medium text-[#17231f] outline-none transition focus:border-[#173f35] focus:bg-white focus:ring-2 focus:ring-[#e4f2de]"
            />
          </div>
        </div>
      </div>

      {/* =======================================================
          ACTION BUTTONS
      ======================================================= */}

      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onApply}
          disabled={loading}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#173f35] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#102e27] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          <CalendarDays size={16} />

          {loading ? "Applying..." : "Apply Filter"}
        </button>

        <button
          type="button"
          onClick={onReset}
          disabled={loading}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#dce5da] bg-white px-5 py-3 text-sm font-semibold text-[#173f35] transition hover:bg-[#e4f2de] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          <RefreshCw size={16} />
          Reset
        </button>
      </div>
    </div>
  );
};

export default CashBookFilters;
