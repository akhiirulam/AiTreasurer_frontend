import { useEffect, useMemo, useState } from "react";
import { Search, Pencil, UserX } from "lucide-react";

import supplierApi, { type Supplier } from "../../services/supplier.api";
import { useNavigate } from "react-router-dom";

type StatusFilter = "all" | "active" | "inactive";

const SuppliersPage = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");
  const navigate = useNavigate();
  // =====================================================
  // LOAD SUPPLIERS
  // =====================================================

  const loadSuppliers = async () => {
    try {
      setIsLoading(true);

      const data = await supplierApi.getSuppliers();

      setSuppliers(data);
    } catch (error) {
      console.error("Failed to load suppliers:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSuppliers();
  }, []);

  // =====================================================
  // FILTER SUPPLIERS
  // =====================================================

  const filteredSuppliers = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return suppliers.filter((supplier) => {
      const matchesSearch =
        !searchValue ||
        supplier.name.toLowerCase().includes(searchValue) ||
        supplier.phone?.toLowerCase().includes(searchValue) ||
        supplier.email?.toLowerCase().includes(searchValue);

      const matchesStatus =
        status === "all" ||
        (status === "active" && supplier.isActive) ||
        (status === "inactive" && !supplier.isActive);

      return matchesSearch && matchesStatus;
    });
  }, [suppliers, search, status]);

  // =====================================================
  // COUNTS
  // =====================================================

  const totalSuppliers = suppliers.length;

  const activeSuppliers = suppliers.filter(
    (supplier) => supplier.isActive,
  ).length;

  const inactiveSuppliers = suppliers.filter(
    (supplier) => !supplier.isActive,
  ).length;

  // =====================================================
  // DEACTIVATE
  // =====================================================

  const handleDeactivate = async (supplierId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to deactivate this supplier?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await supplierApi.deactivateSupplier(supplierId);

      await loadSuppliers();
    } catch (error) {
      console.error("Failed to deactivate supplier:", error);
    }
  };

  // =====================================================
  // EDIT
  // =====================================================

  const handleEdit = (supplier: Supplier) => {
    console.log("Edit supplier:", supplier);
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="min-h-full w-full p-4 sm:p-6 lg:p-8">
      {/* =================================================
          HEADER
      ================================================= */}

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Suppliers</h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage suppliers created through your transactions.
        </p>
      </div>

      {/* =================================================
          STATISTICS
      ================================================= */}

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* Total */}

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">Total Suppliers</p>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            {totalSuppliers}
          </p>
        </div>

        {/* Active */}

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">Active Suppliers</p>

          <p className="mt-2 text-2xl font-bold text-green-600">
            {activeSuppliers}
          </p>
        </div>

        {/* Inactive */}

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">Inactive Suppliers</p>

          <p className="mt-2 text-2xl font-bold text-slate-500">
            {inactiveSuppliers}
          </p>
        </div>
      </div>

      {/* =================================================
          FILTERS
      ================================================= */}

      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        {/* Search */}

        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search suppliers..."
            className="h-11 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-4 text-sm outline-none transition focus:border-slate-400"
          />
        </div>

        {/* Status */}

        <select
          value={status}
          onChange={(event) => setStatus(event.target.value as StatusFilter)}
          className="h-11 rounded-lg border border-slate-200 bg-white px-4 text-sm outline-none focus:border-slate-400"
        >
          <option value="all">All Suppliers</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* =================================================
          TABLE
      ================================================= */}

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead className="border-b border-slate-200 bg-slate-50">
              <tr>
                <th className="px-5 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                  Supplier
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                  Phone
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                  Email
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                  Status
                </th>

                <th className="px-5 py-4 text-right text-xs font-semibold uppercase text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {isLoading ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-10 text-center text-sm text-slate-500"
                  >
                    Loading suppliers...
                  </td>
                </tr>
              ) : filteredSuppliers.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-10 text-center text-sm text-slate-500"
                  >
                    No suppliers found.
                  </td>
                </tr>
              ) : (
                filteredSuppliers.map((supplier) => (
                  <tr
                    key={supplier._id}
                    className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                  >
                    {/* Supplier */}

                    <td className="px-5 py-4">
                      <button
                        type="button"
                        onClick={() =>
                          navigate(`/owner/suppliers/${supplier._id}`)
                        }
                        className="text-left font-semibold text-slate-900 hover:underline"
                      >
                        {supplier.name}
                      </button>

                      {supplier.address && (
                        <p className="mt-1 text-xs text-slate-400">
                          {supplier.address}
                        </p>
                      )}
                    </td>

                    {/* Phone */}

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {supplier.phone || "—"}
                    </td>

                    {/* Email */}

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {supplier.email || "—"}
                    </td>

                    {/* Status */}

                    <td className="px-5 py-4">
                      {supplier.isActive ? (
                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                          Active
                        </span>
                      ) : (
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
                          Inactive
                        </span>
                      )}
                    </td>

                    {/* Actions */}

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        {/* Edit */}

                        <button
                          type="button"
                          onClick={() => handleEdit(supplier)}
                          className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                          title="Edit supplier"
                        >
                          <Pencil size={17} />
                        </button>

                        {/* Deactivate */}

                        {supplier.isActive && (
                          <button
                            type="button"
                            onClick={() => handleDeactivate(supplier._id)}
                            className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                            title="Deactivate supplier"
                          >
                            <UserX size={17} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SuppliersPage;
