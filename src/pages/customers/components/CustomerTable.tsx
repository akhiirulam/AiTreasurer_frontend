import { Edit, MoreVertical, Phone, Trash2, UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="rounded-2xl border border-[#dce5da] bg-white shadow-sm">
        <div className="flex min-h-[260px] items-center justify-center">
          <div className="text-sm font-semibold text-[#68736c]">
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
      <div className="rounded-2xl border border-[#dce5da] bg-white shadow-sm">
        <div className="flex min-h-[260px] flex-col items-center justify-center px-6 text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#e4f2de] text-[#173f35]">
            <UserRound size={22} />
          </div>

          <h3 className="text-base font-bold text-[#173f35]">
            No customers found
          </h3>

          <p className="mt-1 text-sm text-[#68736c]">
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
    <div className="overflow-hidden rounded-2xl border border-[#dce5da] bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px]">
          <thead>
            <tr className="border-b border-[#dce5da] bg-[#f9fbf7]">
              <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-[#68736c]">
                Customer
              </th>

              <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-[#68736c]">
                Phone
              </th>

              <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-[#68736c]">
                Email
              </th>

              <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-[#68736c]">
                Status
              </th>

              <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-[#68736c]">
                Created
              </th>

              <th className="w-[80px] px-5 py-4 text-right text-xs font-bold uppercase tracking-wide text-[#68736c]">
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
                  className="border-b border-[#edf1eb] last:border-b-0 hover:bg-[#f9fbf7]"
                >
                  {/* =========================================
                      CUSTOMER
                  ========================================= */}

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#173f35] text-xs font-black text-white">
                        {initials}
                      </div>

                      <div>
                        <button
                          type="button"
                          onClick={() =>
                            navigate(`/owner/customers/${customer._id}`)
                          }
                          className="text-left text-sm font-bold text-[#173f35] transition hover:text-[#238636]"
                        >
                          {customer.name}
                        </button>

                        <p className="text-xs text-[#a0aaa3]">Customer</p>
                      </div>
                    </div>
                  </td>

                  {/* =========================================
                      PHONE
                  ========================================= */}

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-[#17231f]">
                      <Phone size={15} className="text-[#68736c]" />

                      {formatCustomerPhone(customer.phone)}
                    </div>
                  </td>

                  {/* =========================================
                      EMAIL
                  ========================================= */}

                  <td className="px-5 py-4">
                    <span className="text-sm font-medium text-[#68736c]">
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
                          ? "bg-[#e4f2de] text-[#238636]"
                          : "bg-[#eef1ee] text-[#68736c]"
                      }`}
                    >
                      {status}
                    </span>
                  </td>

                  {/* =========================================
                      CREATED
                  ========================================= */}

                  <td className="px-5 py-4">
                    <span className="text-sm font-medium text-[#68736c]">
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
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-[#68736c] transition hover:bg-[#e4f2de] hover:text-[#173f35]"
                      >
                        <Edit size={16} />
                      </button>

                      <button
                        type="button"
                        onClick={() => onDelete(customer)}
                        title="Delete customer"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-[#68736c] transition hover:bg-[#fff5f5] hover:text-[#c43d3d]"
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

      <div className="flex items-center justify-between border-t border-[#dce5da] bg-[#f9fbf7] px-5 py-3">
        <p className="text-xs font-semibold text-[#68736c]">
          {customers.length} {customers.length === 1 ? "customer" : "customers"}
        </p>

        <MoreVertical size={16} className="text-[#a0aaa3]" />
      </div>
    </div>
  );
};

export default CustomerTable;
