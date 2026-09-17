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
      <div className="flex min-h-[60vh] items-center justify-center bg-[#f5f7f2]">
        <div className="flex items-center gap-3 text-[#68736c]">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#dce5da] border-t-[#173f35]" />

          <span className="text-sm font-semibold">
            Loading supplier ledger...
          </span>
        </div>
      </div>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error) {
    return (
      <div className="min-h-full bg-[#f5f7f2] px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1600px]">
          <button
            type="button"
            onClick={() => navigate("/owner/suppliers")}
            className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#68736c] transition hover:text-[#173f35]"
          >
            <ArrowLeft size={18} />
            Back to Suppliers
          </button>

          <div className="rounded-xl border border-[#f0caca] bg-[#fff5f5] p-5 text-sm font-semibold text-[#c43d3d]">
            {error}
          </div>
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
    <div className="min-h-full w-full bg-[#f5f7f2] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1600px]">
        {/* =================================================
            BACK
        ================================================= */}

        <button
          type="button"
          onClick={() => navigate("/owner/suppliers")}
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#68736c] transition hover:text-[#173f35]"
        >
          <ArrowLeft size={18} />
          Back to Suppliers
        </button>

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#68736c]">
              Supplier Ledger
            </p>

            <h1 className="mt-2 text-3xl font-black text-[#173f35] sm:text-4xl">
              {supplier.name}
            </h1>

            <div className="mt-3 flex flex-wrap gap-4 text-sm text-[#68736c]">
              {supplier.phone && (
                <span className="inline-flex items-center gap-2">
                  <Phone size={15} className="text-[#173f35]" />
                  {supplier.phone}
                </span>
              )}

              {supplier.email && (
                <span className="inline-flex items-center gap-2">
                  <Mail size={15} className="text-[#173f35]" />
                  {supplier.email}
                </span>
              )}

              {supplier.address && (
                <span className="inline-flex items-center gap-2">
                  <MapPin size={15} className="text-[#173f35]" />
                  {supplier.address}
                </span>
              )}
            </div>
          </div>

          <span
            className={`w-fit rounded-full px-4 py-2 text-sm font-bold ${
              supplier.isActive
                ? "bg-[#e4f2de] text-[#238636]"
                : "bg-[#eef1ee] text-[#68736c]"
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

          <div className="rounded-2xl border border-[#dce5da] bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#68736c]">
                  Total Purchases
                </p>

                <p className="mt-3 font-financial text-2xl font-black text-[#173f35]">
                  {formatCurrency(ledger.totalPurchases)}
                </p>
              </div>

              <div className="rounded-xl bg-[#e4f2de] p-3 text-[#173f35]">
                <ShoppingCart size={22} />
              </div>
            </div>
          </div>

          {/* Payments */}

          <div className="rounded-2xl border border-[#dce5da] bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#68736c]">
                  Total Payments
                </p>

                <p className="mt-3 font-financial text-2xl font-black text-[#173f35]">
                  {formatCurrency(ledger.totalPayments)}
                </p>
              </div>

              <div className="rounded-xl bg-[#e4f2de] p-3 text-[#173f35]">
                <CreditCard size={22} />
              </div>
            </div>
          </div>

          {/* Outstanding */}

          <div className="rounded-2xl border border-[#dce5da] bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#68736c]">
                  Outstanding
                </p>

                <p className="mt-3 font-financial text-2xl font-black text-[#173f35]">
                  {formatCurrency(ledger.outstandingBalance)}
                </p>
              </div>

              <div className="rounded-xl bg-[#e4f2de] p-3 text-[#173f35]">
                <Wallet size={22} />
              </div>
            </div>
          </div>
        </div>

        {/* =================================================
            LEDGER
        ================================================= */}

        <div className="overflow-hidden rounded-2xl border border-[#dce5da] bg-white shadow-sm">
          <div className="border-b border-[#dce5da] bg-[#f9fbf7] px-6 py-5">
            <h2 className="text-xl font-black text-[#173f35]">
              Supplier Ledger
            </h2>

            <p className="mt-1 text-sm text-[#68736c]">
              Purchase and payment history
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[750px]">
              <thead className="border-b border-[#dce5da] bg-[#f9fbf7]">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-[#68736c]">
                    Date
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-[#68736c]">
                    Description
                  </th>

                  <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wide text-[#68736c]">
                    Debit
                  </th>

                  <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wide text-[#68736c]">
                    Credit
                  </th>

                  <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wide text-[#68736c]">
                    Balance
                  </th>
                </tr>
              </thead>

              <tbody>
                {ledger.entries.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-12 text-center text-sm text-[#68736c]"
                    >
                      No transactions found for this supplier.
                    </td>
                  </tr>
                ) : (
                  ledger.entries.map((entry) => (
                    <tr
                      key={entry.transactionId}
                      className="border-b border-[#edf1eb] last:border-0 hover:bg-[#f9fbf7]"
                    >
                      <td className="px-6 py-5 text-sm text-[#68736c]">
                        {new Date(entry.date).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>

                      <td className="max-w-[350px] px-6 py-5">
                        <p className="truncate font-semibold text-[#17231f]">
                          {entry.description}
                        </p>

                        <p className="mt-1 text-xs capitalize text-[#a0aaa3]">
                          {entry.type}
                        </p>
                      </td>

                      <td className="px-6 py-5 text-right font-financial text-sm font-semibold text-[#17231f]">
                        {entry.debit > 0 ? formatCurrency(entry.debit) : "—"}
                      </td>

                      <td className="px-6 py-5 text-right font-financial text-sm font-semibold text-[#17231f]">
                        {entry.credit > 0 ? formatCurrency(entry.credit) : "—"}
                      </td>

                      <td className="px-6 py-5 text-right font-financial text-sm font-black text-[#173f35]">
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
                  <tr className="bg-[#173f35]">
                    <td
                      colSpan={4}
                      className="px-6 py-5 text-right font-bold text-white"
                    >
                      Closing Balance
                    </td>

                    <td className="px-6 py-5 text-right font-financial text-lg font-black text-white">
                      {formatCurrency(ledger.outstandingBalance)}
                    </td>
                  </tr>
                </tfoot>
              )}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierDetailsPage;
