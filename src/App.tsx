import Login from "./pages/auth/Login";
import Dashboard from "./pages/Dashboard/Dashboard";

const App = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Login />

      <Dashboard />
    </div>
  );
};

export default App;
