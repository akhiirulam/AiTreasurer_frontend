import { Routes, Route } from "react-router-dom";

import LandingPage from "../pages/landingPage/LandingPage";
import Login from "../pages/auth/Login";
import GoogleLogin from "../pages/auth/GoogleLogin";

import ProtectedRoute from "./ProtectedRoute";

// =====================================================
// OWNER
// =====================================================

import OwnerLayout from "../layouts/OwnerLayout";
import OwnerDashboard from "../pages/Dashboard/ownerDashboard/OwnerDashboard";

import AddTransaction from "../pages/transacations/AddTransaction";
import TransactionHistory from "../pages/transacations/TransactionHistory";

import CashBook from "../pages/cashBook/CashBook";

import Accounts from "../pages/accounting/Accounts";
import AccountLedger from "../pages/accounting/AccountLedger";

import Customers from "../pages/customers/Customers";
import CustomerDetailsPage from "../pages/customers/CustomerDetailsPage";

import SuppliersPage from "../pages/suppliers/SuppliersPage";
import SupplierDetailsPage from "../pages/suppliers/SupplierDetailsPage";

import Sales from "../pages/sales/Sales";
import Purchases from "../pages/purchases/Purchases";
import Reports from "../pages/reports/Reports";

// =====================================================
// ADMIN
// =====================================================

import AdminLayout from "../layouts/admin/AdminLayout";
import AdminDashboard from "../pages/admin/AdminDashboard";
import Users from "../pages/admin/users/Users";

const AppRoutes = () => {
  return (
    <Routes>
      {/* ================================================= */}
      {/* PUBLIC ROUTES */}
      {/* ================================================= */}

      <Route path="/" element={<LandingPage />} />

      <Route path="/login" element={<Login />} />

      <Route path="/google-login" element={<GoogleLogin />} />

      {/* ================================================= */}
      {/* OWNER ROUTES */}
      {/* ================================================= */}

      <Route element={<ProtectedRoute allowedRoles={["owner"]} />}>
        <Route element={<OwnerLayout />}>
          <Route path="/owner/dashboard" element={<OwnerDashboard />} />

          <Route path="/transactions/add" element={<AddTransaction />} />

          <Route path="/owner/transactions" element={<TransactionHistory />} />

          <Route path="/owner/cash-book" element={<CashBook />} />

          <Route path="/owner/accounts" element={<Accounts />} />

          <Route
            path="/owner/accounts/:accountId"
            element={<AccountLedger />}
          />

          <Route path="/owner/customers" element={<Customers />} />

          <Route
            path="/owner/customers/:customerId"
            element={<CustomerDetailsPage />}
          />

          <Route path="/owner/suppliers" element={<SuppliersPage />} />

          <Route
            path="/owner/suppliers/:supplierId"
            element={<SupplierDetailsPage />}
          />

          <Route path="/sales" element={<Sales />} />

          <Route path="/purchases" element={<Purchases />} />

          <Route path="/owner/reports" element={<Reports />} />
        </Route>
      </Route>

      {/* ================================================= */}
      {/* ADMIN ROUTES */}
      {/* ================================================= */}

      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<Users />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
