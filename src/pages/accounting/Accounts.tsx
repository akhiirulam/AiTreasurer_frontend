import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Search,
  X,
  BookOpen,
  Layers3,
} from "lucide-react";
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

const GROUP_ICONS: Record<AccountType, React.ReactNode> = {
  asset: <Layers3 size={18} />,
  liability: <BookOpen size={18} />,
  equity: <BookOpen size={18} />,
  income: <BookOpen size={18} />,
  expense: <BookOpen size={18} />,
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
      <div className="min-h-full bg-[#f5f7f2] p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">
          <div className="animate-pulse">
            <div className="mb-3 h-3 w-28 rounded bg-[#dce5da]" />

            <div className="mb-3 h-12 w-64 rounded-xl bg-[#dce5da]" />

            <div className="h-5 w-96 max-w-full rounded bg-[#dce5da]" />

            <div className="mt-8 h-24 rounded-3xl bg-white" />

            <div className="mt-5 h-64 rounded-3xl bg-white" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full w-full bg-[#f5f7f2] px-4 py-6 sm:px-6 md:px-8 lg:px-10">
      <div className="mx-auto w-full max-w-7xl">
        {/* ==================================================
            HEADER
        ================================================== */}

        <div className="mb-8">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#e4f2de] text-[#173f35]">
              <BookOpen size={17} />
            </div>

            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#238636]">
              Accounting
            </p>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-[#17231f] sm:text-4xl">
            Accounts
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#68736c] sm:text-base">
            View the accounts created and used by your business.
          </p>
        </div>

        {/* ==================================================
            CONTROLS
        ================================================== */}

        <div className="mb-6 rounded-3xl border border-[#dce5da] bg-white p-3 shadow-sm sm:p-4">
          <div className="flex flex-col gap-3 md:flex-row">
            {/* Search */}

            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#68736c]"
              />

              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search accounts..."
                className="h-12 w-full rounded-xl border border-[#dce5da] bg-[#f9fbf7] pl-11 pr-11 text-sm text-[#17231f] outline-none transition placeholder:text-[#68736c] focus:border-[#173f35] focus:bg-white focus:ring-2 focus:ring-[#e4f2de]"
              />

              {search && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-[#68736c] transition hover:bg-[#e4f2de] hover:text-[#173f35]"
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
              className="h-12 rounded-xl border border-[#dce5da] bg-[#f9fbf7] px-4 text-sm text-[#17231f] outline-none transition focus:border-[#173f35] focus:bg-white focus:ring-2 focus:ring-[#e4f2de] md:min-w-[220px]"
            >
              {ACCOUNT_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* Result count */}

          <div className="mt-3 px-1 text-xs text-[#68736c]">
            <span className="font-financial">{filteredAccounts.length}</span>{" "}
            {filteredAccounts.length === 1 ? "account" : "accounts"} found
          </div>
        </div>

        {/* ==================================================
            EMPTY STATE
        ================================================== */}

        {filteredAccounts.length === 0 && (
          <div className="rounded-3xl border border-[#dce5da] bg-white px-6 py-20 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e4f2de] text-[#173f35]">
              <BookOpen size={24} />
            </div>

            <p className="mt-5 text-sm font-semibold text-[#17231f]">
              No accounts found
            </p>

            <p className="mt-2 text-sm leading-6 text-[#68736c]">
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
                className="overflow-hidden rounded-3xl border border-[#dce5da] bg-white shadow-sm"
              >
                {/* Group header */}

                <button
                  type="button"
                  onClick={() => toggleGroup(type)}
                  className="flex w-full items-center justify-between border-b border-[#dce5da] bg-[#f9fbf7] px-5 py-5 text-left transition hover:bg-[#f1f6ee] sm:px-7"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#e4f2de] text-[#173f35]">
                      {GROUP_ICONS[type]}
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-[#173f35]">
                        {GROUP_LABELS[type]}
                      </h2>

                      <span className="font-financial flex h-7 min-w-7 items-center justify-center rounded-full bg-[#173f35] px-2 text-xs font-semibold text-white">
                        {group.length}
                      </span>
                    </div>
                  </div>

                  <div className="ml-4 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-[#68736c] transition hover:bg-[#e4f2de] hover:text-[#173f35]">
                    {collapsed ? (
                      <ChevronDown size={19} />
                    ) : (
                      <ChevronUp size={19} />
                    )}
                  </div>
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
                        className="group flex w-full flex-col gap-4 border-b border-[#edf1eb] px-5 py-5 text-left transition last:border-b-0 hover:bg-[#f9fbf7] sm:flex-row sm:items-center sm:justify-between sm:px-7"
                      >
                        {/* Account information */}

                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-sm font-semibold text-[#17231f] sm:text-base">
                              {account.name}
                            </h3>

                            {account.isSystem && (
                              <span className="rounded-full bg-[#e4f2de] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#173f35]">
                                System
                              </span>
                            )}
                          </div>

                          <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-[#68736c]">
                            <span className="font-technical">
                              {account.code}
                            </span>

                            {account.subCategory && (
                              <>
                                <span>•</span>

                                <span>
                                  {account.subCategory.replace(/_/g, " ")}
                                </span>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Type + arrow */}

                        <div className="flex shrink-0 items-center justify-between gap-4 sm:justify-end">
                          <span className="rounded-full border border-[#dce5da] bg-[#f9fbf7] px-3 py-1.5 text-xs font-medium text-[#68736c]">
                            {TYPE_LABELS[type]}
                          </span>

                          <div className="flex h-9 w-9 items-center justify-center rounded-xl text-[#68736c] transition group-hover:bg-[#e4f2de] group-hover:text-[#173f35]">
                            <ArrowRight
                              size={19}
                              className="transition-transform group-hover:translate-x-0.5"
                            />
                          </div>
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
