import { useContext, useState } from "react";

import {
  Menu,
  UserCircle,
  LogOut,
  LayoutDashboard,
  ReceiptText,
  BarChart3,
  ChevronDown,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";

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

  // =====================================================
  // NAVIGATION ITEMS
  // =====================================================

  const navItems = [
    {
      label: "Dashboard",
      path: "/owner/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Transactions",
      path: "/owner/transactions",
      icon: ReceiptText,
    },
    {
      label: "Reports",
      path: "/owner/reports",
      icon: BarChart3,
    },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#f5f7f2] px-3 pt-3 sm:px-4">
      <div className="relative flex h-16 w-full items-center rounded-2xl border border-[#dce5da] bg-[#173f35] px-3 shadow-sm sm:px-5">
        {/* ================================================= */}
        {/* LEFT SIDE */}
        {/* ================================================= */}

        <div className="flex min-w-0 items-center gap-3">
          {/* MOBILE SIDEBAR BUTTON */}

          <button
            type="button"
            onClick={onMenuClick}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-white/80 transition hover:bg-white/10 hover:text-white lg:hidden"
            aria-label="Open sidebar"
          >
            <Menu size={21} strokeWidth={2} />
          </button>

          {/* LOGO */}

          <div className="flex items-center">
            <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-white shadow-sm sm:h-12 sm:w-12">
              <img
                src={logo}
                alt="AI Treasurer"
                className="h-full w-full object-contain p-1.5"
              />
            </div>

            <div className="ml-3 hidden sm:block">
              <p className="text-sm font-semibold leading-tight text-white">
                AI Treasurer
              </p>
              <p className="text-[11px] text-white/60">Smart Accounting</p>
            </div>
          </div>
        </div>

        {/* ================================================= */}
        {/* CENTER NAVIGATION */}
        {/* ================================================= */}

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end
                className={({ isActive }) =>
                  [
                    "group flex items-center gap-2 rounded-xl px-3 py-2.5",
                    "text-sm font-medium transition-all duration-200",
                    "lg:px-4",
                    isActive
                      ? "bg-white text-[#173f35] shadow-sm"
                      : "text-white/65 hover:bg-white/10 hover:text-white",
                  ].join(" ")
                }
              >
                <Icon
                  size={17}
                  strokeWidth={1.9}
                  className="transition-transform duration-200 group-hover:scale-105"
                />

                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* ================================================= */}
        {/* RIGHT SIDE — PROFILE */}
        {/* ================================================= */}

        <div className="relative ml-auto">
          <button
            type="button"
            onClick={() => setIsProfileOpen((prev) => !prev)}
            className="group flex items-center gap-2 rounded-xl px-2 py-1.5 text-white transition hover:bg-white/10"
            aria-expanded={isProfileOpen}
            aria-haspopup="true"
          >
            {/* PROFILE IMAGE */}

            {user?.profileImage ? (
              <img
                src={user.profileImage}
                alt={user.fullName}
                className="h-9 w-9 rounded-full border-2 border-white/20 object-cover"
              />
            ) : (
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e4f2de] text-[#173f35]">
                <UserCircle size={25} strokeWidth={1.8} />
              </div>
            )}

            {/* USER INFORMATION */}

            <div className="hidden max-w-[150px] text-left sm:block">
              <p className="truncate text-sm font-semibold text-white">
                {user?.fullName ?? "User"}
              </p>

              <p className="mt-0.5 text-xs capitalize text-white/55">
                {user?.role ?? "owner"}
              </p>
            </div>

            <ChevronDown
              size={16}
              className={`hidden text-white/50 transition-transform sm:block ${
                isProfileOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* ================================================= */}
          {/* PROFILE DROPDOWN */}
          {/* ================================================= */}

          {isProfileOpen && (
            <>
              {/* BACKDROP */}

              <button
                type="button"
                aria-label="Close profile menu"
                onClick={() => setIsProfileOpen(false)}
                className="fixed inset-0 -z-10 cursor-default"
              />

              <div className="absolute right-0 top-full mt-3 w-64 overflow-hidden rounded-2xl border border-[#dce5da] bg-white text-[#17231f] shadow-xl shadow-black/10">
                {/* PROFILE HEADER */}

                <div className="border-b border-[#e8ede5] px-4 py-4">
                  <div className="flex items-center gap-3">
                    {user?.profileImage ? (
                      <img
                        src={user.profileImage}
                        alt={user.fullName}
                        className="h-11 w-11 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#e4f2de] text-[#173f35]">
                        <UserCircle size={29} strokeWidth={1.7} />
                      </div>
                    )}

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">
                        {user?.fullName ?? "User"}
                      </p>

                      <p className="mt-0.5 truncate text-xs text-[#68736c]">
                        {user?.email ?? ""}
                      </p>
                    </div>
                  </div>
                </div>

                {/* ACCOUNT INFO */}

                <div className="px-2 py-2">
                  <div className="rounded-xl bg-[#f5f7f2] px-3 py-2.5">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[#68736c]">
                      Account
                    </p>

                    <p className="mt-1 text-sm font-medium capitalize text-[#173f35]">
                      {user?.role ?? "owner"}
                    </p>
                  </div>
                </div>

                {/* LOGOUT */}

                <div className="border-t border-[#e8ede5] p-2">
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-[#c43d3d] transition hover:bg-[#fff1f1]"
                  >
                    <LogOut size={17} strokeWidth={1.9} />

                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default OwnerNavbar;
