import api from "../api/axios";

import type { PurchasesResponse } from "../pages/purchases/types/purchases.types";

export const getPurchases = async (
  from?: string,
  to?: string,
): Promise<PurchasesResponse> => {
  const params: Record<string, string> = {};

  if (from) {
    params.from = from;
  }

  if (to) {
    params.to = to;
  }

  const response = await api.get<PurchasesResponse>("/purchases", {
    params,
  });

  return response.data;
};

export const purchasesApi = {
  getPurchases,
};
