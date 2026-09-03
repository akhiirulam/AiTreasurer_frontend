import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

import type { Purchase } from "../types/purchases.types";

interface PurchasesTableProps {
  purchases: Purchase[];
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

const getStatusLabel = (status: Purchase["paymentStatus"]) => {
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

const getStatusClass = (status: Purchase["paymentStatus"]) => {
  switch (status) {
    case "paid":
    case "completed":
      return "bg-green-100 text-green-700";

    case "partial":
      return "bg-yellow-100 text-yellow-700";

    case "unpaid":
      return "bg-red-100 text-red-700";

    case "pending":
      return "bg-orange-100 text-orange-700";

    default:
      return "bg-slate-100 text-slate-600";
  }
};

const PurchasesTable = ({ purchases }: PurchasesTableProps) => {
  const navigate = useNavigate();

  if (purchases.length === 0) {
    return (
      <div className="rounded-xl border border-[#e5edc5] bg-white px-6 py-12 text-center">
        <p className="text-base font-semibold text-[#17213d]">
          No purchases found
        </p>

        <p className="mt-1 text-sm text-[#667697]">
          There are no purchase transactions for the selected period.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-[#e5edc5] bg-white">
      {/* Desktop Table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[900px]">
          <thead>
            <tr className="border-b border-[#e5edc5] bg-[#faffdf]">
              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#667697]">
                Date
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#667697]">
                Supplier
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#667697]">
                Description
              </th>

              <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-[#667697]">
                Amount
              </th>

              <th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-wide text-[#667697]">
                Status
              </th>

              <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-[#667697]">
                Paid
              </th>

              <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-[#667697]">
                Outstanding
              </th>

              <th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-wide text-[#667697]">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {purchases.map((purchase) => (
              <tr
                key={purchase.transactionId}
                className="border-b border-[#edf1da] last:border-b-0 hover:bg-[#faffdf]/50"
              >
                <td className="whitespace-nowrap px-5 py-4 text-sm text-[#17213d]">
                  {formatDate(purchase.date)}
                </td>

                <td className="px-5 py-4 text-sm font-medium text-[#17213d]">
                  {purchase.supplier || "Unknown Supplier"}
                </td>

                <td className="max-w-[240px] truncate px-5 py-4 text-sm text-[#667697]">
                  {purchase.description}
                </td>

                <td className="whitespace-nowrap px-5 py-4 text-right text-sm font-semibold text-[#17213d]">
                  {formatCurrency(purchase.amount)}
                </td>

                <td className="px-5 py-4 text-center">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                      purchase.paymentStatus,
                    )}`}
                  >
                    {getStatusLabel(purchase.paymentStatus)}
                  </span>
                </td>

                <td className="whitespace-nowrap px-5 py-4 text-right text-sm text-[#17213d]">
                  {formatCurrency(purchase.paidAmount)}
                </td>

                <td className="whitespace-nowrap px-5 py-4 text-right text-sm font-medium text-[#17213d]">
                  {formatCurrency(purchase.outstandingAmount)}
                </td>

                <td className="px-5 py-4 text-center">
                  <button
                    type="button"
                    onClick={() =>
                      navigate(`/owner/transactions/${purchase.transactionId}`)
                    }
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#d8e69e] text-[#17213d] transition hover:bg-[#faffdf]"
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
      <div className="divide-y divide-[#edf1da] md:hidden">
        {purchases.map((purchase) => (
          <div key={purchase.transactionId} className="p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-[#17213d]">
                  {purchase.supplier || "Unknown Supplier"}
                </p>

                <p className="mt-1 text-xs text-[#667697]">
                  {formatDate(purchase.date)}
                </p>
              </div>

              <span
                className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClass(
                  purchase.paymentStatus,
                )}`}
              >
                {getStatusLabel(purchase.paymentStatus)}
              </span>
            </div>

            <p className="mt-3 text-sm text-[#667697]">
              {purchase.description}
            </p>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-[#667697]">Amount</p>

                <p className="mt-1 text-sm font-semibold text-[#17213d]">
                  {formatCurrency(purchase.amount)}
                </p>
              </div>

              <div>
                <p className="text-xs text-[#667697]">Paid</p>

                <p className="mt-1 text-sm font-semibold text-[#17213d]">
                  {formatCurrency(purchase.paidAmount)}
                </p>
              </div>

              <div>
                <p className="text-xs text-[#667697]">Outstanding</p>

                <p className="mt-1 text-sm font-semibold text-[#17213d]">
                  {formatCurrency(purchase.outstandingAmount)}
                </p>
              </div>

              <div className="flex items-end justify-end">
                <button
                  type="button"
                  onClick={() =>
                    navigate(`/owner/transactions/${purchase.transactionId}`)
                  }
                  className="inline-flex items-center gap-2 rounded-lg border border-[#d8e69e] px-3 py-2 text-xs font-semibold text-[#17213d] transition hover:bg-[#faffdf]"
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

export default PurchasesTable;
