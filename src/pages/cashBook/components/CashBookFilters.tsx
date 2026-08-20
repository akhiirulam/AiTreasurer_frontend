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
    <div className="mb-6 rounded-3xl border border-[#d8e69e] bg-[#faffdf] p-4 shadow-sm sm:p-6">
      <div className="grid gap-4 md:grid-cols-3">
        {/* =====================================================
            ACCOUNT
        ===================================================== */}

        <div>
          <label
            htmlFor="cash-book-account"
            className="mb-2 block text-xs font-black uppercase tracking-wide text-[#667697]"
          >
            Account
          </label>

          <select
            id="cash-book-account"
            value={selectedAccountId}
            onChange={(event) => onAccountChange(event.target.value)}
            className="w-full rounded-xl border border-[#cbd99a] bg-white px-4 py-3 text-sm font-semibold outline-none transition focus:border-[#292727] focus:ring-2 focus:ring-[#dce9a5]"
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
            className="mb-2 block text-xs font-black uppercase tracking-wide text-[#667697]"
          >
            From
          </label>

          <div className="relative">
            <CalendarDays
              size={17}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#667697]"
            />

            <input
              id="cash-book-from"
              type="date"
              value={from}
              onChange={(event) => onFromChange(event.target.value)}
              className="w-full rounded-xl border border-[#cbd99a] bg-white px-10 py-3 text-sm font-semibold outline-none transition focus:border-[#292727] focus:ring-2 focus:ring-[#dce9a5]"
            />
          </div>
        </div>

        {/* =====================================================
            TO DATE
        ===================================================== */}

        <div>
          <label
            htmlFor="cash-book-to"
            className="mb-2 block text-xs font-black uppercase tracking-wide text-[#667697]"
          >
            To
          </label>

          <div className="relative">
            <CalendarDays
              size={17}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#667697]"
            />

            <input
              id="cash-book-to"
              type="date"
              value={to}
              min={from || undefined}
              onChange={(event) => onToChange(event.target.value)}
              className="w-full rounded-xl border border-[#cbd99a] bg-white px-10 py-3 text-sm font-semibold outline-none transition focus:border-[#292727] focus:ring-2 focus:ring-[#dce9a5]"
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
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#292727] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#181818] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          <CalendarDays size={16} />

          {loading ? "Applying..." : "Apply Filter"}
        </button>

        <button
          type="button"
          onClick={onReset}
          disabled={loading}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#292727] bg-transparent px-5 py-3 text-sm font-bold text-[#292727] transition hover:bg-[#292727] hover:text-white disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          <RefreshCw size={16} />
          Reset
        </button>
      </div>
    </div>
  );
};

export default CashBookFilters;
