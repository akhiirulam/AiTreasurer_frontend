import { Outlet } from "react-router-dom";
import OwnerNavbar from "../components/ownerDashboardComponents/dashboardComponents/OwnerNavbar";
import OwnerSidebar from "../components/ownerDashboardComponents/dashboardComponents/OwnerSidebar";

const OwnerLayout = () => {
  return (
    <div className="min-h-screen w-full bg-[#f3ffc1]">
      <OwnerNavbar />

      <div className="flex w-full">
        <OwnerSidebar />

        <main className="min-w-0 flex-1 w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default OwnerLayout;
