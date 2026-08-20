import api from "../api/axios";

export type AccountType =
  | "asset"
  | "liability"
  | "equity"
  | "income"
  | "expense";

export interface Account {
  _id: string;
  userId: string;
  templateId: string | null;
  name: string;
  code: string;
  type: AccountType;
  category: string | null;
  subCategory: string | null;
  description: string | null;
  normalBalance: "debit" | "credit" | null;
  isSystem: boolean;
  isActive: boolean;
}

export interface AccountLedgerEntry {
  date: string;
  description: string;
  transactionId: string;
  debit: number;
  credit: number;
  balance: number;
}

export interface AccountLedger {
  account: {
    id: string;
    name: string;
    code: string;
    type: AccountType;
    category: string | null;
    subCategory: string | null;
    normalBalance: "debit" | "credit" | null;
  };

  openingBalance: number;
  totalDebit: number;
  totalCredit: number;
  closingBalance: number;

  entries: AccountLedgerEntry[];
}

const getAccounts = async () => {
  const userId = localStorage.getItem("userId");

  if (!userId) {
    throw new Error("User ID not found");
  }

  const response = await api.get("/accounts", {
    params: {
      userId,
    },
  });

  return response.data.data;
};

const getAccountLedger = async (accountId: string) => {
  const userId = localStorage.getItem("userId");

  if (!userId) {
    throw new Error("User ID not found");
  }

  const response = await api.get("/ledger/account", {
    params: {
      userId,
      accountId,
    },
  });

  return response.data;
};

const accountApi = {
  getAccounts,
  getAccountLedger,
};

export default accountApi;
