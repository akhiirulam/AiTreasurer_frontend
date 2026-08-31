import { Edit, MoreVertical, Phone, Trash2, UserRound } from "lucide-react";

import type { Customer } from "../types/customer.types";
import {
  formatCustomerPhone,
  getCustomerInitials,
  getCustomerStatus,
} from "../utils/customer.utils";

interface CustomerTableProps {
  customers: Customer[];

  loading: boolean;

  onEdit: (customer: Customer) => void;

  onDelete: (customer: Customer) => void;
}

const CustomerTable = ({
  customers,
  loading,
  onEdit,
  onDelete,
}: CustomerTableProps) => {
  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="rounded-2xl border border-[#d8e69e] bg-white shadow-sm">
        <div className="flex min-h-[260px] items-center justify-center">
          <div className="text-sm font-semibold text-[#667697]">
            Loading customers...
          </div>
        </div>
      </div>
    );
  }

  // =====================================================
  // EMPTY
  // =====================================================

  if (customers.length === 0) {
    return (
      <div className="rounded-2xl border border-[#d8e69e] bg-white shadow-sm">
        <div className="flex min-h-[260px] flex-col items-center justify-center px-6 text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#faffdf] text-[#17213d]">
            <UserRound size={22} />
          </div>

          <h3 className="text-base font-bold text-[#17213d]">
            No customers found
          </h3>

          <p className="mt-1 text-sm text-[#667697]">
            Customers created through transactions will appear here.
          </p>
        </div>
      </div>
    );
  }

  // =====================================================
  // TABLE
  // =====================================================

  return (
    <div className="overflow-hidden rounded-2xl border border-[#d8e69e] bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px]">
          <thead>
            <tr className="border-b border-[#e5edc5] bg-[#faffdf]">
              <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-[#667697]">
                Customer
              </th>

              <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-[#667697]">
                Phone
              </th>

              <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-[#667697]">
                Email
              </th>

              <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-[#667697]">
                Status
              </th>

              <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-[#667697]">
                Created
              </th>

              <th className="w-[80px] px-5 py-4 text-right text-xs font-bold uppercase tracking-wide text-[#667697]">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {customers.map((customer) => {
              const initials = getCustomerInitials(customer.name);

              const status = getCustomerStatus(customer);

              return (
                <tr
                  key={customer._id}
                  className="border-b border-[#edf1da] last:border-b-0 hover:bg-[#fbfff0]"
                >
                  {/* =========================================
                      CUSTOMER
                  ========================================= */}

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#17213d] text-xs font-black text-white">
                        {initials}
                      </div>

                      <div>
                        <p className="text-sm font-bold text-[#17213d]">
                          {customer.name}
                        </p>

                        <p className="text-xs text-[#8995ad]">Customer</p>
                      </div>
                    </div>
                  </td>

                  {/* =========================================
                      PHONE
                  ========================================= */}

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-[#17213d]">
                      <Phone size={15} className="text-[#8995ad]" />

                      {formatCustomerPhone(customer.phone)}
                    </div>
                  </td>

                  {/* =========================================
                      EMAIL
                  ========================================= */}

                  <td className="px-5 py-4">
                    <span className="text-sm font-medium text-[#667697]">
                      {customer.email || "—"}
                    </span>
                  </td>

                  {/* =========================================
                      STATUS
                  ========================================= */}

                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                        customer.isActive
                          ? "bg-[#e9f7d0] text-[#4f6f1d]"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {status}
                    </span>
                  </td>

                  {/* =========================================
                      CREATED
                  ========================================= */}

                  <td className="px-5 py-4">
                    <span className="text-sm font-medium text-[#667697]">
                      {new Date(customer.createdAt).toLocaleDateString()}
                    </span>
                  </td>

                  {/* =========================================
                      ACTIONS
                  ========================================= */}

                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => onEdit(customer)}
                        title="Edit customer"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-[#667697] transition hover:bg-[#f1ffc4] hover:text-[#17213d]"
                      >
                        <Edit size={16} />
                      </button>

                      <button
                        type="button"
                        onClick={() => onDelete(customer)}
                        title="Delete customer"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-[#667697] transition hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <div className="flex items-center justify-between border-t border-[#e5edc5] bg-[#faffdf] px-5 py-3">
        <p className="text-xs font-semibold text-[#667697]">
          {customers.length} {customers.length === 1 ? "customer" : "customers"}
        </p>

        <MoreVertical size={16} className="text-[#8995ad]" />
      </div>
    </div>
  );
};

export default CustomerTable;
