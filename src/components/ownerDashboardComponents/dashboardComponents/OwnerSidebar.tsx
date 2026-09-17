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
  ReceiptText,
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
      icon: ReceiptText,
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

    // ==========================================
    // BUSINESS
    // ==========================================

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

    // ==========================================
    // ANALYTICS
    // ==========================================

    {
      label: "Reports",
      path: "/owner/reports",
      icon: BarChart3,
    },

    // ==========================================
    // AI
    // ==========================================

    {
      label: "AI Assistant",
      path: "/ai-assistant",
      icon: MessageCircle,
    },

    // ==========================================
    // SETTINGS
    // ==========================================

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
          className="fixed inset-0 z-40 bg-[#173f35]/30 backdrop-blur-[2px] lg:hidden"
        />
      )}

      {/* ========================================== */}
      {/* SIDEBAR */}
      {/* ========================================== */}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen flex-col border-r border-[#dce5da] bg-white transition-all duration-300 lg:sticky lg:top-0 lg:z-20 lg:h-screen ${
          collapsed ? "w-20" : "w-64"
        } ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* ========================================== */}
        {/* TOP AREA */}
        {/* ========================================== */}

        <div
          className={`flex h-20 shrink-0 items-center border-b border-[#edf1ea] ${
            collapsed ? "justify-center" : "justify-between px-4"
          }`}
        >
          {/* MOBILE CLOSE BUTTON */}

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-[#68736c] transition hover:bg-[#e4f2de] hover:text-[#173f35] lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={19} strokeWidth={2} />
          </button>

          {/* DESKTOP COLLAPSE BUTTON */}

          <button
            type="button"
            onClick={() => setCollapsed((prev) => !prev)}
            className="hidden h-9 w-9 items-center justify-center rounded-xl text-[#68736c] transition hover:bg-[#e4f2de] hover:text-[#173f35] lg:flex"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <ChevronRight size={18} strokeWidth={2} />
            ) : (
              <ChevronLeft size={18} strokeWidth={2} />
            )}
          </button>
        </div>

        {/* ========================================== */}
        {/* NAVIGATION */}
        {/* ========================================== */}

        <nav className="flex flex-1 flex-col overflow-y-auto px-3 py-5">
          <div className="space-y-1">
            {menuItems.map((item) => {
              // ==========================================
              // NORMAL MENU ITEM
              // ==========================================

              if ("path" in item) {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={handleNavigation}
                    title={collapsed ? item.label : undefined}
                    className={({ isActive }) =>
                      [
                        "group flex items-center rounded-xl px-3 py-2.5",
                        "text-sm font-medium transition-all duration-200",
                        collapsed ? "justify-center" : "gap-3",
                        isActive
                          ? "bg-[#e4f2de] text-[#173f35]"
                          : "text-[#68736c] hover:bg-[#f5f7f2] hover:text-[#173f35]",
                      ].join(" ")
                    }
                  >
                    <Icon
                      size={19}
                      strokeWidth={1.8}
                      className="shrink-0 transition-transform duration-200 group-hover:scale-105"
                    />

                    {!collapsed && <span>{item.label}</span>}
                  </NavLink>
                );
              }

              // ==========================================
              // SECTION
              // ==========================================

              return (
                <div key={item.label} className="pt-5">
                  {!collapsed && (
                    <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#9aa49d]">
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
                            [
                              "group flex items-center rounded-xl px-3 py-2.5",
                              "text-sm font-medium transition-all duration-200",
                              collapsed ? "justify-center" : "gap-3",
                              isActive
                                ? "bg-[#e4f2de] text-[#173f35]"
                                : "text-[#68736c] hover:bg-[#f5f7f2] hover:text-[#173f35]",
                            ].join(" ")
                          }
                        >
                          <Icon
                            size={19}
                            strokeWidth={1.8}
                            className="shrink-0 transition-transform duration-200 group-hover:scale-105"
                          />

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

          <div className="mt-auto border-t border-[#edf1ea] pt-4">
            <button
              type="button"
              title={collapsed ? "Logout" : undefined}
              className={[
                "group flex w-full items-center rounded-xl px-3 py-2.5",
                "text-sm font-medium text-[#68736c]",
                "transition-all duration-200",
                "hover:bg-[#fff1f1] hover:text-[#c43d3d]",
                collapsed ? "justify-center" : "gap-3",
              ].join(" ")}
            >
              <LogOut
                size={19}
                strokeWidth={1.8}
                className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
              />

              {!collapsed && <span>Logout</span>}
            </button>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default OwnerSidebar;
