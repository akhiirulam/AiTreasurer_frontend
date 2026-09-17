import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

import type { Sale } from "../types/sales.types";

interface SalesTableProps {
  sales: Sale[];
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amount);
};

const formatDate = (date: string) => {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
};

const getStatusLabel = (status: Sale["paymentStatus"]) => {
  switch (status) {
    case "paid":
    case "completed":
      return "Paid";

    case "partial":
      return "Partial";

    case "unpaid":
      return "Unpaid";

    case "pending":
      return "Pending";

    default:
      return "Unknown";
  }
};

const getStatusClass = (status: Sale["paymentStatus"]) => {
  switch (status) {
    case "paid":
    case "completed":
      return "bg-[#e4f2de] text-[#238636]";

    case "partial":
      return "bg-[#fff4d6] text-[#b7791f]";

    case "unpaid":
      return "bg-[#fff5f5] text-[#c43d3d]";

    case "pending":
      return "bg-[#fff4e5] text-[#b7791f]";

    default:
      return "bg-[#eef1ee] text-[#68736c]";
  }
};

const SalesTable = ({ sales }: SalesTableProps) => {
  const navigate = useNavigate();

  if (sales.length === 0) {
    return (
      <div className="rounded-xl border border-[#dce5da] bg-white px-6 py-12 text-center">
        <p className="text-base font-semibold text-[#173f35]">No sales found</p>

        <p className="mt-1 text-sm text-[#68736c]">
          There are no sales transactions for the selected period.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-[#dce5da] bg-white">
      {/* Desktop Table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[900px]">
          <thead>
            <tr className="border-b border-[#dce5da] bg-[#f9fbf7]">
              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#68736c]">
                Date
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#68736c]">
                Customer
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#68736c]">
                Description
              </th>

              <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-[#68736c]">
                Amount
              </th>

              <th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-wide text-[#68736c]">
                Status
              </th>

              <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-[#68736c]">
                Paid
              </th>

              <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-[#68736c]">
                Outstanding
              </th>

              <th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-wide text-[#68736c]">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {sales.map((sale) => (
              <tr
                key={sale.transactionId}
                className="border-b border-[#edf1eb] last:border-b-0 hover:bg-[#f9fbf7]"
              >
                <td className="whitespace-nowrap px-5 py-4 text-sm text-[#17231f]">
                  {formatDate(sale.date)}
                </td>

                <td className="px-5 py-4 text-sm font-medium text-[#173f35]">
                  {sale.customer || "Walk-in Customer"}
                </td>

                <td className="max-w-[240px] truncate px-5 py-4 text-sm text-[#68736c]">
                  {sale.description}
                </td>

                <td className="whitespace-nowrap px-5 py-4 text-right font-financial text-sm font-semibold text-[#173f35]">
                  {formatCurrency(sale.amount)}
                </td>

                <td className="px-5 py-4 text-center">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                      sale.paymentStatus,
                    )}`}
                  >
                    {getStatusLabel(sale.paymentStatus)}
                  </span>
                </td>

                <td className="whitespace-nowrap px-5 py-4 text-right font-financial text-sm text-[#17231f]">
                  {formatCurrency(sale.paidAmount)}
                </td>

                <td className="whitespace-nowrap px-5 py-4 text-right font-financial text-sm font-medium text-[#173f35]">
                  {formatCurrency(sale.outstandingAmount)}
                </td>

                <td className="px-5 py-4 text-center">
                  <button
                    type="button"
                    onClick={() =>
                      navigate(`/owner/transactions/${sale.transactionId}`)
                    }
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#dce5da] text-[#173f35] transition hover:bg-[#e4f2de]"
                    title="View transaction"
                  >
                    <Eye size={17} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="divide-y divide-[#edf1eb] md:hidden">
        {sales.map((sale) => (
          <div key={sale.transactionId} className="p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-[#173f35]">
                  {sale.customer || "Walk-in Customer"}
                </p>

                <p className="mt-1 text-xs text-[#68736c]">
                  {formatDate(sale.date)}
                </p>
              </div>

              <span
                className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClass(
                  sale.paymentStatus,
                )}`}
              >
                {getStatusLabel(sale.paymentStatus)}
              </span>
            </div>

            <p className="mt-3 text-sm text-[#68736c]">{sale.description}</p>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-[#68736c]">Amount</p>
                <p className="mt-1 font-financial text-sm font-semibold text-[#173f35]">
                  {formatCurrency(sale.amount)}
                </p>
              </div>

              <div>
                <p className="text-xs text-[#68736c]">Paid</p>
                <p className="mt-1 font-financial text-sm font-semibold text-[#17231f]">
                  {formatCurrency(sale.paidAmount)}
                </p>
              </div>

              <div>
                <p className="text-xs text-[#68736c]">Outstanding</p>
                <p className="mt-1 font-financial text-sm font-semibold text-[#173f35]">
                  {formatCurrency(sale.outstandingAmount)}
                </p>
              </div>

              <div className="flex items-end justify-end">
                <button
                  type="button"
                  onClick={() =>
                    navigate(`/owner/transactions/${sale.transactionId}`)
                  }
                  className="inline-flex items-center gap-2 rounded-lg border border-[#dce5da] px-3 py-2 text-xs font-semibold text-[#173f35] transition hover:bg-[#e4f2de]"
                >
                  <Eye size={15} />
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalesTable;
