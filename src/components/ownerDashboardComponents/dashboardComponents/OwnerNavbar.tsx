import { useContext, useState } from "react";

import { Menu, UserCircle, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

import logo from "../../../assets/aitreasurer-navbar-logo.webp";
import { AuthContext } from "../../../context/AuthContext";
import { authApi } from "../../../services/auth.api";

interface OwnerNavbarProps {
  onMenuClick: () => void;
}

const OwnerNavbar = ({ onMenuClick }: OwnerNavbarProps) => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const [isProfileOpen, setIsProfileOpen] = useState(false);

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
    <header className="sticky top-0 z-30 w-full bg-[#f3ffc1] px-3 pt-2">
      <div className="flex h-14 w-full items-center justify-between rounded-xl bg-[#292727] px-4 sm:px-5">
        {/* ================================================= */}
        {/* LEFT SIDE */}
        {/* ================================================= */}

        <div className="flex min-w-0 items-center gap-3">
          {/* MOBILE SIDEBAR BUTTON */}

          <button
            type="button"
            onClick={onMenuClick}
            className="flex items-center justify-center text-white lg:hidden"
            aria-label="Open sidebar"
          >
            <Menu size={24} />
          </button>

          {/* LOGO */}

          <img
            src={logo}
            alt="AI Treasurer"
            className="h-10 w-16 rounded-lg bg-[#f5ffc2] object-contain sm:h-11 sm:w-20"
          />
        </div>

        {/* ================================================= */}
        {/* RIGHT SIDE */}
        {/* ================================================= */}

        <div className="relative">
          <button
            type="button"
            onClick={() => setIsProfileOpen((prev) => !prev)}
            className="flex items-center gap-2 rounded-lg px-2 py-1 text-white transition hover:bg-white/10"
          >
            {user?.profileImage ? (
              <img
                src={user.profileImage}
                alt={user.fullName}
                className="h-9 w-9 rounded-full object-cover"
              />
            ) : (
              <UserCircle size={32} />
            )}

            <div className="hidden text-left sm:block">
              <p className="max-w-[150px] truncate text-sm font-medium">
                {user?.fullName ?? "User"}
              </p>

              <p className="text-xs capitalize text-gray-300">
                {user?.role ?? "owner"}
              </p>
            </div>
          </button>

          {/* ================================================= */}
          {/* PROFILE DROPDOWN */}
          {/* ================================================= */}

          {isProfileOpen && (
            <div className="absolute right-0 top-full mt-3 w-52 rounded-xl bg-white p-2 text-slate-900 shadow-xl">
              {/* EMAIL */}

              <div className="border-b border-slate-100 px-3 py-2">
                <p className="truncate text-sm font-medium">
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
      </div>
    </header>
  );
};

export default OwnerNavbar;
