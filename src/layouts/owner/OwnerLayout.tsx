import { useState } from "react";
import { Outlet } from "react-router-dom";

import OwnerNavbar from "../../components/ownerDashboardComponents/dashboardComponents/OwnerNavbar";
import OwnerSidebar from "../../components/ownerDashboardComponents/dashboardComponents/OwnerSidebar";

const OwnerLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#f3ffc1]">
      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <OwnerSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* =====================================================
          RIGHT SIDE
          NAVBAR + PAGE CONTENT
      ===================================================== */}

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {/* =================================================
            NAVBAR
        ================================================= */}

        <div className="z-30 shrink-0">
          <OwnerNavbar onMenuClick={() => setSidebarOpen(true)} />
        </div>

        {/* =================================================
            MAIN CONTENT
            ONLY THIS AREA SCROLLS
        ================================================= */}

        <main className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default OwnerLayout;
