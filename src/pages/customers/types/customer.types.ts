export interface Customer {
  _id: string;

  userId: string;

  name: string;

  phone: string;

  email: string | null;

  address: string | null;

  isActive: boolean;

  createdAt: string;

  updatedAt: string;
}

export interface CustomerFilters {
  search: string;

  status: "all" | "active" | "inactive";
}

export interface CreateCustomerData {
  name: string;

  phone: string;

  email?: string | null;

  address?: string | null;
}

export interface UpdateCustomerData {
  name?: string;

  phone?: string;

  email?: string | null;

  address?: string | null;

  isActive?: boolean;
}
