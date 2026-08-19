import api from "../api/axios";

export interface CreateTransactionData {
  text: string;
  file?: File | null;
}

export interface TransactionHistoryFilters {
  search?: string;
  type?: string;
  paymentStatus?: string;
  from?: string;
  to?: string;
  page?: number;
  limit?: number;
}

const createTransaction = async (data: CreateTransactionData) => {
  const formData = new FormData();

  const userId = localStorage.getItem("userId");

  if (userId === null) {
    throw new Error("User ID not found in localStorage");
  }

  formData.append("text", data.text);
  formData.append("userId", userId);

  if (data.file) {
    formData.append("attachment", data.file);
  }

  const response = await api.post(
    "/transaction/createWebTransaction",
    formData,
  );

  return response.data;
};

// ==================================================
// TRANSACTION HISTORY
// ==================================================

const getTransactionHistory = async (
  filters: TransactionHistoryFilters = {},
) => {
  const userId = localStorage.getItem("userId");

  if (userId === null) {
    throw new Error("User ID not found in localStorage");
  }

  const params = new URLSearchParams();

  params.append("userId", userId);

  if (filters.search?.trim()) {
    params.append("search", filters.search.trim());
  }

  if (filters.type) {
    params.append("type", filters.type);
  }

  if (filters.paymentStatus) {
    params.append("paymentStatus", filters.paymentStatus);
  }

  if (filters.from) {
    params.append("from", filters.from);
  }

  if (filters.to) {
    params.append("to", filters.to);
  }

  if (filters.page) {
    params.append("page", String(filters.page));
  }

  if (filters.limit) {
    params.append("limit", String(filters.limit));
  }

  const response = await api.get(`/transactions/history?${params.toString()}`);

  return response.data;
};

const transactionApi = {
  createTransaction,
  getTransactionHistory,
};

export default transactionApi;
