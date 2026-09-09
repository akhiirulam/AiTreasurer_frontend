import { User } from "lucide-react";

import type { AdminUser } from "../types/admin.types";

interface RecentUsersProps {
  users: AdminUser[];
}

const RecentUsers = ({ users }: RecentUsersProps) => {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div className="border-b border-slate-200 px-4 py-4 sm:px-5">
        <h2 className="text-base font-semibold text-slate-900 sm:text-lg">
          Recent Users
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Latest registered users on the platform
        </p>
      </div>

      {/* ================================================= */}
      {/* USERS */}
      {/* ================================================= */}

      <div className="divide-y divide-slate-100">
        {users.length === 0 ? (
          <div className="px-4 py-10 text-center sm:px-5">
            <User size={32} className="mx-auto text-slate-300" />

            <p className="mt-3 text-sm text-slate-500">No users found</p>
          </div>
        ) : (
          users.map((user) => (
            <div
              key={user.id}
              className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-5"
            >
              {/* ========================================= */}
              {/* USER INFO */}
              {/* ========================================= */}

              <div className="flex min-w-0 items-center gap-3">
                {/* PROFILE IMAGE */}

                {user.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt={user.fullName}
                    className="h-10 w-10 shrink-0 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100">
                    <User size={20} className="text-slate-500" />
                  </div>
                )}

                <div className="min-w-0">
                  <p className="truncate font-medium text-slate-900">
                    {user.fullName}
                  </p>

                  <p className="truncate text-sm text-slate-500">
                    {user.email}
                  </p>
                </div>
              </div>

              {/* ========================================= */}
              {/* USER STATUS */}
              {/* ========================================= */}

              <div className="flex items-center justify-between gap-3 border-t border-slate-100 pt-3 sm:flex-col sm:items-end sm:justify-center sm:border-0 sm:pt-0">
                <span className="text-sm capitalize text-slate-600">
                  {user.role}
                </span>

                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                    user.accountStatus === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {user.accountStatus}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentUsers;
