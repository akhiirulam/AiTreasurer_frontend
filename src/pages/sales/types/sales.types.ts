export interface Sale {
  transactionId: string;
  date: string;
  customer: string | null;
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

export interface SalesPeriod {
  from: string | null;
  to: string | null;
}

export interface SalesAccount {
  id: string;
  name: string;
  code: string;
}

export interface SalesReport {
  period: SalesPeriod;
  account?: SalesAccount;
  sales: Sale[];
  totalSales: number;
  totalPaid: number;
  totalOutstanding: number;
}

export interface SalesResponse {
  success: boolean;
  data: SalesReport;
}
