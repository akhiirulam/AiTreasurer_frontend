import { ArrowLeft, FileBarChart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ReportsHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => navigate("/owner/dashboard")}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#dce5da] bg-white text-[#173f35] transition hover:bg-[#e4f2de]"
          aria-label="Back to dashboard"
        >
          <ArrowLeft size={18} />
        </button>

        <div>
          <div className="flex items-center gap-2">
            <FileBarChart size={22} className="text-[#173f35]" />

            <h1 className="text-2xl font-bold text-[#173f35]">Reports</h1>
          </div>

          <p className="mt-1 text-sm text-[#68736c]">
            View your business financial overview
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReportsHeader;
