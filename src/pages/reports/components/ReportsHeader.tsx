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
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#d8e69e] bg-white text-[#17213d] transition hover:bg-[#faffdf]"
          aria-label="Back to dashboard"
        >
          <ArrowLeft size={18} />
        </button>

        <div>
          <div className="flex items-center gap-2">
            <FileBarChart size={22} className="text-[#17213d]" />

            <h1 className="text-2xl font-bold text-[#17213d]">Reports</h1>
          </div>

          <p className="mt-1 text-sm text-[#667697]">
            View your business financial overview
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReportsHeader;
