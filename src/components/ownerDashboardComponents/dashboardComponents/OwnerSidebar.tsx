import {
  BarChart3,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  LogOut,
  Settings,
  ShoppingCart,
  Users,
  Truck,
  MessageCircle,
  X,
  type LucideIcon,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { useState } from "react";

// ==========================================
// SIDEBAR TYPES
// ==========================================

interface SidebarItem {
  label: string;
  path: string;
  icon: LucideIcon;
}

interface SidebarSection {
  label: string;
  items: SidebarItem[];
}

type MenuItem = SidebarItem | SidebarSection;

// ==========================================
// PROPS
// ==========================================

interface OwnerSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const OwnerSidebar = ({ isOpen, onClose }: OwnerSidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems: MenuItem[] = [
    {
      label: "Dashboard",
      path: "/owner/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Transactions",
      path: "/owner/transactions",
      icon: BookOpen,
    },

    // ==========================================
    // ACCOUNTING
    // ==========================================

    {
      label: "Accounting",
      items: [
        {
          label: "Accounts",
          path: "/owner/accounts",
          icon: BookOpen,
        },
        {
          label: "Cash Book",
          path: "/owner/cash-book",
          icon: BookOpen,
        },
      ],
    },

    {
      label: "Customers",
      path: "/owner/customers",
      icon: Users,
    },
    {
      label: "Suppliers",
      path: "/owner/suppliers",
      icon: Truck,
    },
    {
      label: "Sales",
      path: "/sales",
      icon: ShoppingCart,
    },
    {
      label: "Purchases",
      path: "/purchases",
      icon: ShoppingCart,
    },
    {
      label: "Reports",
      path: "/owner/reports",
      icon: BarChart3,
    },
    {
      label: "AI Assistant",
      path: "/ai-assistant",
      icon: MessageCircle,
    },
    {
      label: "Settings",
      path: "/settings",
      icon: Settings,
    },
  ];

  // ==========================================
  // CLOSE SIDEBAR ON MOBILE
  // ==========================================

  const handleNavigation = () => {
    onClose();
  };

  return (
    <>
      {/* ========================================== */}
      {/* MOBILE OVERLAY */}
      {/* ========================================== */}

      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        />
      )}

      {/* ========================================== */}
      {/* SIDEBAR */}
      {/* ========================================== */}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen flex-col border-r border-slate-200 bg-white transition-all duration-300 lg:sticky lg:top-0 lg:z-20 lg:h-screen ${
          collapsed ? "w-20" : "w-64"
        } ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* ========================================== */}
        {/* TOP AREA */}
        {/* ========================================== */}

        <div
          className={`flex h-16 shrink-0 items-center border-b border-slate-100 ${
            collapsed ? "justify-center" : "justify-between px-4"
          }`}
        >
          {/* MOBILE CLOSE BUTTON */}

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>

          {/* DESKTOP COLLAPSE BUTTON */}

          <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            className="hidden h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 lg:flex"
          >
            {collapsed ? <ChevronRight size={19} /> : <ChevronLeft size={19} />}
          </button>
        </div>

        {/* ========================================== */}
        {/* NAVIGATION */}
        {/* ========================================== */}

        <nav className="flex flex-1 flex-col overflow-y-auto px-3 py-5">
          <div className="space-y-1">
            {menuItems.map((item) => {
              if ("path" in item) {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={handleNavigation}
                    title={collapsed ? item.label : undefined}
                    className={({ isActive }) =>
                      `flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                        isActive
                          ? "bg-black text-white"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      } ${collapsed ? "justify-center" : "gap-3"}`
                    }
                  >
                    <Icon size={19} strokeWidth={1.8} />

                    {!collapsed && <span>{item.label}</span>}
                  </NavLink>
                );
              }

              return (
                <div key={item.label} className="pt-3">
                  {!collapsed && (
                    <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                      {item.label}
                    </p>
                  )}

                  <div className="space-y-1">
                    {item.items.map((subItem) => {
                      const Icon = subItem.icon;

                      return (
                        <NavLink
                          key={subItem.path}
                          to={subItem.path}
                          onClick={handleNavigation}
                          title={collapsed ? subItem.label : undefined}
                          className={({ isActive }) =>
                            `flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                              isActive
                                ? "bg-black text-white"
                                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                            } ${collapsed ? "justify-center" : "gap-3"}`
                          }
                        >
                          <Icon size={19} strokeWidth={1.8} />

                          {!collapsed && <span>{subItem.label}</span>}
                        </NavLink>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* ========================================== */}
          {/* BOTTOM */}
          {/* ========================================== */}

          <div className="mt-auto border-t border-slate-100 pt-4">
            <button
              type="button"
              className={`flex w-full items-center rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 ${
                collapsed ? "justify-center" : "gap-3"
              }`}
            >
              <LogOut size={19} strokeWidth={1.8} />

              {!collapsed && <span>Logout</span>}
            </button>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default OwnerSidebar;
