import { useEffect, useMemo, useState } from "react";
import { ArrowRight, ChevronDown, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import accountApi from "../../services/account.api";

import type { Account, AccountType } from "../../services/account.api";

const typeLabels: Record<AccountType, string> = {
  asset: "Assets",
  liability: "Liabilities",
  equity: "Equity",
  income: "Income",
  expense: "Expenses",
};

const typeOrder: AccountType[] = [
  "asset",
  "liability",
  "equity",
  "income",
  "expense",
];

const Accounts = () => {
  const navigate = useNavigate();

  const [accounts, setAccounts] = useState<Account[]>([]);

  const [loading, setLoading] = useState(true);

  const [expanded, setExpanded] = useState<Record<AccountType, boolean>>({
    asset: true,
    liability: true,
    equity: true,
    income: true,
    expense: true,
  });

  // ==================================================
  // LOAD ACCOUNTS
  // ==================================================

  useEffect(() => {
    const loadAccounts = async () => {
      try {
        setLoading(true);

        const response = await accountApi.getAccounts();

        console.log("Accounts response:", response);

        setAccounts(response.data ?? []);
      } catch (error) {
        console.error("Failed to load accounts:", error);
      } finally {
        setLoading(false);
      }
    };

    loadAccounts();
  }, []);

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

    accounts.forEach((account) => {
      if (groups[account.type]) {
        groups[account.type].push(account);
      }
    });

    return groups;
  }, [accounts]);

  // ==================================================
  // TOGGLE GROUP
  // ==================================================

  const toggleGroup = (type: AccountType) => {
    setExpanded((previous) => ({
      ...previous,
      [type]: !previous[type],
    }));
  };

  // ==================================================
  // LOADING
  // ==================================================

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 size={28} className="animate-spin text-slate-700" />
      </div>
    );
  }

  // ==================================================
  // PAGE
  // ==================================================

  return (
    <div className="w-full px-4 py-6 sm:px-6 lg:px-8">
      {/* HEADER */}

      <div className="mb-8">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
          Accounting
        </p>

        <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
          Accounts
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
          View the accounts created and used by your business.
        </p>
      </div>

      {/* ACCOUNT LIST */}

      <div className="space-y-5">
        {typeOrder.map((type) => {
          const group = groupedAccounts[type];

          if (group.length === 0) {
            return null;
          }

          const isExpanded = expanded[type];

          return (
            <section
              key={type}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
            >
              {/* GROUP HEADER */}

              <button
                type="button"
                onClick={() => toggleGroup(type)}
                className="flex w-full items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-4 text-left transition hover:bg-slate-100 sm:px-6"
              >
                <div className="flex items-center gap-3">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800">
                    {typeLabels[type]}
                  </h2>

                  <span className="rounded-full bg-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-600">
                    {group.length}
                  </span>
                </div>

                <ChevronDown
                  size={18}
                  className={`transition-transform ${
                    isExpanded ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* ACCOUNTS */}

              {isExpanded && (
                <div>
                  {group.map((account) => (
                    <button
                      key={account._id}
                      type="button"
                      onClick={() => navigate(`/accounts/${account._id}`)}
                      className="group flex w-full items-center justify-between gap-4 border-b border-slate-100 px-4 py-4 text-left transition last:border-b-0 hover:bg-slate-50 sm:px-6"
                    >
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="truncate text-sm font-semibold text-slate-900">
                            {account.name}
                          </p>

                          {account.isSystem && (
                            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-500">
                              System
                            </span>
                          )}
                        </div>

                        <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500">
                          <span>{account.code}</span>

                          {account.category && (
                            <span>{account.category.replace(/_/g, " ")}</span>
                          )}
                        </div>
                      </div>

                      <div className="flex shrink-0 items-center gap-3">
                        <span className="hidden text-xs font-medium text-slate-500 sm:block">
                          {typeLabels[type].replace(/s$/, "")}
                        </span>

                        <ArrowRight
                          size={18}
                          className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-slate-900"
                        />
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </section>
          );
        })}

        {/* EMPTY */}

        {accounts.length === 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center">
            <p className="text-sm font-semibold text-slate-900">
              No accounts found
            </p>

            <p className="mt-2 text-sm text-slate-500">
              Accounts will appear here when transactions create them.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Accounts;
