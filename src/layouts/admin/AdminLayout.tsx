import { useState } from "react";
import { Outlet } from "react-router-dom";

import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-slate-100">
      {/* SIDEBAR */}

      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* MAIN AREA */}

      <div className="min-h-screen w-full min-w-0 lg:pl-64">
        {/* NAVBAR */}

        <AdminNavbar onMenuClick={() => setSidebarOpen(true)} />

        {/* PAGE CONTENT */}

        <main className="w-full min-w-0 max-w-full p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
