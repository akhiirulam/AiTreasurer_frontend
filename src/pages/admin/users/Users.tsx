import { useState } from "react";

import { Search, Users as UsersIcon } from "lucide-react";

import useUsers from "../hooks/useUsers";

const Users = () => {
  // =====================================================
  // HOOK
  // =====================================================

  const { users, loading, error, updateUserStatus } = useUsers();

  // =====================================================
  // STATE
  // =====================================================

  const [search, setSearch] = useState("");

  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);

  // =====================================================
  // FILTER USERS
  // =====================================================

  const filteredUsers = users.filter((user) => {
    const searchValue = search.toLowerCase();

    return (
      user.fullName.toLowerCase().includes(searchValue) ||
      user.email.toLowerCase().includes(searchValue) ||
      user.role.toLowerCase().includes(searchValue)
    );
  });

  // =====================================================
  // UPDATE STATUS
  // =====================================================

  const handleStatusChange = async (
    userId: string,
    currentStatus: "active" | "inactive",
  ) => {
    try {
      setUpdatingUserId(userId);

      const newStatus = currentStatus === "active" ? "inactive" : "active";

      await updateUserStatus(userId, newStatus);
    } catch (error) {
      console.error("Failed to update user status:", error);
    } finally {
      setUpdatingUserId(null);
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-slate-500">Loading users...</p>
      </div>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-red-500">{error}</p>
      </div>
    );
  }

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="w-full space-y-6">
      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <UsersIcon size={26} />

            <h1 className="text-2xl font-bold text-slate-900">Users</h1>
          </div>

          <p className="mt-1 text-sm text-slate-500">
            Manage platform users and their account status.
          </p>
        </div>

        <div className="text-sm text-slate-500">
          Total Users:{" "}
          <span className="font-semibold text-slate-900">{users.length}</span>
        </div>
      </div>

      {/* ================================================= */}
      {/* SEARCH */}
      {/* ================================================= */}

      <div className="relative max-w-md">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by name, email or role..."
          className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-slate-400"
        />
      </div>

      {/* ================================================= */}
      {/* USERS TABLE */}
      {/* ================================================= */}

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-slate-200 bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                  User
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                  Mobile
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                  Role
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                  Status
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                  Joined
                </th>

                <th className="px-6 py-4 text-right text-sm font-semibold text-slate-600">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-10 text-center text-sm text-slate-500"
                  >
                    No users found.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-slate-100 last:border-none hover:bg-slate-50"
                  >
                    {/* USER */}

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {/* PROFILE IMAGE */}

                        {user.profileImage ? (
                          <img
                            src={user.profileImage}
                            alt={user.fullName}
                            className="h-10 w-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 font-semibold text-slate-600">
                            {user.fullName.charAt(0).toUpperCase()}
                          </div>
                        )}

                        <div>
                          <p className="font-medium text-slate-900">
                            {user.fullName}
                          </p>

                          <p className="text-sm text-slate-500">{user.email}</p>
                        </div>
                      </div>
                    </td>

                    {/* MOBILE */}

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {user.mobileNumber || "-"}
                    </td>

                    {/* ROLE */}

                    <td className="px-6 py-4">
                      <span className="rounded-md bg-slate-100 px-3 py-1 text-xs font-medium capitalize text-slate-700">
                        {user.role}
                      </span>
                    </td>

                    {/* STATUS */}

                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          user.accountStatus === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {user.accountStatus}
                      </span>
                    </td>

                    {/* JOINED */}

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>

                    {/* ACTION */}

                    <td className="px-6 py-4 text-right">
                      <button
                        type="button"
                        disabled={updatingUserId === user.id}
                        onClick={() =>
                          handleStatusChange(user.id, user.accountStatus)
                        }
                        className={`rounded-lg px-4 py-2 text-xs font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${
                          user.accountStatus === "active"
                            ? "bg-red-50 text-red-600 hover:bg-red-100"
                            : "bg-green-50 text-green-600 hover:bg-green-100"
                        }`}
                      >
                        {updatingUserId === user.id
                          ? "Updating..."
                          : user.accountStatus === "active"
                            ? "Deactivate"
                            : "Activate"}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
