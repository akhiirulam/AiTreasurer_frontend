import { ArrowLeft, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PurchasesHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate("/owner/dashboard")}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#dce5da] bg-white text-[#173f35] transition hover:bg-[#e4f2de]"
          aria-label="Back to dashboard"
        >
          <ArrowLeft size={18} />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-[#173f35]">Purchases</h1>

          <p className="mt-1 text-sm text-[#68736c]">
            Track your purchases, supplier payments, and outstanding amounts.
          </p>
        </div>
      </div>

      {/* Right */}
      <button
        type="button"
        onClick={() => navigate("/transactions/add")}
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#173f35] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#102e27]"
      >
        <Plus size={18} />
        Add Purchase
      </button>
    </div>
  );
};

export default PurchasesHeader;
