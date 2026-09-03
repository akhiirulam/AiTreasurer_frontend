import api from "../api/axios";

export interface DashboardPeriod {
  from: string | null;
  to: string | null;
}

export interface DashboardSummary {
  totalIncome: number;
  totalExpenses: number;
  netProfit: number;
  cashBankBalance: number;
}

export interface DashboardBusiness {
  totalSales: number;
  totalPurchases: number;
  totalReceivables: number;
  totalPayables: number;
}

export interface DashboardTransaction {
  id: string;
  type: "income" | "expense" | "sale" | "purchase" | "payment" | "capital";
  amount: number;
  description: string;
  category: string | null;
  customer: string | null;
  supplier: string | null;
  transactionDate: string;
  paymentStatus:
    | "paid"
    | "unpaid"
    | "partial"
    | "unknown"
    | "completed"
    | "pending"
    | null;
}

export interface DashboardData {
  period: DashboardPeriod;
  summary: DashboardSummary;
  business: DashboardBusiness;
  recentTransactions: DashboardTransaction[];
}

export interface DashboardResponse {
  success: boolean;
  data: DashboardData;
}

const getDashboard = async (
  from?: string,
  to?: string,
): Promise<DashboardResponse> => {
  const response = await api.get<DashboardResponse>("/dashboard", {
    params: {
      ...(from && { from }),
      ...(to && { to }),
    },
  });

  return response.data;
};

export default {
  getDashboard,
};
