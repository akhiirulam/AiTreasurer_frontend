export interface Purchase {
  transactionId: string;
  date: string;
  supplier: string | null;
  supplierId: string | null;
  description: string;
  amount: number;
  paymentStatus:
    | "paid"
    | "unpaid"
    | "partial"
    | "unknown"
    | "completed"
    | "pending";
  paidAmount: number;
  outstandingAmount: number;
}

export interface PurchasesPeriod {
  from: string | null;
  to: string | null;
}

export interface PurchasesAccount {
  id: string;
  name: string;
  code: string;
}

export interface PurchasesReport {
  period: PurchasesPeriod;
  account?: PurchasesAccount;
  purchases: Purchase[];
  totalPurchases: number;
  totalPaid: number;
  totalOutstanding: number;
}

export interface PurchasesResponse {
  success: boolean;
  data: PurchasesReport;
}
