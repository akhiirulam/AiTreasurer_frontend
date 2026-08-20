export interface CashBookFilters {
  from?: string;
  to?: string;
}

export interface CashBookEntry {
  journalEntryId: string;
  transactionId: string;
  date: string;
  description: string;
  receipt: number;
  payment: number;
  balance: number;
}

export interface CashBookAccount {
  account: {
    id: string;
    name: string;
    code: string;
    type: string;
    category?: string;
    subCategory?: string;
  };

  openingBalance: number;

  entries: CashBookEntry[];

  totalReceipts: number;

  totalPayments: number;

  closingBalance: number;
}

export interface CashBookData {
  period: {
    from: string | null;
    to: string | null;
  };

  accounts: CashBookAccount[];

  totalOpeningBalance: number;

  totalReceipts: number;

  totalPayments: number;

  totalClosingBalance: number;
}
