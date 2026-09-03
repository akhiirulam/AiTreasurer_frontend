import api from "../api/axios";
import type { ReportsResponse } from "../pages/reports/types/reports.types";

const getReports = async (
  from?: string,
  to?: string,
): Promise<ReportsResponse> => {
  const response = await api.get<ReportsResponse>("/reports", {
    params: {
      ...(from && { from }),
      ...(to && { to }),
    },
  });

  return response.data;
};

export default {
  getReports,
};
