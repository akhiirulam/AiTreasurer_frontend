import type { Customer } from "../types/customer.types";

// =====================================================
// FORMAT CUSTOMER PHONE
// =====================================================

export const formatCustomerPhone = (phone?: string | null): string => {
  if (!phone) {
    return "—";
  }

  return phone;
};

// =====================================================
// CUSTOMER DISPLAY NAME
// =====================================================

export const getCustomerInitials = (name: string): string => {
  const parts = name.trim().split(/\s+/);

  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }

  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

// =====================================================
// CUSTOMER STATUS
// =====================================================

export const getCustomerStatus = (
  customer: Customer,
): "Active" | "Inactive" => {
  return customer.isActive ? "Active" : "Inactive";
};

// =====================================================
// FILTER CUSTOMERS
// =====================================================

export const filterCustomers = (
  customers: Customer[],
  search: string,
  status: "all" | "active" | "inactive",
): Customer[] => {
  const searchValue = search.trim().toLowerCase();

  return customers.filter((customer) => {
    const matchesSearch =
      !searchValue ||
      customer.name.toLowerCase().includes(searchValue) ||
      customer.phone?.toLowerCase().includes(searchValue) ||
      customer.email?.toLowerCase().includes(searchValue);

    const matchesStatus =
      status === "all" ||
      (status === "active" && customer.isActive) ||
      (status === "inactive" && !customer.isActive);

    return matchesSearch && matchesStatus;
  });
};

// =====================================================
// CUSTOMER COUNT
// =====================================================

export const getCustomerCounts = (customers: Customer[]) => {
  const active = customers.filter((customer) => customer.isActive).length;

  const inactive = customers.length - active;

  return {
    total: customers.length,
    active,
    inactive,
  };
};

// =====================================================
// SORT CUSTOMERS BY NAME
// =====================================================

export const sortCustomersByName = (customers: Customer[]): Customer[] => {
  return [...customers].sort((a, b) => a.name.localeCompare(b.name));
};
