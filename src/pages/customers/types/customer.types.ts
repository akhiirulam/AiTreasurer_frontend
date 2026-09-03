export interface Customer {
  _id: string;

  userId: string;

  name: string;

  phone: string;

  email: string | null;

  address: string | null;

  isActive: boolean;

  createdAt: string;

  updatedAt: string;
}

// =====================================================
// CUSTOMER LEDGER
// =====================================================

export interface CustomerLedgerEntry {
  date: string;
  description: string;
  transactionId: string;
  debit: number;
  credit: number;
  balance: number;
}

export interface CustomerLedger {
  customer: {
    _id: string;
    name: string;
    phone: string;
    email?: string | null;
    address?: string | null;
  };

  totalSales: number;
  totalPayments: number;
  outstandingBalance: number;

  entries: CustomerLedgerEntry[];
}

export interface CustomerFilters {
  search: string;

  status: "all" | "active" | "inactive";
}

export interface CreateCustomerData {
  name: string;

  phone: string;

  email?: string | null;

  address?: string | null;
}

export interface UpdateCustomerData {
  name?: string;

  phone?: string;

  email?: string | null;

  address?: string | null;

  isActive?: boolean;
}
