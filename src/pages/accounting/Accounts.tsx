import { useEffect, useMemo, useState } from "react";
import { ArrowRight, ChevronDown, ChevronUp, Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

import accountApi from "../../services/account.api";
import type { Account, AccountType } from "../../services/account.api";

const ACCOUNT_TYPES: {
  value: "all" | AccountType;
  label: string;
}[] = [
  { value: "all", label: "All account types" },
  { value: "asset", label: "Assets" },
  { value: "liability", label: "Liabilities" },
  { value: "equity", label: "Equity" },
  { value: "income", label: "Income" },
  { value: "expense", label: "Expenses" },
];

const TYPE_LABELS: Record<AccountType, string> = {
  asset: "Asset",
  liability: "Liability",
  equity: "Equity",
  income: "Income",
  expense: "Expense",
};

const GROUP_LABELS: Record<AccountType, string> = {
  asset: "Assets",
  liability: "Liabilities",
  equity: "Equity",
  income: "Income",
  expense: "Expenses",
};

const Accounts = () => {
  const navigate = useNavigate();

  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | AccountType>("all");

  const [collapsedGroups, setCollapsedGroups] = useState<
    Record<AccountType, boolean>
  >({
    asset: false,
    liability: false,
    equity: false,
    income: false,
    expense: false,
  });

  // ==================================================
  // LOAD ACCOUNTS
  // ==================================================

  useEffect(() => {
    const loadAccounts = async () => {
      try {
        setLoading(true);

        const data = await accountApi.getAccounts();

        setAccounts(data);
      } catch (error) {
        console.error("Failed to load accounts:", error);
      } finally {
        setLoading(false);
      }
    };

    loadAccounts();
  }, []);

  // ==================================================
  // FILTER ACCOUNTS
  // ==================================================

  const filteredAccounts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return accounts.filter((account) => {
      const matchesType = typeFilter === "all" || account.type === typeFilter;

      if (!matchesType) {
        return false;
      }

      if (!normalizedSearch) {
        return true;
      }

      return (
        account.name.toLowerCase().includes(normalizedSearch) ||
        account.code.toLowerCase().includes(normalizedSearch) ||
        account.category?.toLowerCase().includes(normalizedSearch) ||
        account.subCategory?.toLowerCase().includes(normalizedSearch)
      );
    });
  }, [accounts, search, typeFilter]);

  // ==================================================
  // GROUP ACCOUNTS
  // ==================================================

  const groupedAccounts = useMemo(() => {
    const groups: Record<AccountType, Account[]> = {
      asset: [],
      liability: [],
      equity: [],
      income: [],
      expense: [],
    };

    filteredAccounts.forEach((account) => {
      if (account.type) {
        groups[account.type].push(account);
      }
    });

    return groups;
  }, [filteredAccounts]);

  // ==================================================
  // TOGGLE GROUP
  // ==================================================

  const toggleGroup = (type: AccountType) => {
    setCollapsedGroups((previous) => ({
      ...previous,
      [type]: !previous[type],
    }));
  };

  // ==================================================
  // CLEAR SEARCH
  // ==================================================

  const clearSearch = () => {
    setSearch("");
  };

  // ==================================================
  // LOADING
  // ==================================================

  if (loading) {
    return (
      <div className="min-h-full bg-[#efffc2] p-5 sm:p-8">
        <div className="mx-auto max-w-7xl">
          <div className="animate-pulse">
            <div className="mb-4 h-4 w-32 rounded bg-slate-200" />
            <div className="mb-3 h-12 w-64 rounded bg-slate-200" />
            <div className="h-5 w-96 max-w-full rounded bg-slate-200" />

            <div className="mt-8 h-24 rounded-3xl bg-white" />
            <div className="mt-5 h-64 rounded-3xl bg-white" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-[#efffc2] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* ==================================================
            HEADER
        ================================================== */}

        <div className="mb-7">
          <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
            Accounting
          </p>

          <h1 className="font-mono text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Accounts
          </h1>

          <p className="mt-2 font-mono text-sm text-slate-500 sm:text-base">
            View the accounts created and used by your business.
          </p>
        </div>

        {/* ==================================================
            CONTROLS
        ================================================== */}

        <div className="mb-6 rounded-3xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
          <div className="flex flex-col gap-3 md:flex-row">
            {/* Search */}

            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search accounts..."
                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-11 font-mono text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white"
              />

              {search && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-200 hover:text-slate-900"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Type filter */}

            <select
              value={typeFilter}
              onChange={(event) =>
                setTypeFilter(event.target.value as "all" | AccountType)
              }
              className="h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 font-mono text-sm text-slate-700 outline-none focus:border-slate-400 focus:bg-white md:min-w-[220px]"
            >
              {ACCOUNT_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* Result count */}

          <div className="mt-3 px-1 font-mono text-xs text-slate-400">
            {filteredAccounts.length}{" "}
            {filteredAccounts.length === 1 ? "account" : "accounts"} found
          </div>
        </div>

        {/* ==================================================
            EMPTY STATE
        ================================================== */}

        {filteredAccounts.length === 0 && (
          <div className="rounded-3xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
            <p className="font-mono text-base font-semibold text-slate-900">
              No accounts found
            </p>

            <p className="mt-2 font-mono text-sm text-slate-400">
              {search
                ? `No accounts match "${search}".`
                : "Accounts will appear here when transactions create them."}
            </p>
          </div>
        )}

        {/* ==================================================
            ACCOUNT GROUPS
        ================================================== */}

        <div className="space-y-5">
          {(
            [
              "asset",
              "liability",
              "equity",
              "income",
              "expense",
            ] as AccountType[]
          ).map((type) => {
            const group = groupedAccounts[type];

            if (group.length === 0) {
              return null;
            }

            const collapsed = collapsedGroups[type];

            return (
              <section
                key={type}
                className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
              >
                {/* Group header */}

                <button
                  type="button"
                  onClick={() => toggleGroup(type)}
                  className="flex w-full items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-5 text-left transition hover:bg-slate-100 sm:px-7"
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-slate-900">
                      {GROUP_LABELS[type]}
                    </h2>

                    <span className="flex h-8 min-w-8 items-center justify-center rounded-full bg-slate-200 px-2 font-mono text-xs font-semibold text-slate-700">
                      {group.length}
                    </span>

                    <span className="font-mono text-xs text-slate-400">
                      {group.length === 1
                        ? "1 account"
                        : `${group.length} accounts`}
                    </span>
                  </div>

                  {collapsed ? (
                    <ChevronDown size={20} />
                  ) : (
                    <ChevronUp size={20} />
                  )}
                </button>

                {/* Accounts */}

                {!collapsed && (
                  <div>
                    {group.map((account) => (
                      <button
                        key={account._id}
                        type="button"
                        onClick={() =>
                          navigate(`/owner/accounts/${account._id}`)
                        }
                        className="group flex w-full flex-col gap-4 border-b border-slate-100 px-5 py-5 text-left transition last:border-b-0 hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between sm:px-7"
                      >
                        {/* Account information */}

                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-mono text-sm font-bold text-slate-950 sm:text-base">
                              {account.name}
                            </h3>

                            {account.isSystem && (
                              <span className="rounded-full bg-slate-100 px-2.5 py-1 font-mono text-[10px] font-semibold text-slate-500">
                                System
                              </span>
                            )}
                          </div>

                          <div className="mt-1 flex flex-wrap items-center gap-2 font-mono text-xs text-slate-500">
                            <span>{account.code}</span>

                            {account.subCategory && (
                              <>
                                <span>•</span>
                                <span>{account.subCategory}</span>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Type + arrow */}

                        <div className="flex shrink-0 items-center justify-between gap-4 sm:justify-end">
                          <span className="font-mono text-xs font-medium text-slate-500">
                            {TYPE_LABELS[type]}
                          </span>

                          <ArrowRight
                            size={20}
                            className="text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-slate-900"
                          />
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Accounts;
