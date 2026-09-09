import { useState } from "react";
import { Outlet } from "react-router-dom";

import OwnerNavbar from "../../components/ownerDashboardComponents/dashboardComponents/OwnerNavbar";
import OwnerSidebar from "../../components/ownerDashboardComponents/dashboardComponents/OwnerSidebar";

const OwnerLayout = () => {
  // =====================================================
  // MOBILE SIDEBAR
  // =====================================================

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#f3ffc1]">
      {/* ================================================= */}
      {/* NAVBAR */}
      {/* ================================================= */}

      <OwnerNavbar onMenuClick={() => setSidebarOpen(true)} />

      {/* ================================================= */}
      {/* MAIN LAYOUT */}
      {/* ================================================= */}

      <div className="flex w-full">
        {/* SIDEBAR */}

        <OwnerSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* PAGE CONTENT */}

        <main className="min-w-0 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default OwnerLayout;
