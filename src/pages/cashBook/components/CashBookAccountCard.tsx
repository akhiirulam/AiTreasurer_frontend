import { useState } from "react";

import type { CashBookAccount } from "../types/cashBook.types";

import CashBookAccountHeader from "./CashBookAccountHeader";
import CashBookAccountSummary from "./CashBookAccountSummary";
import CashBookEntryTable from "./CashBookEntryTable";

import { formatCurrency } from "../utils/cashBook.utils";

interface CashBookAccountCardProps {
  account: CashBookAccount;
}

const CashBookAccountCard = ({ account }: CashBookAccountCardProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleAccount = () => {
    setCollapsed((previous) => !previous);
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-[#dce5da] bg-white shadow-sm">
      {/* =====================================================
          ACCOUNT HEADER
      ===================================================== */}

      <CashBookAccountHeader
        name={account.account.name}
        code={account.account.code}
        type={account.account.type}
        category={account.account.category}
        collapsed={collapsed}
        onToggle={toggleAccount}
      />

      {/* =====================================================
          ACCOUNT CONTENT
      ===================================================== */}

      {!collapsed && (
        <>
          {/* =================================================
              ACCOUNT SUMMARY
          ================================================= */}

          <CashBookAccountSummary
            openingBalance={account.openingBalance}
            totalReceipts={account.totalReceipts}
            totalPayments={account.totalPayments}
          />

          {/* =================================================
              TRANSACTIONS
          ================================================= */}

          <CashBookEntryTable entries={account.entries} />

          {/* =================================================
              CLOSING BALANCE
          ================================================= */}

          <div className="flex flex-col gap-2 border-t border-[#dce5da] bg-[#173f35] px-4 py-5 text-white sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-white/60">
                Closing Balance
              </p>

              <p className="mt-1 text-sm text-white/70">
                Current account balance
              </p>
            </div>

            <p
              className={`font-financial text-xl font-semibold ${
                account.closingBalance < 0 ? "text-[#ffb4b4]" : "text-white"
              }`}
            >
              {formatCurrency(account.closingBalance)}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default CashBookAccountCard;
