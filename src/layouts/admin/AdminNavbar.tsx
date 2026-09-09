import { useContext, useState } from "react";

import { LogOut, Menu, UserCircle } from "lucide-react";

import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";
import { authApi } from "../../services/auth.api";

interface AdminNavbarProps {
  onMenuClick: () => void;
}

const AdminNavbar = ({ onMenuClick }: AdminNavbarProps) => {
  const auth = useContext(AuthContext);

  const navigate = useNavigate();

  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // =====================================================
  // USER
  // =====================================================

  const user = auth?.user;

  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      auth?.clearAuth();

      navigate("/login");
    }
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-8">
      {/* ================================================= */}
      {/* LEFT SIDE */}
      {/* ================================================= */}

      <div className="flex items-center gap-3">
        {/* MOBILE MENU BUTTON */}

        <button
          type="button"
          onClick={onMenuClick}
          className="flex rounded-lg p-2 text-slate-700 transition hover:bg-slate-100 lg:hidden"
          aria-label="Open sidebar"
        >
          <Menu size={24} />
        </button>

        {/* PAGE TITLE */}

        <div>
          <h2 className="text-base font-semibold text-slate-900 sm:text-lg">
            Admin Panel
          </h2>

          <p className="hidden text-xs text-slate-500 sm:block">
            Platform Management
          </p>
        </div>
      </div>

      {/* ================================================= */}
      {/* ADMIN PROFILE */}
      {/* ================================================= */}

      <div className="relative">
        <button
          type="button"
          onClick={() => setIsProfileOpen((prev) => !prev)}
          className="flex items-center gap-2 rounded-lg px-2 py-2 transition hover:bg-slate-100 sm:gap-3"
        >
          {/* PROFILE IMAGE */}

          {user?.profileImage ? (
            <img
              src={user.profileImage}
              alt={user.fullName}
              className="h-9 w-9 rounded-full object-cover"
            />
          ) : (
            <UserCircle size={34} className="text-slate-500" />
          )}

          {/* USER DETAILS */}

          <div className="hidden text-left sm:block">
            <p className="max-w-[150px] truncate text-sm font-medium text-slate-900">
              {user?.fullName ?? "Admin"}
            </p>

            <p className="text-xs capitalize text-slate-500">
              {user?.role ?? "admin"}
            </p>
          </div>
        </button>

        {/* ================================================= */}
        {/* PROFILE DROPDOWN */}
        {/* ================================================= */}

        {isProfileOpen && (
          <div className="absolute right-0 mt-2 w-52 rounded-xl border border-slate-200 bg-white p-2 shadow-lg">
            {/* EMAIL */}

            <div className="border-b border-slate-100 px-3 py-2">
              <p className="truncate text-sm font-medium text-slate-900">
                {user?.email ?? ""}
              </p>
            </div>

            {/* LOGOUT */}

            <button
              type="button"
              onClick={handleLogout}
              className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 transition hover:bg-red-50"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default AdminNavbar;
