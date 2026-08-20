import { ChevronDown, ChevronUp, Wallet } from "lucide-react";

import { formatAccountCategory } from "../utils/cashBook.utils";

interface CashBookAccountHeaderProps {
  name: string;
  code: string;
  type: string;
  category?: string;
  collapsed: boolean;
  onToggle: () => void;
}

const CashBookAccountHeader = ({
  name,
  code,
  type,
  category,
  collapsed,
  onToggle,
}: CashBookAccountHeaderProps) => {
  const displayCategory =
    formatAccountCategory(category) || formatAccountCategory(type);

  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex w-full flex-col gap-4 border-b border-[#d8e69e] px-4 py-5 text-left transition hover:bg-[#f5fbdc] sm:flex-row sm:items-center sm:justify-between sm:px-6"
    >
      {/* =====================================================
          ACCOUNT INFORMATION
      ===================================================== */}

      <div className="flex min-w-0 items-center gap-3">
        {/* Account icon */}

        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#292727] text-white">
          <Wallet size={20} />
        </div>

        {/* Name + code */}

        <div className="min-w-0">
          <h2 className="truncate text-lg font-black sm:text-xl">{name}</h2>

          <div className="mt-1 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-[#667697]">{code}</span>

            <span className="text-[#9aaa70]">•</span>

            <span className="text-xs font-bold capitalize text-[#667697]">
              {displayCategory}
            </span>
          </div>
        </div>
      </div>

      {/* =====================================================
          CATEGORY + TOGGLE
      ===================================================== */}

      <div className="flex items-center justify-between gap-3 sm:justify-end">
        {/* Category */}

        <div className="rounded-full bg-[#292727] px-3 py-2 text-xs font-bold capitalize text-white">
          {displayCategory}
        </div>

        {/* Collapse button */}

        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#cbd99a] bg-white">
          {collapsed ? <ChevronDown size={17} /> : <ChevronUp size={17} />}
        </div>
      </div>
    </button>
  );
};

export default CashBookAccountHeader;
