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
    <div className="overflow-hidden rounded-3xl border border-[#d8e69e] bg-[#faffdf] shadow-sm">
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

          <div className="flex flex-col gap-2 border-t border-[#d8e69e] bg-[#edf6c5] px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <p className="text-sm font-bold text-[#667697]">Closing Balance</p>

            <p
              className={`text-xl font-black ${
                account.closingBalance < 0 ? "text-red-600" : "text-[#17213d]"
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
