import { Plus, Users } from "lucide-react";

interface CustomerHeaderProps {
  onAddCustomer: () => void;
}

const CustomerHeader = ({ onAddCustomer }: CustomerHeaderProps) => {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* =====================================================
          TITLE
      ===================================================== */}

      <div>
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#17213d] text-white">
            <Users size={21} />
          </div>

          <div>
            <h1 className="text-2xl font-black tracking-tight text-[#17213d] sm:text-3xl">
              Customers
            </h1>

            <p className="mt-1 text-sm font-medium text-[#667697]">
              Manage your customers and their account details.
            </p>
          </div>
        </div>
      </div>

      {/* =====================================================
          ADD CUSTOMER
      ===================================================== */}

      <button
        type="button"
        onClick={onAddCustomer}
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#17213d] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#273454]"
      >
        <Plus size={18} />
        Add Customer
      </button>
    </div>
  );
};

export default CustomerHeader;
