import api from "../api/axios";

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

const getCashBook = async (filters: CashBookFilters = {}) => {
  const userId = localStorage.getItem("userId");

  if (!userId) {
    throw new Error("User ID not found in localStorage");
  }

  const params = new URLSearchParams();

  params.append("userId", userId);

  if (filters.from) {
    params.append("from", filters.from);
  }

  if (filters.to) {
    params.append("to", filters.to);
  }

  const response = await api.get(`/cash-book?${params.toString()}`);

  return response.data;
};

const cashBookApi = {
  getCashBook,
};

export default cashBookApi;
