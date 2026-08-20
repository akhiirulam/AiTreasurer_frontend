import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/landingPage/LandingPage";
import Login from "../pages/auth/Login";
import GoogleLogin from "../pages/auth/GoogleLogin";
import OwnerDashboard from "../pages/Dashboard/ownerDashboard/OwnerDashboard";
import AddTransaction from "../pages/transacations/AddTransaction";
import OwnerLayout from "../layouts/OwnerLayout";
import FinancialSummary from "../pages/Dashboard/ownerDashboard/FinancialSummary";
import IncomeExpenseChart from "../pages/Dashboard/ownerDashboard/IncomeExpenseChart";
import PartySummary from "../pages/Dashboard/ownerDashboard/PartySummary";
import QuickActions from "../pages/Dashboard/ownerDashboard/QuickActions";
import TransactionHistory from "../pages/transacations/TransactionHistory";
import CashBook from "../pages/cashBook/CashBook";
import Accounts from "../pages/accounting/Accounts";

import AccountLedger from "../pages/accounting/AccountLedger";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/google-login" element={<GoogleLogin />} />

      <Route path="/transactions/add" element={<AddTransaction />} />

      <Route element={<OwnerLayout />}>
        <Route path="/owner/dashboard" element={<OwnerDashboard />} />
        <Route path="/financialsummary" element={<FinancialSummary />} />
        <Route path="/incomeexpensechart" element={<IncomeExpenseChart />} />
        <Route path="/partysummary" element={<PartySummary />} />
        <Route path="/quickActions" element={<QuickActions />} />
        <Route path="/owner/transactions" element={<TransactionHistory />} />
        <Route path="/owner/cash-book" element={<CashBook />} />
        <Route path="/owner/accounts" element={<Accounts />} />
        <Route path="/owner/accounts/:accountId" element={<AccountLedger />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
