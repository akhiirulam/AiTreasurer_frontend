import { useCallback, useEffect, useMemo, useState } from "react";

import customerApi from "../../../services/customer.api";

import type { Customer, CustomerFilters } from "../types/customer.types";

import { filterCustomers, sortCustomersByName } from "../utils/customer.utils";

const useCustomers = () => {
  // =====================================================
  // STATE
  // =====================================================

  const [customers, setCustomers] = useState<Customer[]>([]);

  const [filters, setFilters] = useState<CustomerFilters>({
    search: "",
    status: "all",
  });

  const [loading, setLoading] = useState<boolean>(true);

  const [error, setError] = useState<string | null>(null);

  // =====================================================
  // FETCH CUSTOMERS
  // =====================================================

  const fetchCustomers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await customerApi.getCustomers();

      setCustomers(data);
    } catch (err: any) {
      console.error("Failed to fetch customers:", err);

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to load customers",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  // =====================================================
  // FILTERED CUSTOMERS
  // =====================================================

  const filteredCustomers = useMemo(() => {
    const filtered = filterCustomers(customers, filters.search, filters.status);

    return sortCustomersByName(filtered);
  }, [customers, filters.search, filters.status]);

  // =====================================================
  // UPDATE SEARCH
  // =====================================================

  const setSearch = useCallback((search: string) => {
    setFilters((previous) => ({
      ...previous,
      search,
    }));
  }, []);

  // =====================================================
  // UPDATE STATUS
  // =====================================================

  const setStatus = useCallback((status: CustomerFilters["status"]) => {
    setFilters((previous) => ({
      ...previous,
      status,
    }));
  }, []);

  // =====================================================
  // RESET FILTERS
  // =====================================================

  const resetFilters = useCallback(() => {
    setFilters({
      search: "",
      status: "all",
    });
  }, []);

  // =====================================================
  // DELETE CUSTOMER
  // =====================================================

  const deleteCustomer = useCallback(async (customerId: string) => {
    try {
      setError(null);

      await customerApi.deleteCustomer(customerId);

      setCustomers((previous) =>
        previous.filter((customer) => customer._id !== customerId),
      );
    } catch (err: any) {
      console.error("Failed to delete customer:", err);

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to delete customer",
      );

      throw err;
    }
  }, []);

  // =====================================================
  // RETURN
  // =====================================================

  return {
    customers,
    filteredCustomers,

    filters,

    loading,
    error,

    fetchCustomers,

    setSearch,
    setStatus,
    resetFilters,

    deleteCustomer,
  };
};

export default useCustomers;
