import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  ShoppingCart,
  CreditCard,
  Wallet,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import supplierApi, { type SupplierLedger } from "../../services/supplier.api";

const SupplierDetailsPage = () => {
  const { supplierId } = useParams<{
    supplierId: string;
  }>();

  const navigate = useNavigate();

  const [ledger, setLedger] = useState<SupplierLedger | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState("");

  // =====================================================
  // LOAD SUPPLIER LEDGER
  // =====================================================

  useEffect(() => {
    if (!supplierId) {
      setError("Supplier ID is missing");
      setIsLoading(false);
      return;
    }

    const loadLedger = async () => {
      try {
        setIsLoading(true);
        setError("");

        const data = await supplierApi.getSupplierLedger(supplierId);

        setLedger(data);
      } catch (error: any) {
        console.error("Failed to load supplier ledger:", error);

        setError(
          error?.response?.data?.message || "Failed to load supplier ledger",
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadLedger();
  }, [supplierId]);

  // =====================================================
  // LOADING
  // =====================================================

  if (isLoading) {
    return (
      <div className="p-8 text-center font-mono text-slate-500">
        Loading supplier ledger...
      </div>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error) {
    return (
      <div className="p-8">
        <button
          type="button"
          onClick={() => navigate("/owner/suppliers")}
          className="mb-6 flex items-center gap-2 font-mono text-sm text-slate-600 hover:text-black"
        >
          <ArrowLeft size={18} />
          Back to Suppliers
        </button>

        <div className="rounded-xl border border-red-200 bg-red-50 p-5 font-mono text-red-600">
          {error}
        </div>
      </div>
    );
  }

  if (!ledger) {
    return null;
  }

  const { supplier } = ledger;

  // =====================================================
  // FORMAT CURRENCY
  // =====================================================

  const formatCurrency = (value: number) => {
    return `₹${value.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="min-h-full w-full bg-[#f5ffc2] p-4 font-mono sm:p-6 lg:p-8">
      {/* =================================================
          BACK
      ================================================= */}

      <button
        type="button"
        onClick={() => navigate("/owner/suppliers")}
        className="mb-6 flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-black"
      >
        <ArrowLeft size={18} />
        Back to Suppliers
      </button>

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-slate-500">
            Supplier Ledger
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
            {supplier.name}
          </h1>

          <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-500">
            {supplier.phone && (
              <span className="flex items-center gap-2">
                <Phone size={15} />
                {supplier.phone}
              </span>
            )}

            {supplier.email && (
              <span className="flex items-center gap-2">
                <Mail size={15} />
                {supplier.email}
              </span>
            )}

            {supplier.address && (
              <span className="flex items-center gap-2">
                <MapPin size={15} />
                {supplier.address}
              </span>
            )}
          </div>
        </div>

        <span
          className={`w-fit rounded-full px-4 py-2 text-sm font-bold ${
            supplier.isActive
              ? "bg-green-100 text-green-700"
              : "bg-slate-200 text-slate-500"
          }`}
        >
          {supplier.isActive ? "Active" : "Inactive"}
        </span>
      </div>

      {/* =================================================
          SUMMARY CARDS
      ================================================= */}

      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Purchases */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Total Purchases
              </p>

              <p className="mt-3 text-2xl font-bold text-slate-900">
                {formatCurrency(ledger.totalPurchases)}
              </p>
            </div>

            <div className="rounded-xl bg-slate-900 p-3 text-white">
              <ShoppingCart size={22} />
            </div>
          </div>
        </div>

        {/* Payments */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Total Payments
              </p>

              <p className="mt-3 text-2xl font-bold text-slate-900">
                {formatCurrency(ledger.totalPayments)}
              </p>
            </div>

            <div className="rounded-xl bg-slate-900 p-3 text-white">
              <CreditCard size={22} />
            </div>
          </div>
        </div>

        {/* Outstanding */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Outstanding
              </p>

              <p className="mt-3 text-2xl font-bold text-slate-900">
                {formatCurrency(ledger.outstandingBalance)}
              </p>
            </div>

            <div className="rounded-xl bg-slate-900 p-3 text-white">
              <Wallet size={22} />
            </div>
          </div>
        </div>
      </div>

      {/* =================================================
          LEDGER
      ================================================= */}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 px-6 py-5">
          <h2 className="text-xl font-bold text-slate-900">Supplier Ledger</h2>

          <p className="mt-1 text-sm text-slate-500">
            Purchase and payment history
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[750px]">
            <thead className="border-b border-slate-200 bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-500">
                  Date
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-500">
                  Description
                </th>

                <th className="px-6 py-4 text-right text-xs font-bold uppercase text-slate-500">
                  Debit
                </th>

                <th className="px-6 py-4 text-right text-xs font-bold uppercase text-slate-500">
                  Credit
                </th>

                <th className="px-6 py-4 text-right text-xs font-bold uppercase text-slate-500">
                  Balance
                </th>
              </tr>
            </thead>

            <tbody>
              {ledger.entries.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center text-sm text-slate-500"
                  >
                    No transactions found for this supplier.
                  </td>
                </tr>
              ) : (
                ledger.entries.map((entry) => (
                  <tr
                    key={entry.transactionId}
                    className="border-b border-slate-100 last:border-0"
                  >
                    <td className="px-6 py-5 text-sm text-slate-600">
                      {new Date(entry.date).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>

                    <td className="max-w-[350px] px-6 py-5">
                      <p className="truncate font-semibold text-slate-900">
                        {entry.description}
                      </p>

                      <p className="mt-1 text-xs capitalize text-slate-400">
                        {entry.type}
                      </p>
                    </td>

                    <td className="px-6 py-5 text-right text-sm font-semibold text-slate-700">
                      {entry.debit > 0 ? formatCurrency(entry.debit) : "—"}
                    </td>

                    <td className="px-6 py-5 text-right text-sm font-semibold text-slate-700">
                      {entry.credit > 0 ? formatCurrency(entry.credit) : "—"}
                    </td>

                    <td className="px-6 py-5 text-right text-sm font-bold text-slate-900">
                      {formatCurrency(entry.balance)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>

            {/* =================================================
                TOTAL
            ================================================= */}

            {ledger.entries.length > 0 && (
              <tfoot>
                <tr className="bg-slate-50">
                  <td
                    colSpan={4}
                    className="px-6 py-5 text-right font-bold text-slate-700"
                  >
                    Closing Balance
                  </td>

                  <td className="px-6 py-5 text-right text-lg font-bold text-slate-900">
                    {formatCurrency(ledger.outstandingBalance)}
                  </td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default SupplierDetailsPage;
