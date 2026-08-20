import api from "../api/axios";

import type {
  CashBookData,
  CashBookFilters,
} from "../pages/cashBook/types/cashBook.types";

const getCashBook = async (
  filters: CashBookFilters = {},
): Promise<{
  success: boolean;
  data: CashBookData;
  message?: string;
}> => {
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
