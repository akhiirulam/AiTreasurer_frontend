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
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const OwnerSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Transactions",
      path: "/transactions",
      icon: BookOpen,
    },
    {
      label: "Customers",
      path: "/customers",
      icon: Users,
    },
    {
      label: "Suppliers",
      path: "/suppliers",
      icon: Truck,
    },
    {
      label: "Sales",
      path: "/sales",
      icon: ShoppingCart,
    },
    {
      label: "Reports",
      path: "/reports",
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

  return (
    <aside
      className={`hidden min-h-[calc(100vh-64px)] border-r border-slate-200 bg-white transition-all duration-300 lg:block ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Toggle */}
      <div
        className={`flex h-16 items-center border-b border-slate-100 ${
          collapsed ? "justify-center" : "justify-end px-4"
        }`}
      >
        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
        >
          {collapsed ? <ChevronRight size={19} /> : <ChevronLeft size={19} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex h-[calc(100vh-128px)] flex-col px-3 py-5">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                title={collapsed ? item.label : undefined}
                className={({ isActive }) =>
                  `group flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition ${
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
          })}
        </div>

        {/* Bottom */}
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
  );
};

export default OwnerSidebar;
