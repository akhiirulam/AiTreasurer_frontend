import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage/LandingPage";
import Login from "../pages/auth/Login";
import GoogleLogin from "../pages/auth/GoogleLogin";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/google-login" element={<GoogleLogin />} />
    </Routes>
  );
};

export default AppRoutes;
