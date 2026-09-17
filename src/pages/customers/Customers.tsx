import { useMemo, useState } from "react";

import CustomerHeader from "./components/CustomerHeader";
import CustomerFilters from "./components/CustomerFilters";
import CustomerSummary from "./components/CustomerSummary";
import CustomerTable from "./components/CustomerTable";

import useCustomers from "./hooks/useCustomers";

import type { Customer } from "./types/customer.types";

const Customers = () => {
  // =====================================================
  // CUSTOMER HOOK
  // =====================================================

  const {
    customers,
    filteredCustomers,
    filters,
    loading,
    error,
    setSearch,
    setStatus,
    resetFilters,
    deleteCustomer,
  } = useCustomers();

  // =====================================================
  // EDIT CUSTOMER
  // =====================================================

  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

  // =====================================================
  // SUMMARY
  // =====================================================

  const summary = useMemo(() => {
    const activeCustomers = customers.filter(
      (customer) => customer.isActive,
    ).length;

    const inactiveCustomers = customers.length - activeCustomers;

    return {
      totalCustomers: customers.length,
      activeCustomers,
      inactiveCustomers,
    };
  }, [customers]);

  // =====================================================
  // SEARCH
  // =====================================================

  const handleSearch = () => {
    // Filtering is already handled by useCustomers.
    // This function exists so the filter component
    // can explicitly trigger a search.
  };

  // =====================================================
  // ADD CUSTOMER
  // =====================================================

  const handleAddCustomer = () => {
    // Customer creation form/modal will be added
    // separately.
    console.log("Add customer");
  };

  // =====================================================
  // EDIT CUSTOMER
  // =====================================================

  const handleEditCustomer = (customer: Customer) => {
    setEditingCustomer(customer);

    console.log("Edit customer:", customer);
  };

  // =====================================================
  // DELETE CUSTOMER
  // =====================================================

  const handleDeleteCustomer = async (customer: Customer) => {
    const confirmed = window.confirm(
      `Are you sure you want to deactivate ${customer.name}?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteCustomer(customer._id);
    } catch {
      // Error is already handled by useCustomers.
    }
  };

  return (
    <div className="min-h-full bg-[#f5f7f2] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1600px]">
        {/* =================================================
            HEADER
        ================================================= */}

        <CustomerHeader onAddCustomer={handleAddCustomer} />

        {/* =================================================
            ERROR
        ================================================= */}

        {error && (
          <div className="mb-6 rounded-xl border border-[#f0caca] bg-[#fff5f5] px-4 py-3 text-sm font-semibold text-[#c43d3d]">
            {error}
          </div>
        )}

        {/* =================================================
            FILTERS
        ================================================= */}

        <CustomerFilters
          search={filters.search}
          status={filters.status}
          onSearchChange={setSearch}
          onStatusChange={setStatus}
          onSearch={handleSearch}
          onReset={resetFilters}
          loading={loading}
        />

        {/* =================================================
            SUMMARY
        ================================================= */}

        <CustomerSummary
          totalCustomers={summary.totalCustomers}
          activeCustomers={summary.activeCustomers}
          inactiveCustomers={summary.inactiveCustomers}
        />

        {/* =================================================
            TABLE
        ================================================= */}

        <CustomerTable
          customers={filteredCustomers}
          loading={loading}
          onEdit={handleEditCustomer}
          onDelete={handleDeleteCustomer}
        />

        {/* =================================================
            TEMPORARY EDIT STATE
        ================================================= */}

        {editingCustomer && (
          <div className="mt-4 text-xs text-[#68736c]">
            Editing:{" "}
            <span className="font-bold text-[#173f35]">
              {editingCustomer.name}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Customers;
