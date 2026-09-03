import api from "../api/axios";

import type { SalesResponse } from "../pages/sales/types/sales.types";

export const getSales = async (
  from?: string,
  to?: string,
): Promise<SalesResponse> => {
  const params: Record<string, string> = {};

  if (from) {
    params.from = from;
  }

  if (to) {
    params.to = to;
  }

  const response = await api.get<SalesResponse>("/sales", {
    params,
  });

  return response.data;
};

export const salesApi = {
  getSales,
};
