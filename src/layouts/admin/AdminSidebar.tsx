import { LayoutDashboard, Users, FileCog, X } from "lucide-react";

import { NavLink } from "react-router-dom";

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminSidebar = ({ isOpen, onClose }: AdminSidebarProps) => {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: Users,
    },
    {
      name: "Account Templates",
      path: "/admin/account-templates",
      icon: FileCog,
    },
  ];

  return (
    <>
      {/* ================================================= */}
      {/* MOBILE OVERLAY */}
      {/* ================================================= */}

      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* ================================================= */}
      {/* SIDEBAR */}
      {/* ================================================= */}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* ============================================= */}
        {/* LOGO */}
        {/* ============================================= */}

        <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 px-5 sm:px-6">
          <div className="flex items-center">
            <h1 className="text-lg font-bold text-slate-900 sm:text-xl">
              AI Treasurer
            </h1>

            <span className="ml-2 rounded-md bg-slate-900 px-2 py-1 text-xs font-medium text-white">
              Admin
            </span>
          </div>

          {/* MOBILE CLOSE BUTTON */}

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={22} />
          </button>
        </div>

        {/* ============================================= */}
        {/* NAVIGATION */}
        {/* ============================================= */}

        <nav className="flex-1 space-y-2 overflow-y-auto p-4">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-slate-900 text-white"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`
                }
              >
                <Icon size={20} />

                {item.name}
              </NavLink>
            );
          })}
        </nav>

        {/* ============================================= */}
        {/* ADMIN INFO */}
        {/* ============================================= */}

        <div className="shrink-0 border-t border-slate-200 p-4">
          <div className="rounded-lg bg-slate-50 p-3">
            <p className="text-xs font-medium text-slate-900">Admin Panel</p>

            <p className="mt-1 text-xs text-slate-500">Platform Management</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
