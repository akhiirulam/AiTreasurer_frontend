import api from "../api/axios";

export interface Supplier {
  _id: string;
  userId: string;
  name: string;
  phone?: string | null;
  email?: string | null;
  address?: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateSupplierData {
  name?: string;
  phone?: string | null;
  email?: string | null;
  address?: string | null;
}

// =====================================================
// SUPPLIER LEDGER
// =====================================================

export interface SupplierLedgerEntry {
  transactionId: string;
  date: string;
  description: string;
  type: string;
  debit: number;
  credit: number;
  balance: number;
}

export interface SupplierLedger {
  supplier: {
    id: string;
    name: string;
    phone?: string | null;
    email?: string | null;
    address?: string | null;
    isActive: boolean;
  };

  totalPurchases: number;
  totalPayments: number;
  outstandingBalance: number;

  entries: SupplierLedgerEntry[];
}

// =====================================================
// GET ALL SUPPLIERS
// =====================================================

const getSuppliers = async (): Promise<Supplier[]> => {
  const response = await api.get("/suppliers");

  return response.data.data;
};

// =====================================================
// GET SUPPLIER BY ID
// =====================================================

const getSupplierById = async (supplierId: string): Promise<Supplier> => {
  const response = await api.get(`/suppliers/${supplierId}`);

  return response.data.data;
};

// =====================================================
// GET SUPPLIER LEDGER
// =====================================================

const getSupplierLedger = async (
  supplierId: string,
  from?: string,
  to?: string,
): Promise<SupplierLedger> => {
  const params: Record<string, string> = {};

  if (from) {
    params.from = from;
  }

  if (to) {
    params.to = to;
  }

  const response = await api.get(`/suppliers/${supplierId}/ledger`, {
    params,
  });

  return response.data.data;
};

// =====================================================
// UPDATE SUPPLIER
// =====================================================

const updateSupplier = async (
  supplierId: string,
  data: UpdateSupplierData,
): Promise<Supplier> => {
  const response = await api.put(`/suppliers/${supplierId}`, data);

  return response.data.data;
};

// =====================================================
// DEACTIVATE SUPPLIER
// =====================================================

const deactivateSupplier = async (supplierId: string): Promise<Supplier> => {
  const response = await api.delete(`/suppliers/${supplierId}`);

  return response.data.data;
};

// =====================================================
// API
// =====================================================

const supplierApi = {
  getSuppliers,
  getSupplierById,
  getSupplierLedger,
  updateSupplier,
  deactivateSupplier,
};

export default supplierApi;
