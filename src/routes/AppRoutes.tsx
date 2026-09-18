import { Routes, Route } from "react-router-dom";

import LandingPage from "../pages/LandingPage/LandingPage";
import Login from "../pages/auth/Login";
import GoogleLogin from "../pages/auth/GoogleLogin";

import ProtectedRoute from "./ProtectedRoute";

// =====================================================
// OWNER
// =====================================================

import OwnerLayout from "../layouts/owner/OwnerLayout";
import OwnerDashboard from "../pages/Dashboard/OwnerDashboard/OwnerDashboard";

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
import Register from "../pages/auth/Register";

import Settings from "../pages/settings/Settings";
import ResetPassword from "../pages/auth/ResetPassword";
import ForgotPassword from "../pages/auth/ForgotPassword";

import VerifyEmail from "../pages/auth/VerifyEmail";

const AppRoutes = () => {
  return (
    <Routes>
      {/* ================================================= */}
      {/* PUBLIC ROUTES */}
      {/* ================================================= */}

      <Route path="/" element={<LandingPage />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/google-login" element={<GoogleLogin />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route path="/verify-email" element={<VerifyEmail />} />

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
          <Route path="/settings" element={<Settings />} />
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
