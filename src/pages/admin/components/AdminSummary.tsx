import { Users, UserCheck, UserX } from "lucide-react";

import type { AdminStatistics } from "../types/admin.types";

interface AdminSummaryProps {
  statistics: AdminStatistics;
}

const AdminSummary = ({ statistics }: AdminSummaryProps) => {
  const summaryCards = [
    {
      title: "Total Users",
      value: statistics.totalUsers,
      icon: Users,
    },
    {
      title: "Active Users",
      value: statistics.activeUsers,
      icon: UserCheck,
    },
    {
      title: "Inactive Users",
      value: statistics.inactiveUsers,
      icon: UserX,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
      {summaryCards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-500">
                  {card.title}
                </p>

                <h2 className="mt-1 text-2xl font-bold text-slate-900 sm:mt-2 sm:text-3xl">
                  {card.value.toLocaleString()}
                </h2>
              </div>

              <div className="shrink-0 rounded-lg bg-slate-100 p-2.5 sm:p-3">
                <Icon size={22} className="text-slate-700 sm:h-6 sm:w-6" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AdminSummary;
