export interface ReportsPeriod {
  from: string | null;
  to: string | null;
}

export interface ReportsSummary {
  totalSales: number;
  totalPurchases: number;

  otherIncome: number;
  otherExpenses: number;

  totalIncome: number;
  totalExpenses: number;

  netProfit: number;

  totalReceivables: number;
  totalPayables: number;
}

export interface ReportsData {
  period: ReportsPeriod;
  summary: ReportsSummary;
}

export interface ReportsResponse {
  success: boolean;
  data: ReportsData;
}
