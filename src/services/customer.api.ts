import api from "../api/axios";

import type {
  Customer,
  CreateCustomerData,
  UpdateCustomerData,
  CustomerLedger,
} from "../pages/customers/types/customer.types";

// =====================================================
// GET ALL CUSTOMERS
// =====================================================

const getCustomers = async (): Promise<Customer[]> => {
  const response = await api.get("/customers");

  return response.data.data;
};

// =====================================================
// GET CUSTOMER BY ID
// =====================================================

const getCustomerById = async (customerId: string): Promise<Customer> => {
  const response = await api.get(`/customers/${customerId}`);

  return response.data.data;
};

// =====================================================
// GET CUSTOMER BY PHONE
// =====================================================

const getCustomerByPhone = async (phone: string): Promise<Customer> => {
  const response = await api.get(
    `/customers/phone/${encodeURIComponent(phone)}`,
  );

  return response.data.data;
};

// =====================================================
// CREATE CUSTOMER
// =====================================================

const createCustomer = async (data: CreateCustomerData): Promise<Customer> => {
  const response = await api.post("/customers", data);

  return response.data.data;
};

// =====================================================
// UPDATE CUSTOMER
// =====================================================

const updateCustomer = async (
  customerId: string,
  data: UpdateCustomerData,
): Promise<Customer> => {
  const response = await api.put(`/customers/${customerId}`, data);

  return response.data.data;
};

// =====================================================
// DELETE CUSTOMER
// =====================================================

const deleteCustomer = async (customerId: string): Promise<void> => {
  await api.delete(`/customers/${customerId}`);
};

// =====================================================
// GET CUSTOMER LEDGER
// =====================================================

const getCustomerLedger = async (
  customerId: string,
  from?: string,
  to?: string,
): Promise<CustomerLedger> => {
  const params = new URLSearchParams();

  if (from) {
    params.append("from", from);
  }

  if (to) {
    params.append("to", to);
  }

  const query = params.toString();

  const response = await api.get(
    `/customers/${customerId}/ledger${query ? `?${query}` : ""}`,
  );

  return response.data.data;
};

const customerApi = {
  getCustomers,
  getCustomerById,
  getCustomerByPhone,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomerLedger,
};

export default customerApi;
