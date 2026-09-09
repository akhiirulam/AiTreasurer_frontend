import AdminHeader from "./components/AdminHeader";
import AdminSummary from "./components/AdminSummary";
import RecentUsers from "./components/RecentUsers";

import useAdminDashboard from "./hooks/useAdminDashboard";

const AdminDashboard = () => {
  const { data, loading, error, refetch } = useAdminDashboard();

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-center text-sm text-slate-500">
          Loading admin dashboard...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 px-4">
        <p className="text-center text-sm text-red-600">{error}</p>

        <button
          type="button"
          onClick={refetch}
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex min-h-[400px] items-center justify-center px-4">
        <p className="text-center text-sm text-slate-500">
          No dashboard data available
        </p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4 sm:space-y-6">
      <AdminHeader />

      <AdminSummary statistics={data.statistics} />

      <RecentUsers users={data.recentUsers} />
    </div>
  );
};

export default AdminDashboard;
